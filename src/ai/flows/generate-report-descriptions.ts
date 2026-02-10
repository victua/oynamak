'use server';

/**
 * @fileOverview A flow for generating report descriptions using AI.
 *
 * - generateReportDescriptions - A function that generates descriptions for reports.
 * - GenerateReportDescriptionsInput - The input type for the generateReportDescriptions function.
 * - GenerateReportDescriptionsOutput - The return type for the generateReportDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportDescriptionsInputSchema = z.object({
  historicalDocuments: z
    .string()
    .describe(
      'Historical client documents as a single string. Each document should be separated by a delimiter.'
    ),
  reportType: z.string().describe('The type of report being generated.'),
  delimiter: z.string().default('---DOCUMENT_SEPARATOR---').describe('Delimiter used to separate documents.'),
});
export type GenerateReportDescriptionsInput = z.infer<typeof GenerateReportDescriptionsInputSchema>;

const GenerateReportDescriptionsOutputSchema = z.object({
  reportDescription: z.string().describe('A concise and insightful AI-generated description for the report.'),
  progress: z.string().describe('The AI-generated progress for generating report descriptions'),
});
export type GenerateReportDescriptionsOutput = z.infer<typeof GenerateReportDescriptionsOutputSchema>;

export async function generateReportDescriptions(input: GenerateReportDescriptionsInput): Promise<GenerateReportDescriptionsOutput> {
  return generateReportDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportDescriptionsPrompt',
  input: {schema: GenerateReportDescriptionsInputSchema},
  output: {schema: GenerateReportDescriptionsOutputSchema},
  prompt: `You are an AI assistant that specializes in summarizing financial documents and generating insightful descriptions for client portfolio reports.

  Your goal is to analyze a collection of historical client documents and generate a concise, informative, and engaging description that will be included in the client's current portfolio report.

  Consider the report type when generating the description. Tailor the description to highlight the most relevant information for that specific report type.

  Here are the historical documents, separated by the delimiter \"{{{delimiter}}}\":
  {{historicalDocuments}}

  Report Type: {{reportType}}

  Please generate a report description that is no more than 200 words. Focus on key trends, significant changes, and overall portfolio performance.
  End with a single, short sentence summarizing your progress in a field called "progress".`,
});

const generateReportDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateReportDescriptionsFlow',
    inputSchema: GenerateReportDescriptionsInputSchema,
    outputSchema: GenerateReportDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
