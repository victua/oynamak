'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageTitle, Panel } from '@/components/portal/bits';
import { PrintCss } from '@/components/portal/print-css';
import { templates } from '@/lib/portal-templates';

type V = Record<string, string>;
const NAVY = '#0B2D61', RED = '#D93846', INK = '#14233f';
const font = 'var(--font-montserrat)';
const nl = { whiteSpace: 'pre-line' } as const;

function Letter({ v }: { v: V }) {
  return (
    <div className="print-page" style={{ width: '210mm', height: '297mm', background: '#fff', padding: '18mm 22mm', color: INK, fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <img src="/images/logo.png" alt="" style={{ height: '24mm' }} />
        <div style={{ textAlign: 'right', fontSize: '8.5pt', lineHeight: 1.7, color: '#5b6b8c' }}><div style={{ fontWeight: 700, color: NAVY }}>{v.company}</div><div>{v.address}</div><div>{v.phone}</div><div>{v.email}</div><div>{v.website}</div></div>
      </div>
      <div style={{ marginTop: '16mm', fontSize: '10pt', lineHeight: 1.6 }}>
        <div>{v.date}</div>
        <div style={{ marginTop: '8mm', fontWeight: 700 }}>{v.toName}</div><div>{v.toOrg}</div><div style={nl}>{v.toAddress}</div>
        <div style={{ marginTop: '10mm', fontWeight: 800, color: NAVY, fontSize: '11pt' }}>{v.subject}</div>
        <div style={{ marginTop: '6mm' }}>{v.salutation}</div>
        <div style={{ marginTop: '4mm', ...nl, lineHeight: 1.7 }}>{v.body}</div>
        <div style={{ marginTop: '8mm' }}>{v.closing}</div>
        <div style={{ marginTop: '14mm', fontWeight: 700 }}>{v.fromName}</div><div>{v.fromTitle}</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '9mm', background: NAVY, color: '#fff', fontSize: '7.5pt', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '.08em' }}>BUILT FOR GREATNESS. MADE TO WIN.</div>
    </div>
  );
}

function Envelope({ v }: { v: V }) {
  return (
    <div className="print-page" style={{ width: '220mm', height: '110mm', background: '#fff', padding: '10mm 12mm', color: INK, fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <img src="/images/logo.png" alt="" style={{ height: '16mm' }} />
      <div style={{ fontSize: '7pt', lineHeight: 1.6, color: '#5b6b8c', marginTop: '2mm' }}>{v.company} · {v.address} · {v.email}</div>
      <div style={{ position: 'absolute', left: '100mm', top: '42mm', fontSize: '11pt', lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700 }}>{v.toName}</div><div>{v.toOrg}</div><div style={nl}>{v.toAddress}</div>
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '30mm', height: '5mm', background: RED }} />
    </div>
  );
}

