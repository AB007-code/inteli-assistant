const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware.js");
const {
  uploadDocument,
  getDocuments,
  viewDocument,
} = require("../controllers/documentController.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", auth, upload.single("file"), uploadDocument);
router.get("/", auth, getDocuments);
router.get("/:id/view", viewDocument);

module.exports = router;
