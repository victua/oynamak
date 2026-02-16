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
    <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl md:text-4xl text-primary">Overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {portfolioItems.map((item) => {
          const Icon = item.icon;
          const progress = item.goal > 0 ? (item.value / item.goal) * 100 : 0;
          return (
            <Card key={item.id} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.service}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  KES {item.value.toLocaleString()}
                </div>
                {item.goal > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                )}
                {item.status !== 'Active' && <Badge variant="secondary" className="mt-3">{item.status}</Badge>}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-lg border-none bg-card rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Portfolio Performance</CardTitle>
            <CardDescription className="text-base">
              Total Value: <span className="font-semibold text-foreground">KES {totalValue.toLocaleString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} className="text-xs text-muted-foreground" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `KES ${Number(value) / 1000}k`}
                  className="text-xs text-muted-foreground"
                />
                <Tooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `KES ${Number(value).toLocaleString()}`}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-lg border-none bg-card rounded-xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Recent Documents</CardTitle>
            <CardDescription>Your latest statements and reports.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="pl-0 text-primary font-semibold">Name</TableHead>
                  <TableHead className="text-primary font-semibold">Type</TableHead>
                  <TableHead className="text-right text-primary font-semibold pr-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} className="border-b hover:bg-muted/50">
                    <TableCell className="pl-0 py-4">
                      <div className="font-medium text-foreground">{doc.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{doc.uploadDate}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className="font-normal">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-0 py-4">
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
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
