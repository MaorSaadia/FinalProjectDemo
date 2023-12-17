const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    messageText: {
      type: String,
    },
    replyingTo: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
