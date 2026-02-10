import ReportGenerator from '@/components/ops/report-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">AI-Powered Report Generation</CardTitle>
            <CardDescription className="text-md">
              Generate insightful client portfolio report descriptions using AI. Analyze historical documents to create compelling summaries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportGenerator />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
