import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up body parsing with limits for image uploading
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Lazy initializer for Google GenAI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please add your key in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint: Active state check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API endpoint: Coach & Wait-State Optimizer (thinkingLevel: HIGH, model: gemini-3.1-pro-preview)
app.post("/api/gemini/coach", async (req, res) => {
  try {
    const { environment, languages, queriesPerDay, comments } = req.body;
    
    if (!environment || !languages || !queriesPerDay) {
      res.status(400).json({ error: "Missing required parameters: environment, languages, queriesPerDay" });
      return;
    }

    const ai = getGeminiClient();
    
    const prompt = `
You are the Chief Wait-State Strategist for "Devorix" (devorix.ai), a revolutionary B2C platform that enables software developers to monetize their terminal and IDE loading states/loading spinners with subtle, premium B2B developer sponsorships.

Analyze the developer's tech stack and estimate their potential earnings:
- Primary IDE/Environment: ${environment}
- Main Languages: ${languages.join(", ")}
- Est. AI queries/compilations/tests per day: ${queriesPerDay}
- Custom Workflow Comments: ${comments || "None"}

Please perform a deep, rigorous "High Thinking" analysis of their daily wait-states. In your response:
1. CALCULATE the estimated idle wait-state seconds per day based on their languages (e.g., Go has super fast compiles but slow test suites; Rust has notorious compile wait states; heavy AI users wait for Claude/Gemini spinners constantly).
2. CONVERT those wait states into a premium "Earning Potential" estimate (Devorix pays ~₹0.35 to ₹0.60 per impression depending on wait time and developer specialty).
3. PROVIDE custom B2B sponsor matches that would pay premium CPM rates for their specific profile (e.g., Rust devs fit AWS/Clerk/Supabase; TS devs fit Vercel/Neon; Python ML devs fit Lambda Labs/Pinecone).
4. SUGGEST micro-optimizations they can make in their workspace (such as custom Alacritty/iTerm padding, or VS Code footer transparency) to render B2B sponsorships with 100% aesthetic integration, looking indistinguishable from custom developer themes.

Format your output in clean, gorgeous, engaging Markdown. Use deep technical insights, a touch of dry developer humor, and precise advice.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/coach:", error);
    res.status(500).json({ error: error.message || "Failed to generate coaching suggestions." });
  }
});

// API endpoint: Analyze Workspace Image (model: gemini-3.1-pro-preview)
app.post("/api/gemini/analyze-image", async (req, res) => {
  try {
    const { image, promptText } = req.body;

    if (!image) {
      res.status(400).json({ error: "No workspace image provided." });
      return;
    }

    // Strip header if present (e.g., "data:image/png;base64,")
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/png";

    const ai = getGeminiClient();

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    };

    const textPart = {
      text: promptText || "Analyze this terminal or IDE workspace. Determine: 1) What editor or shell is being used. 2) The color palette / theme (e.g. Gruvbox, Nord, One Dark). 3) Suggest the absolute perfect hex color values, padding, and layout (subtle single-line footer or double-height badge) to seamlessly display Devorix ad sponsorships so they appear fully native and zero-distraction. Estimate their earning level (Standard, Premium, or Elite Ultra-Subtle) based on setup aesthetics.",
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: { parts: [imagePart, textPart] },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/analyze-image:", error);
    res.status(500).json({ error: error.message || "Failed to analyze workspace image." });
  }
});

// API endpoint: Generate Custom Developer Footer Ads (model: gemini-3.5-flash)
app.post("/api/gemini/generate-ad", async (req, res) => {
  try {
    const { brand, productDescription, primaryColor } = req.body;

    if (!brand || !productDescription) {
      res.status(400).json({ error: "Missing brand or productDescription parameters" });
      return;
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
      model: "gemini-3.5-flash",
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
    res.json(JSON.parse(textOutput));
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-ad:", error);
    res.status(500).json({ error: error.message || "Failed to generate ad copy variations." });
  }
});

// Configure Vite middleware or static delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Devorix Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
