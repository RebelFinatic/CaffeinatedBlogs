'use server';

/**
 * @fileOverview AI flow for generating article summaries.
 *
 * - generateArticleSummary - A function that generates a summary for a given article.
 * - GenerateArticleSummaryInput - The input type for the generateArticleSummary function.
 * - GenerateArticleSummaryOutput - The return type for the generateArticleSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleSummaryInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the article to be summarized.'),
});

export type GenerateArticleSummaryInput = z.infer<
  typeof GenerateArticleSummaryInputSchema
>;

const GenerateArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the article.'),
  hasSufficientContext: z
    .boolean()
    .describe(
      'Indicates whether the article content provides sufficient context for generating a meaningful summary.'
    ),
});

export type GenerateArticleSummaryOutput = z.infer<
  typeof GenerateArticleSummaryOutputSchema
>;

export async function generateArticleSummary(
  input: GenerateArticleSummaryInput
): Promise<GenerateArticleSummaryOutput> {
  return generateArticleSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleSummaryPrompt',
  input: {schema: GenerateArticleSummaryInputSchema},
  output: {schema: GenerateArticleSummaryOutputSchema},
  prompt: `You are an expert summarizer for blog articles. Your goal is to provide a concise summary of the article content provided.

Article Content: {{{articleContent}}}

First, determine if the article content provides sufficient context to generate a meaningful and accurate summary. If the content is too short, nonsensical, or lacks sufficient detail, set hasSufficientContext to false and return an empty summary. Otherwise, set hasSufficientContext to true and generate a summary that captures the main points of the article.

Ensure the summary is no more than three sentences long.

Output the summary and the hasSufficientContext boolean in the JSON format specified by the output schema.
`,
});

const generateArticleSummaryFlow = ai.defineFlow(
  {
    name: 'generateArticleSummaryFlow',
    inputSchema: GenerateArticleSummaryInputSchema,
    outputSchema: GenerateArticleSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
