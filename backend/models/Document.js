const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fileName: String,
  filePath: String,
  content: String,
  status: {
    type: String,
    default: "processed",
  },
});

module.exports = mongoose.model("Document", documentSchema);
