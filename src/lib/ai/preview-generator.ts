import { getGeminiClient } from "./gemini";
import type {
  PhotoAnalysis,
  PreviewOptions,
  PreviewResult,
} from "@/types/preview";

/**
 * Analyze an uploaded photo using Gemini's vision capabilities.
 * Extracts appearance details needed to describe a custom bobblehead.
 */
export async function analyzePhoto(photoUrl: string): Promise<PhotoAnalysis> {
  const client = getGeminiClient();

  const response = await client.chat.completions.create({
    model: "gemini-3-flash-preview",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: photoUrl },
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

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error("No text response received from analysis");
  }

  try {
    // Strip potential markdown code fences
    const cleaned = text.replace(/```(?:json)?\s*/g, "").replace(/```\s*/g, "").trim();
    const analysis = JSON.parse(cleaned) as PhotoAnalysis;
    return analysis;
  } catch {
    throw new Error("Failed to parse photo analysis response");
  }
}

/**
 * Generate a detailed image-generation prompt from the photo analysis
 * and customization options.
 */
export function generatePreviewPrompt(
  analysis: PhotoAnalysis,
  options: PreviewOptions
): string {
  const name = options.recipientName || "the person";
  const plaqueText = options.plaqueText || name;
  const outfitDescription = options.outfitStyle || analysis.outfit;

  const glassesNote = analysis.glasses ? " wearing stylish glasses" : "";

  const prompt = [
    `Generate a 3D rendered custom bobblehead figurine.`,
    `The figure has an oversized cartoonish head (bobblehead proportions) on a spring neck,`,
    `standing on a dark base with a nameplate reading "${plaqueText}".`,
    `${analysis.appearance}.`,
    `The figure has ${analysis.facialFeatures}${glassesNote}.`,
    `${analysis.hairStyle}.`,
    `${analysis.skinTone} skin tone.`,
    `Wearing ${outfitDescription}.`,
    `The figure is in a ${analysis.suggestedPose} pose.`,
    `Pixar/cartoon style, studio lighting, soft shadows, white/light gray background.`,
    `High quality, detailed, fun and professional.`,
  ].join(" ");

  return prompt;
}

/**
 * Generate a bobblehead preview image from a text prompt using Gemini's
 * image generation model via the OpenAI-compatible images API.
 *
 * Returns the image as a base64 data URL, or null if generation fails.
 */
export async function generatePreviewImage(
  prompt: string
): Promise<string | null> {
  try {
    const client = getGeminiClient();

    const response = await client.images.generate({
      model: "gemini-2.5-flash-image",
      prompt,
      n: 1,
      response_format: "b64_json",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      console.error("Gemini image generation returned no image data");
      return null;
    }

    return `data:image/png;base64,${b64}`;
  } catch (err) {
    console.error("Gemini image generation failed:", err);
    return null;
  }
}

/**
 * Full preview generation pipeline.
 * Analyzes the photo, generates the prompt, generates the image,
 * and returns the complete result.
 */
export async function generatePreview(
  photoUrl: string,
  options: PreviewOptions
): Promise<PreviewResult> {
  // Step 1: Analyze the uploaded photo with Gemini Vision
  const analysis = await analyzePhoto(photoUrl);

  // Step 2: Generate an image-generation prompt from the analysis
  const prompt = generatePreviewPrompt(analysis, options);

  // Step 3: Generate the bobblehead preview image
  const imageUrl = await generatePreviewImage(prompt);

  return {
    analysis,
    prompt,
    imageUrl: imageUrl ?? undefined,
    generatedAt: new Date().toISOString(),
  };
}
