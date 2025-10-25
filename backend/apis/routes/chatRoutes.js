const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/message/new", chatController.sendMessage);
router.get("/message/all", chatController.getAllMessages);

module.exports = router;