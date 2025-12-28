const Document = require("../models/Document.js");
const QueryHistory = require("../models/QueryHistory.js");
const { askGemini } = require("../utils/gemini.js");

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const previousChats = await QueryHistory.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const conversationMemory = previousChats
      .map(
        (c) => `Previous Question: ${c.question}\nPrevious Answer: ${c.answer}`
      )
      .join("\n");

    const allDocs = await Document.find({ userId: req.user.id });

    if (allDocs.length === 0) {
      return res.json({
        answer: "Information not available in uploaded documents.",
        references: [],
      });
    }

    const keywords = question.toLowerCase().split(/\s+/);
    const matchedDocs = allDocs.filter((doc) =>
      keywords.some((word) => doc.content.toLowerCase().includes(word))
    );

    if (matchedDocs.length === 0) {
      return res.json({
        answer: "Information not available in uploaded documents.",
        references: [],
      });
    }

    const documentContext = matchedDocs
      .map(
        (doc) =>
          `DOCUMENT NAME: ${
            doc.fileName
          }\nDOCUMENT TEXT:\n${doc.content.substring(0, 1500)}`
      )
      .join("\n\n");

    const combinedContext = `
CHAT HISTORY (FOR CONTEXT ONLY):
${conversationMemory}

DOCUMENT CONTEXT (SOURCE OF TRUTH):
${documentContext}
`;
    const rawAnswer = await askGemini(combinedContext, question);
    let usedDocs = [];
    let answer = rawAnswer;
    const match = rawAnswer.match(/USED_DOCUMENTS:\s*(\[[^\]]*\])/);
    if (match) {
      usedDocs = JSON.parse(match[1]);
      answer = rawAnswer.replace(match[0], "").trim();
    }

    const references = matchedDocs
      .filter((doc) => usedDocs.includes(doc.fileName))
      .map((doc) => ({
        document: doc.fileName,
        excerpt: doc.content.substring(0, 200),
      }));

    if (
      answer === "Information not available in uploaded documents." ||
      references.length === 0
    ) {
      return res.json({
        answer: "Information not available in uploaded documents.",
        references: [],
      });
    }

    await QueryHistory.create({
      userId: req.user.id,
      question,
      answer,
      references,
    });

    res.json({ answer, references });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Failed to generate answer" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await QueryHistory.find({ userId: req.user.id }).sort({
      createdAt: 1,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};
