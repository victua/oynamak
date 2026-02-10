"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Landmark, Home, Briefcase, ShieldCheck } from "lucide-react";
import type { PortfolioItem, ClientDocument } from "@/lib/types";

const portfolioItems: (PortfolioItem & { icon: React.ElementType, goal: number })[] = [
  { id: '1', service: 'Investments', status: 'Active', value: 250000, goal: 500000, icon: Landmark },
  { id: '2', service: 'Real Estate', status: 'Active', value: 850000, goal: 1000000, icon: Home },
  { id: '3', service: 'Consulting', status: 'Pending', value: 0, goal: 0, icon: Briefcase },
  { id: '4', service: 'Insurance', status: 'Active', value: 50000, goal: 50000, icon: ShieldCheck },
];

const documents: ClientDocument[] = [
  { id: 'doc1', name: 'Q3 2023 Performance Report', type: 'Report', uploadDate: '2023-10-15' },
  { id: 'doc2', name: 'Investment Account Statement - Sep 2023', type: 'Statement', uploadDate: '2023-10-05' },
  { id: 'doc3', name: 'Updated Service Agreement', type: 'Contract', uploadDate: '2023-09-20' },
];

const chartData = [
  { date: 'Jan 23', value: 1100000 },
  { date: 'Feb 23', value: 1120000 },
  { date: 'Mar 23', value: 1150000 },
  { date: 'Apr 23', value: 1130000 },
  { date: 'May 23', value: 1180000 },
  { date: 'Jun 23', value: 1210000 },
  { date: 'Jul 23', value: 1230000 },
  { date: 'Aug 23', value: 1250000 },
  { date: 'Sep 23', value: 1240000 },
  { date: 'Oct 23', value: 1280000 },
];

const chartConfig = {
  value: {
    label: "Portfolio Value",
    color: "hsl(var(--primary))",
  },
};

export default function ClientDashboard() {
  const totalValue = portfolioItems.reduce((acc, item) => acc + item.value, 0);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Welcome Back, Sarah</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {portfolioItems.map((item) => {
          const Icon = item.icon;
          const progress = item.goal > 0 ? (item.value / item.goal) * 100 : 0;
          return (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.service}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${item.value.toLocaleString()}
                </div>
                {item.goal > 0 && (
                  <>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(progress)}% of ${item.goal.toLocaleString()} goal
                    </p>
                    <Progress value={progress} className="mt-2 h-2" />
                  </>
                )}
                {item.status !== 'Active' && <Badge variant="outline" className="mt-2">{item.status}</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>
              Total Value: ${totalValue.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <Tooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="var(--color-value)"
                  fillOpacity={0.4}
                  stroke="var(--color-value)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your latest statements and reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">{doc.uploadDate}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
