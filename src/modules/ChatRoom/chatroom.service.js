// services/chatRoom.service.js
const ChatRoom = require("./chatroom.model");
const mongoose = require("mongoose");

const createChatRoom = async (room_participant_ids) => {
  console.log("room_participant_ids:", room_participant_ids);

  try {
    // Convert string IDs to ObjectId
    const participantObjectIds = room_participant_ids.room_participant_ids.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Check if a chat room with both participants already exists
    const existingChatRoom = await ChatRoom.findOne({
      room_participant_ids: { $all: participantObjectIds },
    });

    if (existingChatRoom) {
      return existingChatRoom;
    }

    // If not, create a new chat room
    const newChatRoom = new ChatRoom({
      room_participant_ids: participantObjectIds,
    });

    return await newChatRoom.save();
  } catch (error) {
    console.error("Error during chat room creation:", error);
    throw new Error("Failed to create or find chat room");
  }
};

const getChatRoomsByUserId = async (userId) => {
  try {
    const chatRooms = await ChatRoom.find({
      room_participant_ids: { $in: [userId] },
    })
      .populate("room_participant_ids", "username avatar") // Populate user details
      .exec();
    console.log(chatRooms);
    return chatRooms;
  } catch (error) {
    console.error("Error fetching chat rooms by user ID:", error);
    throw error; // Optional: throw the error to handle it elsewhere
  }
};

const updateLastMessage = async (roomId, messageData) => {
  return await ChatRoom.findByIdAndUpdate(
    roomId,
    { room_last_msg: messageData, timestamp: Date.now() },
    { new: true }
  ).exec();
};
const getChatRoomById = async (roomId) => {
  try {
    return await ChatRoom.findById(roomId).exec();
  } catch (error) {
    console.error("Error fetching chat room by ID:", error);
    throw new Error("Failed to fetch chat room by ID");
  }
};

module.exports = {
  createChatRoom,
  getChatRoomsByUserId,
  updateLastMessage,
  getChatRoomById,
};
