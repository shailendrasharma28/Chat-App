const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/new-message", chatController.sendMessage);

module.exports = router;