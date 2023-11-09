const express = require("express");
const {
  getUser,
  updateUser,
  changePassword,
  forgotPasword,
  resetPassword,
  bookRide,
  cancelRide,
} = require("../controllers/userControllers");
const {
  makeConversation,
  getConversation,
  getConversationBtwUsers,
} = require("../controllers/conversationControllers");
const {
  sendMessage,
  getMessage,
} = require("../controllers/messageControllers");
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/fileMiddleware");

const router = express.Router();

router.get("/user", protect, getUser);
router.post("/user/change_password", protect, changePassword);
router.post("/user/forgot_password", forgotPasword);
router.post("/user/reset_password", resetPassword);
router.put("/user/update", protect, upload.array("files"), updateUser);
router.post("/user/book_ride", protect, bookRide);
router.post("/user/cancel_ride", protect, cancelRide);
router.post("/user/conversation", protect, makeConversation);
router.post("/user/conversation/userId", protect, getConversation);
router.post(
  "/user/conversation/firstUserId/:secondUserId",
  protect,
  getConversationBtwUsers
);
router.post("/user/message", protect, sendMessage);
router.post("/user/message/:conversationId", protect, getMessage);

module.exports = router;
