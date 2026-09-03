// Server component: reads the live `customers` collection.

import { listCustomers } from "@/lib/customers-server";
import { CustomersConsole } from "@/components/ops/customers-console";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
    return <CustomersConsole customers={await listCustomers()} />;
}
