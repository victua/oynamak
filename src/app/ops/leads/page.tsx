// Server component: reads the live `leads` collection. The layout has already
// verified the session and ops role before this runs.

import { listLeads } from "@/lib/leads-server";
import { LeadsConsole } from "@/components/ops/leads-console";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
    return <LeadsConsole leads={await listLeads()} />;
}
