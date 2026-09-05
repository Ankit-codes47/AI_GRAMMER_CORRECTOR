import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 5000;

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Middleware
app.set("view engine", "ejs");
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
  const text = req.body.text?.trim();

  // Empty input
  if (!text) {
    return res.render("index", {
      corrected: "Please enter some text to correct.",
      originalText: "",
    });
  }

  try {
    // Ask Gemini to correct the text
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
You are an expert English grammar correction assistant.

Correct the grammar, spelling, punctuation, and sentence structure
of the following text.

Rules:
1. Preserve the original meaning.
2. Do not add new information.
3. Do not explain the corrections.
4. Return ONLY the corrected text.

Text:
${text}
      `,
    });

    const correctedText = response.text;

    console.log("Original:", text);
    console.log("Corrected:", correctedText);

    // Send result to EJS
    return res.render("index", {
      corrected: correctedText,
      originalText: text,
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.render("index", {
      corrected: "Error while connecting to Gemini. Check the terminal.",
      originalText: text,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});