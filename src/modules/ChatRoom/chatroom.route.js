// chatroom.routes.js

const express = require('express');
const chatRoomController = require('./chatroom.controller');

const router = express.Router();

router.post('/', chatRoomController.createChatRoom);
router.get('/:roomId', chatRoomController.getChatRoomById);
router.get('/user/:userId', chatRoomController.getChatRoomsByUserId); // Changed route path to avoid conflict
router.put('/:roomId/lastmessage', chatRoomController.updateLastMessage);

module.exports = router;
