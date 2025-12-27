const mongoose = require("mongoose");

const queryHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    references: [
      {
        document: String,
        excerpt: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QueryHistory", queryHistorySchema);
