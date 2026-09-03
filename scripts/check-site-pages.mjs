#!/usr/bin/env node
// Fails if src/lib/site-pages.ts has drifted from reality. Run via
// `npm run check:pages`.
//
// The admin console's Website page is built from that registry, so drift means
// the console quietly lies about the site. Two kinds of entry are checked
// against two different sources of truth:
//
//   kind: 'page'     -> a page.tsx must exist under src/app
//   kind: 'dynamic'  -> likewise; the path keeps its [segment] placeholder
//   kind: 'redirect' -> a matching rule must exist in next.config.ts redirects()
//
// The `inNav` flag is checked too, against the nav in public-header.tsx — the
// registry claiming a page is linked when it isn't is the same class of bug
// this script exists to prevent.

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const APP_DIR = 'src/app';
const IGNORED = ['/ops', '/portal', '/login', '/api'];

async function routes(dir = APP_DIR, base = '') {
    const found = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            // Route groups (parentheses) and private folders (_) add no segment.
            const segment = entry.name.startsWith('(') || entry.name.startsWith('_')
                ? base
                : `${base}/${entry.name}`;
            found.push(...await routes(full, segment));
        } else if (entry.name === 'page.tsx') {
            found.push(base === '' ? '/' : base);
        }
    }
    return found;
}

const actualPages = (await routes())
    .filter(r => !IGNORED.some(p => r === p || r.startsWith(`${p}/`)))
    .sort();

const registrySource = await readFile('src/lib/site-pages.ts', 'utf8');
const entries = [...registrySource.matchAll(
    /path:\s*'([^']+)',\s*title:[^,]+,\s*section:\s*'([^']+)',\s*kind:\s*'(page|redirect|dynamic)'[^}]*?inNav:\s*(true|false)/g,
)].map(m => ({ path: m[1], section: m[2], kind: m[3], inNav: m[4] === 'true' }));

// Templates are backed by a real page.tsx too, so they check the same way.
const registeredPages = entries
    .filter(e => e.kind === 'page' || e.kind === 'dynamic')
    .map(e => e.path)
    .sort();
const registeredRedirects = entries.filter(e => e.kind === 'redirect').map(e => e.path).sort();

const configSource = await readFile('next.config.ts', 'utf8');

// Scope to the redirects() body — headers() uses `source` too, and matching
// across the whole file would pick up its '/:path*' rule.
const redirectsBlock = configSource.slice(
    configSource.indexOf('async redirects()'),
    configSource.indexOf('async headers()'),
);
if (!redirectsBlock) {
    console.error('  Could not locate the redirects() block in next.config.ts');
    process.exit(1);
}
const configRedirects = [...redirectsBlock.matchAll(/source:\s*'([^']+)'/g)].map(m => m[1]);

const navSource = await readFile('src/components/public-header.tsx', 'utf8');
const navBlock = navSource.slice(
    navSource.indexOf('const navItems'),
    navSource.indexOf('export function PublicHeader'),
);
const navHrefs = [...navBlock.matchAll(/href:\s*'([^']+)'/g)].map(m => m[1]);

const problems = [];

for (const e of entries) {
    const linked = navHrefs.includes(e.path);
    // Solution pages are linked from the /solutions index rather than the top
    // nav, so only compare entries the nav is actually responsible for.
    if (e.section !== 'Main') continue;
    if (e.kind !== 'page') continue;
    if (e.inNav && !linked) problems.push(`CLAIMS inNav BUT UNLINKED: ${e.path}  (not in public-header navItems)`);
    if (!e.inNav && linked) problems.push(`LINKED BUT inNav: false:   ${e.path}  (present in navItems)`);
}

for (const r of actualPages.filter(r => !registeredPages.includes(r))) {
    problems.push(`MISSING from registry:      ${r}  (page.tsx exists)`);
}
for (const r of registeredPages.filter(r => !actualPages.includes(r))) {
    problems.push(`NOT A REAL ROUTE:           ${r}  (no page.tsx)`);
}
for (const r of registeredRedirects.filter(r => !configRedirects.includes(r))) {
    problems.push(`REDIRECT NOT CONFIGURED:    ${r}  (absent from next.config.ts)`);
}
for (const r of configRedirects.filter(r => !registeredRedirects.includes(r))) {
    problems.push(`REDIRECT NOT REGISTERED:    ${r}  (in next.config.ts only)`);
}

if (problems.length) {
    for (const p of problems) console.error(`  ${p}`);
    console.error(`\ncheck:pages failed — update src/lib/site-pages.ts or next.config.ts`);
    process.exit(1);
}

console.log(
    `check:pages OK — ${actualPages.length} routes, ${registeredRedirects.length} redirects, all registered`,
);
