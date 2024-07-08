// services/message.service.js
const MessageModel = require("./message.model");

const createMessage = async (messageData) => {
  console.log("Creating message with data:", messageData);
  const message = await MessageModel.create(messageData);
  return message;
};

const getMessagesByChatroomId = async (roomId) => {
  try {
    console.log(`Fetching messages for roomId: ${roomId}`);
    const messages = await MessageModel.find({ chatroomId: roomId }).sort({ createdAt: 1 }).exec();
    console.log(`Fetched messages: ${messages}`);
    return messages;
  } catch (error) {
    console.error(`Error fetching messages for roomId ${roomId}:`, error);
    throw error;
  }
};

module.exports = {
  createMessage,
  getMessagesByChatroomId,
};
