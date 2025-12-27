const express = require("express");
const auth = require("../middleware/authMiddleware.js");
const { askQuestion, getHistory } = require("../controllers/chatController.js");

const router = express.Router();

router.post("/ask", auth, askQuestion);
router.get("/history", auth, getHistory);

module.exports = router;
