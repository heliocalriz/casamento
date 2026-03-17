'use server';
/**
 * @fileOverview A Genkit flow for generating engaging gift descriptions.
 *
 * - generateGiftDescription - A function that handles the gift description generation process.
 * - GenerateGiftDescriptionInput - The input type for the generateGiftDescription function.
 * - GenerateGiftDescriptionOutput - The return type for the generateGiftDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGiftDescriptionInputSchema = z.object({
  giftName: z.string().describe('The name of the gift item.'),
  giftCategory: z.string().optional().describe('The category of the gift item, if applicable.'),
});
export type GenerateGiftDescriptionInput = z.infer<typeof GenerateGiftDescriptionInputSchema>;

const GenerateGiftDescriptionOutputSchema = z.object({
  description: z.string().describe('An engaging and descriptive text for the gift item.'),
});
export type GenerateGiftDescriptionOutput = z.infer<typeof GenerateGiftDescriptionOutputSchema>;

export async function generateGiftDescription(
  input: GenerateGiftDescriptionInput
): Promise<GenerateGiftDescriptionOutput> {
  return generateGiftDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGiftDescriptionPrompt',
  input: { schema: GenerateGiftDescriptionInputSchema },
  output: { schema: GenerateGiftDescriptionOutputSchema },
  prompt: `You are a creative copywriter specializing in appealing product descriptions for gifts.
Generate an engaging and descriptive text for a gift item.

Gift Name: {{{giftName}}}
{{#if giftCategory}}
Gift Category: {{{giftCategory}}}
{{/if}}

Your description should be compelling, highlight key features or sentiments, and make the gift sound appealing to potential recipients. Keep it concise but impactful.`,
});

const generateGiftDescriptionFlow = ai.defineFlow(
  {
    name: 'generateGiftDescriptionFlow',
    inputSchema: GenerateGiftDescriptionInputSchema,
    outputSchema: GenerateGiftDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
