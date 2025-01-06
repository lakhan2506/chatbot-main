const express = require("express");
const router = express.Router();
const { processMessage, getChatHistory } = require("../controllers/chatController");

router.post("/message", processMessage);

router.get("/history/:userId", getChatHistory);

module.exports = router;
