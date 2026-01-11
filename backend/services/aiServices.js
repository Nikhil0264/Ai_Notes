import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askQuestionFromNotes = async (notesText, question) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
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
  const response = result.response.text();

  return response;
};
