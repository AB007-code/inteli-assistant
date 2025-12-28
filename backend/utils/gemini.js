const axios = require("axios");

exports.askGemini = async (context, question) => {
  const prompt = `
You are an AI assistant.

STRICT RULES:
1. DOCUMENT CONTEXT is the ONLY source of truth.
2. CHAT HISTORY is for conversational understanding ONLY.
3. Do NOT use chat history as factual source.
4. If answer is not found in DOCUMENT CONTEXT, reply:
   "Information not available in uploaded documents."
5. After answering, list USED document names in JSON:

USED_DOCUMENTS: ["file.pdf"]

DOCUMENT CONTEXT:
${context}

QUESTION:
${question}
`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      params: { key: process.env.GEMINI_API_KEY },
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};
