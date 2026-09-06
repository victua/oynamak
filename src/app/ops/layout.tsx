// Server component: this is where /ops access is actually enforced. The
// session cookie is verified with the Admin SDK and the account read from
// Firestore before any child page renders, so an unauthorised visitor never
// receives the console's markup or data.
//
// Access is simply "has an active users/{uid} document". Profiles are created
// only from /ops/users, so a stranger who signs themselves into Firebase Auth
// arrives here with nothing and is turned away.
//
// Only plain data crosses into PortalShell — the nav (whose icons are React
// components) lives on the client side of that boundary.

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal/PortalShell";
import { getSession, sessionIsAuthorised } from "@/lib/auth-server";
import { PATHNAME_HEADER, loginRedirect } from "@/lib/session";
import { HOME_PATH } from "@/lib/roles";

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const requested = (await headers()).get(PATHNAME_HEADER);

  // No session, no profile, or a locked one: all end at the login screen,
  // which explains the difference rather than looping them back here.
  if (!sessionIsAuthorised(session)) {
    redirect(loginRedirect(requested, HOME_PATH));
  }

  return (
    <PortalShell profile={session.profile}>
      {children}
    </PortalShell>
  );
}
