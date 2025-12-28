const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  content: String,
  fileData: Buffer,
  fileType: String,
  status: { type: String, default: "processed" },
});

module.exports = mongoose.model("Document", documentSchema);
