const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");
const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", auth, upload.single("file"), uploadDocument);
router.get("/", auth, getDocuments);

module.exports = router;
