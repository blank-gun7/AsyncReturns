import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const { image, promptText } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No workspace image provided." }, { status: 400 });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/png";

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: promptText || "Analyze this terminal or IDE workspace. Determine: 1) What editor or shell is being used. 2) The color palette / theme (e.g. Gruvbox, Nord, One Dark). 3) Suggest the absolute perfect hex color values, padding, and layout (subtle single-line footer or double-height badge) to seamlessly display Devorix ad sponsorships so they appear fully native and zero-distraction. Estimate their earning level (Standard, Premium, or Elite Ultra-Subtle) based on setup aesthetics.",
          },
        ],
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/analyze-image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze workspace image." },
      { status: 500 }
    );
  }
}
