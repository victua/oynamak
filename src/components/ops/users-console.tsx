'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users, UserCheck, Clock, Lock, Unlock, KeyRound, Search,
    UserCog, Loader2, Copy, Check, Trash2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
    DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { initialsOf } from '@/lib/roles';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { setUserStatus, inviteUser, generateResetLink, removeUser } from '@/app/ops/users/actions';
import type { UserProfile } from '@/lib/types';

const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Locked': 'bg-red-100 text-red-700 border-red-200',
    'Pending Activation': 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

function formatDate(value?: string) {
    if (!value) return '—';
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? '—'
        : d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** A generated password link, shown for copying since no mail provider is wired up. */
function LinkBox({ link }: { link: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
            <code className="flex-1 truncate text-xs">{link}</code>
            <Button
                size="sm"
                variant="ghost"
                className="h-7 shrink-0 px-2"
                onClick={() => {
                    navigator.clipboard.writeText(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
            >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
        </div>
    );
}

function InviteDialog({ onDone }: { onDone: () => void }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pending, start] = useTransition();
    const { toast } = useToast();

    const submit = () => start(async () => {
        const result = await inviteUser(email, name);
        if (!result.ok) {
            toast({ title: 'Could not add user', description: result.error, variant: 'destructive' });
            return;
        }
        toast({ title: 'User added', description: result.message });
        setEmail(''); setName('');
        setOpen(false);
        onDone();
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <UserCog className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Invite User</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a user</DialogTitle>
                    <DialogDescription>
                        Nothing is emailed and there is no link to send. Tell them they have
                        been added — they go to the sign-in page, enter this address and
                        choose their own password.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="invite-name">Name</Label>
                        <Input id="invite-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Wanjiru" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invite-email">Email</Label>
                        <Input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={submit} disabled={pending}>
                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add user
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function RemoveUserDialog({ user, disabled, onConfirm }: {
    user: UserProfile;
    disabled: boolean;
    onConfirm: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm" variant="ghost" disabled={disabled}
                    className="h-7 px-2 hover:bg-red-100 hover:text-red-700"
                    title="Remove access"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remove {user.displayName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        They lose access to the console immediately, including any session
                        they have open. Their {user.email} sign-in itself is not deleted —
                        it is shared with the other products on this Firebase project — so
                        adding them again later restores access.
                        <br /><br />
                        This cannot be undone from here.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Remove access
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function UsersConsole({
    users,
    currentUid,
}: {
    users: UserProfile[];
    currentUid: string;
}) {
    const [search, setSearch] = useState('');
    const [busyUid, setBusyUid] = useState<string | null>(null);
    const [resetLink, setResetLink] = useState<string | null>(null);
    const [, start] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return users.filter(
            (u) => u.displayName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
        );
    }, [users, search]);

    const counts = useMemo(() => ({
        total: users.length,
        active: users.filter((u) => u.status === 'Active').length,
        pending: users.filter((u) => u.status === 'Pending Activation').length,
        locked: users.filter((u) => u.status === 'Locked').length,
    }), [users]);

    const run = (uid: string, action: () => Promise<{ ok: boolean } & Record<string, any>>) => {
        setBusyUid(uid);
        start(async () => {
            const result = await action();
            setBusyUid(null);
            if (!result.ok) {
                toast({ title: 'Action failed', description: result.error, variant: 'destructive' });
                return;
            }
            if (result.resetLink) setResetLink(result.resetLink);
            toast({ title: 'Done', description: result.message });
            router.refresh();
        });
    };

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl text-primary">Users</h1>
                    <p className="text-muted-foreground mt-1">
                        Everyone listed here can use the console. Added users set their own
                        password at the sign-in page; removing someone means locking them.
                    </p>
                </div>
                <InviteDialog onDone={() => router.refresh()} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Users', value: counts.total, sub: 'With a console account', icon: Users },
                    { label: 'Active', value: counts.active, sub: 'Can sign in now', icon: UserCheck },
                    { label: 'Pending', value: counts.pending, sub: 'Added, not yet signed in', icon: Clock },
                    { label: 'Locked', value: counts.locked, sub: 'Access suspended', icon: Lock },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
                        <CardContent className="p-5">
                            <div className="flex flex-row items-center justify-between mb-2">
                                <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                                <div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div>
                            </div>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {resetLink && (
                <Card className="border-none bg-card shadow-lg rounded-xl">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Password link</CardTitle>
                        <CardDescription>Send this to the user, then dismiss it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <LinkBox link={resetLink} />
                        <Button size="sm" variant="outline" onClick={() => setResetLink(null)}>Dismiss</Button>
                    </CardContent>
                </Card>
            )}

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">All Users</CardTitle>
                    <CardDescription>Accounts in the Oynamak Firestore database</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b hover:bg-transparent">
                                    <TableHead className="text-primary font-semibold pl-0">User</TableHead>
                                    <TableHead className="text-primary font-semibold">Status</TableHead>
                                    <TableHead className="hidden lg:table-cell text-primary font-semibold">Joined</TableHead>
                                    <TableHead className="hidden md:table-cell text-primary font-semibold">Last Login</TableHead>
                                    <TableHead className="text-primary font-semibold text-right pr-0">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                                            {users.length === 0 ? 'No users yet.' : 'No users match that search.'}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filtered.map((u) => {
                                    const isSelf = u.uid === currentUid;
                                    const busy = busyUid === u.uid;
                                    const inactive = u.status !== 'Active';

                                    return (
                                        <TableRow key={u.uid} className="border-b hover:bg-muted/50">
                                            <TableCell className="pl-0 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                        {initialsOf(u.displayName)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {u.displayName}
                                                            {isSelf && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">{u.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4">
                                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[u.status]}`}>
                                                    {u.status}
                                                </span>
                                            </TableCell>

                                            <TableCell className="hidden lg:table-cell py-4 text-sm text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
                                            <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">{formatDate(u.lastLoginAt)}</TableCell>

                                            <TableCell className="py-4 text-right pr-0 space-x-1">
                                                {busy && <Loader2 className="inline h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                                                <Button
                                                    size="sm" variant="ghost" disabled={busy}
                                                    className="h-7 px-2 hover:bg-primary/10 hover:text-primary"
                                                    title="Generate password reset link"
                                                    onClick={() => run(u.uid, () => generateResetLink(u.uid))}
                                                >
                                                    <KeyRound className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm" variant="ghost" disabled={busy || isSelf}
                                                    className={inactive
                                                        ? 'h-7 px-2 hover:bg-green-100 hover:text-green-700'
                                                        : 'h-7 px-2 hover:bg-red-100 hover:text-red-700'}
                                                    title={isSelf
                                                        ? 'You cannot lock your own account'
                                                        : u.status === 'Pending Activation' ? 'Activate'
                                                            : inactive ? 'Unlock' : 'Lock'}
                                                    onClick={() => run(u.uid, () =>
                                                        setUserStatus(u.uid, inactive ? 'Active' : 'Locked'))}
                                                >
                                                    {inactive ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                                                </Button>
                                                {!isSelf && (
                                                    <RemoveUserDialog
                                                        user={u}
                                                        disabled={busy}
                                                        onConfirm={() => run(u.uid, () => removeUser(u.uid))}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
