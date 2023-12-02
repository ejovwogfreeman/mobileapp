const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post("/", sendMessage);
router.get("/:conversationId", getMessage);

module.exports = router;
