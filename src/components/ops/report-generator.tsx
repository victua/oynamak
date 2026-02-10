"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateReportAction, GenerationState } from "@/app/actions/generate-report";
import { Loader2, Sparkles } from "lucide-react";

const ReportSchema = z.object({
  historicalDocuments: z.string().min(50, {
    message: "Please provide at least 50 characters of historical data for analysis.",
  }),
  reportType: z.string({
    required_error: "Please select a report type.",
  }),
});

export default function ReportGenerator() {
  const [generationState, setGenerationState] = useState<GenerationState>({});
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      historicalDocuments: "",
      reportType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ReportSchema>) {
    setIsLoading(true);
    setGenerationState({});
    const state = await generateReportAction(values);
    setGenerationState(state);
    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="reportType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a report type to generate" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Quarterly Performance Review">Quarterly Performance Review</SelectItem>
                    <SelectItem value="Annual Portfolio Summary">Annual Portfolio Summary</SelectItem>
                    <SelectItem value="Investment Strategy Outlook">Investment Strategy Outlook</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="historicalDocuments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Documents</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste relevant historical client documents here. Separate distinct documents for best results."
                    className="min-h-[250px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Description
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
            <CardDescription>The AI-generated summary will appear below.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {isLoading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p>Analyzing documents...</p>
              </div>
            ) : generationState.error ? (
                <p className="text-destructive text-center">{generationState.error}</p>
            ) : generationState.result?.reportDescription ? (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">{generationState.result.reportDescription}</p>
                {generationState.result.progress && <p className="text-xs text-muted-foreground italic">AI Note: {generationState.result.progress}</p>}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">Your generated report description will be displayed here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
