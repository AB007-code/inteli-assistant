// const Document = require("../models/Document");
// const pdfParse = require("pdf-parse");

// exports.uploadDocument = async (req, res) => {
//   try {
//     // 1. Validate file
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const file = req.file;
//     let content = "";

//     // 2. Extract text
//     if (file.mimetype === "application/pdf") {
//       const parsed = await pdfParse(file.buffer);
//       content = parsed.text;
//     } else if (file.mimetype === "text/plain") {
//       content = file.buffer.toString("utf-8");
//     } else {
//       return res.status(400).json({ message: "Unsupported file type" });
//     }

//     // 3. Save document
//     await Document.create({
//       userId: req.user.id,
//       fileName: file.originalname,
//       content,
//       status: "processed",
//     });

//     res.json({ message: "Document uploaded successfully" });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Error processing document" });
//   }
// };

// exports.getDocuments = async (req, res) => {
//   try {
//     const docs = await Document.find({ userId: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json(docs);
//   } catch (error) {
//     console.error("Get documents error:", error);
//     res.status(500).json({ message: "Failed to fetch documents" });
//   }
// };

const Document = require("../models/Document");
const pdfParse = require("pdf-parse");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    let content = "";

    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(file.buffer);
      content = data.text;
    } else if (file.mimetype === "text/plain") {
      content = file.buffer.toString("utf-8");
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    await Document.create({
      userId: req.user.id,
      fileName: file.originalname,
      content,
      status: "processed",
    });

    res.json({ message: "Document uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error processing document" });
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
