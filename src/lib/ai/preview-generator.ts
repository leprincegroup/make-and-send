import { getAnthropicClient } from "./anthropic";
import type { PhotoAnalysis, PreviewOptions, PreviewResult } from "@/types/preview";

/**
 * Analyze an uploaded photo using Claude's vision capabilities.
 * Extracts appearance details needed to describe a custom bobblehead.
 */
export async function analyzePhoto(photoUrl: string): Promise<PhotoAnalysis> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "url",
              url: photoUrl,
            },
          },
          {
            type: "text",
            text: `Analyze this photo of a person for creating a custom bobblehead figurine. Return a JSON object with exactly these fields:

{
  "appearance": "A brief overall description of the person (1-2 sentences)",
  "hairStyle": "Hair color, length, and style (e.g. 'short brown curly hair')",
  "skinTone": "Skin tone description (e.g. 'light', 'medium', 'olive', 'tan', 'dark')",
  "facialFeatures": "Notable facial features — smile type, face shape, eyebrows, beard/mustache if any",
  "glasses": true or false,
  "outfit": "Description of what the person is wearing",
  "suggestedPose": "A fun, friendly pose suggestion for the bobblehead (e.g. 'thumbs up', 'arms crossed confidently', 'holding a coffee mug')"
}

Return ONLY the JSON object, no markdown formatting or extra text.`,
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response received from analysis");
  }

  try {
    const analysis = JSON.parse(textBlock.text) as PhotoAnalysis;
    return analysis;
  } catch {
    throw new Error("Failed to parse photo analysis response");
  }
}

/**
 * Generate a detailed image-generation prompt from the photo analysis
 * and customization options. This prompt is designed to work with
 * DALL-E, Stable Diffusion, Midjourney, or similar image generation APIs.
 */
export function generatePreviewPrompt(
  analysis: PhotoAnalysis,
  options: PreviewOptions
): string {
  const name = options.recipientName || "the person";
  const plaqueText = options.plaqueText || name;
  const outfitDescription = options.outfitStyle || analysis.outfit;

  const glassesNote = analysis.glasses
    ? " wearing stylish glasses"
    : "";

  const prompt = [
    `A 3D rendered custom bobblehead figurine of ${analysis.appearance},`,
    `standing on a warm walnut-brown base with a gold nameplate reading "${plaqueText}".`,
    `The figure has an oversized head (bobblehead proportions) with ${analysis.facialFeatures}${glassesNote}.`,
    `${analysis.hairStyle}.`,
    `${analysis.skinTone} skin tone.`,
    `Wearing ${outfitDescription}.`,
    `The figure is in a ${analysis.suggestedPose} pose.`,
    `Pixar/cartoon style, soft studio lighting, clean white background,`,
    `high detail, miniature figurine aesthetic, warm and friendly expression.`,
  ].join(" ");

  return prompt;
}

/**
 * Full preview generation pipeline.
 * Analyzes the photo, generates the prompt, and returns the complete result.
 *
 * To add actual image generation later, plug in an image generation API
 * call after generating the prompt and include the resulting image URL
 * in the PreviewResult.
 */
export async function generatePreview(
  photoUrl: string,
  options: PreviewOptions
): Promise<PreviewResult> {
  // Step 1: Analyze the uploaded photo with Claude Vision
  const analysis = await analyzePhoto(photoUrl);

  // Step 2: Generate an image-generation prompt from the analysis
  const prompt = generatePreviewPrompt(analysis, options);

  // Step 3: (Future) Call image generation API here
  // e.g. const imageUrl = await generateImage(prompt);

  return {
    analysis,
    prompt,
    generatedAt: new Date().toISOString(),
  };
}
