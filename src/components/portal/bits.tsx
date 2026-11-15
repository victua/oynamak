'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="no-print mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-brand border bg-white p-5 shadow-sm md:p-6', className)}>{children}</div>;
}

const tones: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700', Contacted: 'bg-yellow-100 text-yellow-800', Qualified: 'bg-purple-100 text-purple-700',
  Proposal: 'bg-orange-100 text-orange-700', Won: 'bg-green-100 text-green-700', Lost: 'bg-red-100 text-red-700',
  Handled: 'bg-green-100 text-green-700', Converted: 'bg-purple-100 text-purple-700',
  Draft: 'bg-slate-100 text-slate-700', Sent: 'bg-blue-100 text-blue-700', Accepted: 'bg-green-100 text-green-700', Declined: 'bg-red-100 text-red-700',
};
export const StatusBadge = ({ status }: { status: string }) => (
  <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[status] ?? 'bg-slate-100 text-slate-700')}>{status}</span>
);

export const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

export function Empty({ loading, error, text }: { loading: boolean; error: string; text: string }) {
  if (loading) return <p className="py-10 text-center text-sm text-muted-foreground">Loading...</p>;
  if (error) return <p className="py-10 text-center text-sm font-medium text-destructive">The database is not ready yet: {error}</p>;
  return <p className="py-10 text-center text-sm text-muted-foreground">{text}</p>;
}
