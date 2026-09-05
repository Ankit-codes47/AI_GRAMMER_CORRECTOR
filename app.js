import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

// Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  res.render("index", {
    corrected: "",
    originalText: "",
  });
});

// Grammar correction
app.post("/correct", async (req, res) => {
  try {
    const text = req.body.text?.trim();

    if (!text) {
      return res.render("index", {
        corrected: "Please enter some text to correct.",
        originalText: "",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
You are an expert English grammar correction assistant.

Correct the grammar, spelling, punctuation, and sentence structure
of the following text.

Rules:
- Preserve the original meaning.
- Do not add new information.
- Do not explain the corrections.
- Return ONLY the corrected text.

Text:
${text}
      `,
    });

    const correctedText = response.text;

    return res.render("index", {
      corrected: correctedText,
      originalText: text,
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(500).render("index", {
      corrected: "Unable to correct the text. Please try again.",
      originalText: req.body.text || "",
    });
  }
});

// Export for Vercel
export default app;

// Local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}