function CardPages({ v }: { v: V }) {
  const page = { width: '90mm', height: '55mm', position: 'relative', overflow: 'hidden', fontFamily: font } as const;
  return (
    <>
      <div className="print-page" style={{ ...page, background: NAVY, backgroundImage: "url('/images/pattern-dark.svg')", backgroundSize: '30mm 30mm', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/logo-white.png" alt="" style={{ height: '24mm' }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '22mm', height: '3mm', background: RED }} />
      </div>
      <div className="print-page" style={{ ...page, background: '#fff', color: INK, padding: '7mm 8mm' }}>
        <div style={{ fontSize: '12pt', fontWeight: 800, color: NAVY }}>{v.name}</div>
        <div style={{ fontSize: '7.5pt', fontWeight: 600, color: RED, letterSpacing: '.1em', textTransform: 'uppercase' }}>{v.title}</div>
        <div style={{ marginTop: '8mm', fontSize: '7.5pt', lineHeight: 1.8 }}><div>{v.mobile}</div><div>{v.cardEmail}</div><div>{v.website}</div><div>{v.address}</div></div>
        <img src="/images/logo-mark.png" alt="" style={{ position: 'absolute', right: '6mm', bottom: '5mm', height: '14mm', opacity: 0.9 }} />
      </div>
    </>
  );
}

function Slip({ v }: { v: V }) {
  return (
    <div className="print-page" style={{ width: '210mm', height: '99mm', background: '#fff', padding: '10mm 14mm', color: INK, fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src="/images/logo.png" alt="" style={{ height: '20mm' }} />
        <div style={{ textAlign: 'right', fontSize: '8pt', lineHeight: 1.7, color: '#5b6b8c' }}><div>{v.company}</div><div>{v.address}</div><div>{v.phone}</div><div>{v.email}</div></div>
      </div>
      <div style={{ marginTop: '12mm', fontSize: '11pt', ...nl }}>{v.message}</div>
      <div style={{ marginTop: '6mm', fontWeight: 700, color: NAVY }}>{v.fromName}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '5mm', background: NAVY }} />
    </div>
  );
}

function Signature({ v }: { v: V }) {
  return (
    <div id="sig" style={{ fontFamily: 'Arial, sans-serif', color: INK, fontSize: '13px', lineHeight: 1.5 }}>
      <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse' }}><tbody><tr>
        <td style={{ paddingRight: 16, borderRight: `3px solid ${RED}` }}><img src="https://oynamak.co.ke/images/logo.png" alt="Oynamak Sports Group" width={150} /></td>
        <td style={{ paddingLeft: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY }}>{v.name}</div>
          <div style={{ color: RED, fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{v.title}</div>
          <div style={{ marginTop: 6 }}>{v.mobile} · <a href={`mailto:${v.cardEmail}`} style={{ color: NAVY }}>{v.cardEmail}</a></div>
          <div>{v.address} · <a href={`https://${v.website}`} style={{ color: NAVY }}>{v.website}</a></div>
        </td>
      </tr></tbody></table>
    </div>
  );
}

export default function TemplateEditor() {
  const { slug } = useParams<{ slug: string }>();
  const def = templates.find((t) => t.slug === slug);
  const [v, setV] = useState<V>(def?.defaults ?? {});
  const [copied, setCopied] = useState(false);
  if (!def) return notFound();
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));

  const copySignature = async () => {
    const html = document.getElementById('sig')?.outerHTML ?? '';
    try { await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([html], { type: 'text/plain' }) })]); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { alert('Could not copy. Select the signature and copy it by hand.'); }
  };
  const isSig = def.slug === 'email-signature';

  return (
    <>
      <PrintCss size={def.pageSize} />
      <PageTitle title={def.title} sub={def.size}>
        <Button variant="outline" asChild><Link href="/portal/templates"><ArrowLeft className="mr-1 h-4 w-4" />All templates</Link></Button>
        {isSig ? <Button onClick={copySignature}><Copy className="mr-1 h-4 w-4" />{copied ? 'Copied' : 'Copy signature'}</Button> : <Button onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" />Print / save as PDF</Button>}
      </PageTitle>
      <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        <Panel className="no-print space-y-3 self-start">
          {def.fields.map((f) => (
            <div key={f.key} className="space-y-1">
              <label className="text-xs font-semibold" htmlFor={`t-${f.key}`}>{f.label}</label>
              {f.type === 'textarea' ? <Textarea id={`t-${f.key}`} className="min-h-[90px]" value={v[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} /> : <Input id={`t-${f.key}`} className="h-10" value={v[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} />}
            </div>
          ))}
          <p className="text-xs text-muted-foreground">When printing, switch off "Headers and footers" in the print window and set margins to None.</p>
        </Panel>
        <div className="overflow-x-auto">
          {isSig ? <Panel><Signature v={v} /></Panel> : (
            <div className="preview-zoom origin-top-left" style={{ '--z': def.slug === 'business-card' ? 2.2 : def.slug === 'cover-letter' ? 0.8 : 1.2 } as React.CSSProperties}>
              <div className="print-area" style={{ display: 'inline-flex', flexDirection: 'column', gap: def.slug === 'business-card' ? '6mm' : 0, boxShadow: '0 4px 24px rgba(0,0,0,.15)' }}>
                {def.slug === 'cover-letter' && <Letter v={v} />}
                {def.slug === 'envelope' && <Envelope v={v} />}
                {def.slug === 'business-card' && <CardPages v={v} />}
                {def.slug === 'compliment-slip' && <Slip v={v} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
