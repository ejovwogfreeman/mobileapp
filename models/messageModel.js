const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);

// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema(
//   {
//     conversationId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Conversation",
//     },
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     text: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Message", MessageSchema);