// Server component: this is where /ops access is actually enforced. The
// session cookie is verified with the Admin SDK and the role read from
// Firestore before any child page renders, so an unauthorised visitor never
// receives the console's markup or data.
//
// Only plain data crosses into PortalShell — the nav (whose icons are React
// components) lives on the client side of that boundary.

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { getSession, sessionHasRole } from "@/lib/auth-server";
import { PATHNAME_HEADER, loginRedirect } from "@/lib/session";
import { OPS_ROLES, roleHome } from "@/lib/roles";

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const requested = (await headers()).get(PATHNAME_HEADER);

  if (session.status !== "ok") {
    redirect(loginRedirect(requested, "/ops/dashboard"));
  }

  if (!(await sessionHasRole(session, OPS_ROLES))) {
    // A signed-in client has somewhere to go; send them there rather than to
    // a dead end.
    redirect(roleHome(session.profile.role));
  }

  return (
    <PortalShell variant="ops" profile={session.profile}>
      {children}
    </PortalShell>
  );
}
