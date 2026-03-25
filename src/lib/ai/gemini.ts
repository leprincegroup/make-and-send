import OpenAI from "openai";

let client: OpenAI | null = null;

export function getGeminiClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
  }
  return client;
}
