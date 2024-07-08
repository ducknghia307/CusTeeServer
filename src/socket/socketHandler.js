const Message = require("../modules/Message/message.model");
const ChatRoom = require("../modules/ChatRoom/chatroom.model");
module.exports = (io) => {
  let onlineUsers = [];

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("addNewUser", (userId) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId, socketId: socket.id });
      }
      console.log("Online Users:", onlineUsers);
    });

    socket.on("sendMessage", async ({ message }) => {
      console.log("Message received:", message);
      const recipientUser = onlineUsers.find(
        (user) => user.userId === message.incoming
      );

      try {
        const messageData = {
          chatroomId: message.chatroomId,
          text: message.text,
          senderId: message.senderId,
          type: message.type,
          incoming: message.incoming,
          outgoing: message.outgoing,
        };

        const savedMessage = await Message.create(messageData);

        // Update the chatroom's last message
        await ChatRoom.findByIdAndUpdate(
          message.chatroomId,
          {
            room_last_msg: {
              sender_id: message.senderId,
              content: message.text,
              timestamp: new Date(),
            },
          },
          { new: true }
        );

        if (recipientUser) {
          io.to(recipientUser.socketId).emit("incomingMessage", savedMessage);
        }
      } catch (error) {
        console.error("Error saving message or updating chat room:", error);
        socket.emit("error", {
          error: "Failed to save message or update chat room",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
  });
};
