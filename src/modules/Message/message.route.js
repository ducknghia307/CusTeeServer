// routes/message.routes.js
const express = require('express');
const messageController = require('./message.controller');

const router = express.Router();

// Route for creating a new message
router.post('/', messageController.createMessage);

// Route for fetching messages by chatroomId
router.get('/:roomId', messageController.getMessagesByChatroomId);

module.exports = router;
