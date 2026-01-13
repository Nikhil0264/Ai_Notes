import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_API_KEY } from "../env";

const genAI = new GoogleGenerativeAI(AI_API_KEY);

export const generateSummary = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `
Summarize the following notes clearly.
Focus on definitions, key points and explanations.
Keep it concise.

NOTES:
${text.slice(0, 12000)}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
