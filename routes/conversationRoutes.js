const express = require("express");
const {
  makeConversation,
  getConversation,
  getConversationBtwUsers,
} = require("../controllers/conversationControllers");

const router = express.Router();

router.post("/", makeConversation);
router.get("/:userId", getConversation);
router.get("/:senderId/:receiverId", getConversationBtwUsers);

module.exports = router;
