// models/chatRoom.model.js
const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    room_participant_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    room_last_msg: {
      sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
