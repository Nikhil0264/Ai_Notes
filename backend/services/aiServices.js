import { GoogleGenAI } from "@google/genai";
import { AI_API_KEY } from '../env.js';

const ai = new GoogleGenAI({ apiKey: AI_API_KEY });

export const generateAnswer = async (req, res) => {
  const { message } = req.body; 
  console.log("message :",message)
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    });

    return res.json({
      text: response?.text || "This service will be implemented in the future"
    });

  } catch (error) {
    console.error("Error in generateAnswer:", error);
    return res.status(500).json({ text: "Error generating summary" });
  }
};
