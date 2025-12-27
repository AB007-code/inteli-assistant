const axios = require("axios");

exports.askGemini = async (context, question) => {
  const prompt = `
You are an AI assistant.
Answer ONLY using the document context below.
If the answer is not found, reply exactly:
"Information not available in uploaded documents."

Document Context:
${context}

Question:
${question}
`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      params: { key: process.env.GEMINI_API_KEY },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};
