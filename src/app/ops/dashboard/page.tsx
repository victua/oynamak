import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Users, UserPlus, LineChart, Star } from "lucide-react";
import type { Lead } from "@/lib/types";

const leads: Lead[] = [
  { id: '1', name: 'John Doe', email: 'john.d@example.com', source: 'Website', status: 'New', date: '2023-10-26' },
  { id: '2', name: 'Jane Smith', email: 'jane.s@example.com', source: 'Referral', status: 'Contacted', date: '2023-10-25' },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@example.com', source: 'Event', status: 'Qualified', date: '2023-10-24' },
  { id: '4', name: 'Emily Brown', email: 'emily.b@example.com', source: 'Website', status: 'New', date: '2023-10-23' },
  { id: '5', name: 'David Wilson', email: 'david.w@example.com', source: 'Referral', status: 'Client', date: '2023-10-22' },
];

const statusVariant: { [key in Lead['status']]: "secondary" | "default" | "outline" | "destructive" } = {
  'New': 'secondary',
  'Contacted': 'default',
  'Qualified': 'outline',
  'Client': 'destructive'
};
// 'destructive' for Client is just to show a different color. A real app might use a success variant.
statusVariant['Client'] = 'default';

export default function OpsDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads (Month)</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+45</div>
            <p className="text-xs text-muted-foreground">+12 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Value Leads</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting initial contact</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>A list of the latest leads from all channels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[lead.status] || 'default'}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(lead.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Log Activity</DropdownMenuItem>
                        <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
