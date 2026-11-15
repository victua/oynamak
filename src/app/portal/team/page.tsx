'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageTitle, Panel } from '@/components/portal/bits';

type Member = { email: string; name: string; role: 'admin' | 'staff'; locked: boolean };

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [me, setMe] = useState<{ email: string; role: string } | null>(null);
  const [email, setEmail] = useState(''); const [name, setName] = useState(''); const [role, setRole] = useState('staff');
  const [msg, setMsg] = useState(''); const [error, setError] = useState('');

  const load = useCallback(async () => {
    const r = await fetch('/api/portal/team'); const d = await r.json();
    if (!r.ok) return setError(d.error); setMembers(d.members); setMe(d.me);
  }, []);
  useEffect(() => { load(); }, [load]);

  const call = async (url: string, init: RequestInit, ok: string) => {
    setError(''); setMsg('');
    const r = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } }); const d = await r.json();
    if (!r.ok) return setError(d.error); setMsg(ok); await load();
  };

  if (me && me.role !== 'admin') return <p className="py-10 text-center text-sm">Only admins can manage the team.</p>;

  return (
    <>
      <PageTitle title="Team" sub="Admins can add people. Everyone signs in at /login with their own email." />
      <Panel className="mb-6">
        <h2 className="mb-3 font-bold text-primary">Add someone</h2>
        <form className="grid gap-3 md:grid-cols-[1fr_1fr_10rem_auto]" onSubmit={(e) => { e.preventDefault(); call('/api/portal/team', { method: 'POST', body: JSON.stringify({ email, name, role }) }, 'Added. Ask them to open /login and choose "Create or reset my password".').then(() => { setEmail(''); setName(''); }); }}>
          <Input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
          <Input placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
          <Select value={role} onValueChange={setRole}><SelectTrigger className="h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="staff">Staff</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent></Select>
          <Button type="submit" className="h-11">Add</Button>
        </form>
        {error && <p role="alert" className="mt-3 text-sm font-medium text-destructive">{error}</p>}
        {msg && <p className="mt-3 text-sm font-medium text-green-700">{msg}</p>}
      </Panel>
      <Panel className="overflow-x-auto p-0 md:p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary"><tr><th className="p-4">Person</th><th className="p-4">Role</th><th className="p-4 text-right">Actions</th></tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email} className="border-b last:border-0">
                <td className="p-4"><div className="font-semibold">{m.email}</div>{m.name && <div className="text-xs text-muted-foreground">{m.name}</div>}</td>
                <td className="p-4">{m.locked ? <span className="font-semibold">Admin (founder)</span> : (
                  <Select value={m.role} onValueChange={(v) => call(`/api/portal/team/${encodeURIComponent(m.email)}`, { method: 'PATCH', body: JSON.stringify({ role: v }) }, 'Role updated.')}>
                    <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="staff">Staff</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
                  </Select>)}</td>
                <td className="p-4 text-right">{!m.locked && m.email !== me?.email && <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Remove ${m.email}?`) && call(`/api/portal/team/${encodeURIComponent(m.email)}`, { method: 'DELETE' }, 'Removed.')}>Remove</Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
