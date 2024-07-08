// controllers/chatRoom.controller.js
const chatRoomService = require('./chatroom.service');

const createChatRoom = async (req, res) => {
  try {
    const room_participant_ids  = req.body;
  console.log('::::::::::::::::::', room_participant_ids)
    const newChatRoom = await chatRoomService.createChatRoom(room_participant_ids );
    res.status(201).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getChatRoomsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const chatRooms = await chatRoomService.getChatRoomsByUserId(userId);
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
const getChatRoomById = async (req, res) => {
  try {
    const { roomId  } = req.params;
    const chatRooms = await chatRoomService.getChatRoomById(roomId );
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


const updateLastMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messageData = req.body;
    const updatedRoom = await chatRoomService.updateLastMessage(roomId, messageData);
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  getChatRoomById,
  createChatRoom,
  getChatRoomsByUserId,
  updateLastMessage
};
