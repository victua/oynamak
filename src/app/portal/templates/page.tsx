import Link from 'next/link';
import { FileText, Mail, Contact, StickyNote, AtSign } from 'lucide-react';
import { PageTitle, Panel } from '@/components/portal/bits';
import { templates } from '@/lib/portal-templates';

const icons: Record<string, typeof FileText> = { 'cover-letter': FileText, envelope: Mail, 'business-card': Contact, 'compliment-slip': StickyNote, 'email-signature': AtSign };

export default function TemplatesPage() {
  return (
    <>
      <PageTitle title="Templates" sub="Branded stationery. Fill in the details, then print or save as PDF." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => {
          const Icon = icons[t.slug] ?? FileText;
          return (
            <Link key={t.slug} href={`/portal/templates/${t.slug}`}>
              <Panel className="h-full bg-pattern-light transition hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-brand-btn bg-primary text-white"><Icon className="h-6 w-6" /></span>
                <h2 className="mt-4 text-xl font-bold text-primary">{t.title}</h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.size}</p>
                <p className="mt-2 text-sm text-foreground/80">{t.description}</p>
              </Panel>
            </Link>
          );
        })}
      </div>
    </>
  );
}
