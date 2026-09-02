"use server";

import { generateReportDescriptions, GenerateReportDescriptionsInput, GenerateReportDescriptionsOutput } from '@/ai/flows/generate-report-descriptions';
import { z } from "zod";

const ReportSchema = z.object({
  historicalDocuments: z.string().min(10, 'Please provide some historical documents.'),
  reportType: z.string().min(1, 'Please select a report type.'),
  delimiter: z.string().optional().default('---DOCUMENT_SEPARATOR---'),
});

export type GenerationState = {
  result?: GenerateReportDescriptionsOutput;
  error?: string;
  fieldErrors?: {
    historicalDocuments?: string[];
    reportType?: string[];
  }
}

export async function generateReportAction(
  data: { historicalDocuments: string; reportType: string; delimiter?: string }
): Promise<GenerationState> {
  const validatedFields = ReportSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid input provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateReportDescriptions({
      historicalDocuments: validatedFields.data.historicalDocuments,
      reportType: validatedFields.data.reportType,
      delimiter: validatedFields.data.delimiter || '---DOCUMENT_SEPARATOR---',
    });
    return { result };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to generate report description: ${errorMessage}` };
  }
}
