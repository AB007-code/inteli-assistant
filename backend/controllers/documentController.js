const Document = require("../models/Document.js");
const pdfParse = require("pdf-parse");
const jwt = require("jsonwebtoken");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let content = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      content = data.text;
    } else if (req.file.mimetype === "text/plain") {
      content = req.file.buffer.toString("utf-8");
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    await Document.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      content,
      fileData: req.file.buffer, // ✅ binary stored
      fileType: req.file.mimetype,
    });

    res.json({ message: "Document uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user.id });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};
exports.viewDocument = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doc = await Document.findOne({
      _id: req.params.id,
      userId: decoded.id,
    });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.setHeader("Content-Type", doc.fileType);
    res.send(doc.fileData);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
