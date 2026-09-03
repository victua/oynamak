// Server component — see the note in src/app/ops/layout.tsx.

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { getSession, sessionHasRole } from "@/lib/auth-server";
import { PATHNAME_HEADER, loginRedirect } from "@/lib/session";
import { PORTAL_ROLES } from "@/lib/roles";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const requested = (await headers()).get(PATHNAME_HEADER);

  if (session.status !== "ok" || !(await sessionHasRole(session, PORTAL_ROLES))) {
    redirect(loginRedirect(requested, "/portal/dashboard"));
  }

  return (
    <PortalShell variant="portal" profile={session.profile}>
      {children}
    </PortalShell>
  );
}
