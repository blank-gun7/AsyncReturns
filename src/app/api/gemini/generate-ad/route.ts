import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const { brand, productDescription, primaryColor } = await request.json();

    if (!brand || !productDescription) {
      return NextResponse.json(
        { error: "Missing brand or productDescription parameters" },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const prompt = `
You are the Lead Creative Copywriter at Devorix. You help B2B dev-tool advertisers design incredibly subtle, tasteful, developer-centric sponsorship lines.

Advertiser Brand: ${brand}
What they do: ${productDescription}
Aesthetic primary hex color preference: ${primaryColor || "amber"}

Generate 3 variations of "Devorix" sponsorships. These must fit on a single line or a tight double-line inside a shell during compilations, or as a status bar footer inside Cursor/VS Code.
They must sound highly practical, authentic, or slightly nerdy/humorous, rather than like standard corporate "ad slop".

Return a valid JSON array of objects representing the variations. Each object MUST contain:
- "type": "terminal" (minimal shell styling), "ide" (subtle VS Code status line) or "terminal-badge" (stamped with high contrast tag)
- "badgeText": short banner like "Sponsored", "Featured", "DevTools"
- "copy": the actual sponsor line (e.g. "Clerk: Auth is hard. Drop in our React components and spend your time building features.")
- "badgeColor": Tailwind color class suggestor (e.g., "amber", "blue", "emerald", "sky", "violet")
- "humorLevel": "Low", "Medium", "High"
- "rationale": short explanation of why this copy appeals to developers.

Ensure the final output is ONLY the JSON block. Do not wrap it in markdown code blocks.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  badgeText: { type: Type.STRING },
                  copy: { type: Type.STRING },
                  badgeColor: { type: Type.STRING },
                  humorLevel: { type: Type.STRING },
                  rationale: { type: Type.STRING },
                },
                required: ["type", "badgeText", "copy", "badgeColor", "humorLevel", "rationale"],
              },
            },
          },
          required: ["variations"],
        },
      },
    });

    const textOutput = response.text || "{}";
    return NextResponse.json(JSON.parse(textOutput));
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-ad:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate ad copy variations." },
      { status: 500 }
    );
  }
}
