'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Field = { key: string; label: string; type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'; options?: readonly string[]; required?: boolean };

/** One add/edit form used by leads and customers. */
export function RecordDialog({ open, onOpenChange, title, fields, initial, onSave }: {
  open: boolean; onOpenChange: (v: boolean) => void; title: string; fields: Field[];
  initial: Record<string, string>; onSave: (values: Record<string, string>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (open) { setValues(initial); setError(''); } }, [open, initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setError('');
    try { await onSave(values); onOpenChange(false); } catch (x) { setError(x instanceof Error ? x.message : 'Could not save.'); } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto">
        <form onSubmit={submit} className="space-y-4">
          <DialogTitle className="text-2xl font-bold text-primary">{title}</DialogTitle>
          <DialogDescription className="sr-only">{title}</DialogDescription>
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor={`f-${f.key}`}>{f.label}</label>
              {f.type === 'textarea' ? (
                <Textarea id={`f-${f.key}`} value={values[f.key] ?? ''} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} className="min-h-[90px]" />
              ) : f.type === 'select' ? (
                <Select value={values[f.key] ?? ''} onValueChange={(v) => setValues({ ...values, [f.key]: v })}>
                  <SelectTrigger id={`f-${f.key}`} className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{f.options?.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
              ) : (
                <Input id={`f-${f.key}`} type={f.type ?? 'text'} required={f.required} value={values[f.key] ?? ''} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} className="h-11" />
              )}
            </div>
          ))}
          {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} className="h-11 w-full">{busy ? 'Saving...' : 'Save'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
