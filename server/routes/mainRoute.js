const express = require("express");

const router = express.Router();

const mainController = require("../controllers/mainController");

const upload = require("../middleware/multerMiddleware");

router.post("/upload-resume", upload.single("file"), mainController.resume);

module.exports = router;
