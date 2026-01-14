import { GoogleGenAI } from "@google/genai";
import { AI_API_KEY } from "../env.js";

const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

export const generateSummary = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // supported model
      contents: `Summarize the following notes clearly.
Focus on definitions, key points and explanations.
Keep it concise.

NOTES:
${text}`
    });

    // response.text contains the generated summary
    if (response?.text) {
      return response.text;
    }

    return "No summary generated";

  } catch (error) {
    console.error("Error in generateSummary:", error);
    return "Error generating summary";
  }
};
