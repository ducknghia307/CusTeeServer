// controllers/message.controller.js
const messageService = require("./message.service");

const createMessage = async (req, res) => {
  try {
    const messageData = req.body;
    console.log('messageData', messageData);
    const newMessage = await messageService.createMessage(messageData);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


const getMessagesByChatroomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await messageService.getMessagesByChatroomId(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createMessage,
  getMessagesByChatroomId,
};
