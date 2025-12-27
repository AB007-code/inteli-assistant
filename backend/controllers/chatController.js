const Document = require("../models/Document.js");
const QueryHistory = require("../models/QueryHistory.js");
const { askGemini } = require("../utils/gemini.js");

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const docs = await Document.find({ userId: req.user.id });

    if (docs.length === 0) {
      return res.json({
        answer: "No documents uploaded",
        references: [],
      });
    }
    const context = docs
      .map(
        (d) =>
          `Document: ${d.fileName}\nContent:\n${d.content.substring(0, 1500)}`
      )
      .join("\n\n");
    const answer = await askGemini(context, question);
    const references = docs.map((d) => ({
      document: d.fileName,
      excerpt: d.content.substring(0, 200),
    }));
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
      createdAt: -1,
    });

    res.json(history);
  } catch {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
