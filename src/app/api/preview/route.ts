import { generatePreview } from "@/lib/ai/preview-generator";
import type { PreviewOptions } from "@/types/preview";

// Simple in-memory rate limiter: max 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  // Parse and validate request body
  let body: {
    photoUrl?: string;
    recipientName?: string;
    plaqueText?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { photoUrl, recipientName, plaqueText } = body;

  if (!photoUrl || typeof photoUrl !== "string") {
    return Response.json(
      { error: "photoUrl is required and must be a string" },
      { status: 400 }
    );
  }

  // Validate the URL format
  try {
    new URL(photoUrl);
  } catch {
    return Response.json(
      { error: "photoUrl must be a valid URL" },
      { status: 400 }
    );
  }

  // Check that the Anthropic API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "AI preview service is not configured. Please set ANTHROPIC_API_KEY." },
      { status: 503 }
    );
  }

  // Generate the preview
  const options: PreviewOptions = {
    recipientName: recipientName || undefined,
    plaqueText: plaqueText || undefined,
  };

  try {
    const result = await generatePreview(photoUrl, options);
    return Response.json(result);
  } catch (err) {
    console.error("Preview generation failed:", err);
    const message =
      err instanceof Error ? err.message : "Preview generation failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
