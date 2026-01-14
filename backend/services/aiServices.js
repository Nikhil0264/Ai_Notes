import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_API_KEY } from "../env.js";

const genAI = new GoogleGenerativeAI(AI_API_KEY);

export const askQuestionFromNotes = async (notesText, question) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "text-bison-001" // ✅ supported model
    });

    const prompt = `
You are an AI assistant.
Answer ONLY from the provided notes.
If the answer is not in the notes, say "Not found in notes".

NOTES:
${notesText}

QUESTION:
${question}
    `;

    const result = await model.generateContent(prompt);
    const response = result.output?.[0]?.content || "No response generated";

    return response;
  } catch (error) {
    console.error("Error in askQuestionFromNotes:", error.message);
    return "Error generating answer";
  }
};
