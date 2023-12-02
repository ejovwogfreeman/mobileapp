const socketIo = require("socket.io");

function initializeSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methdos: ["GET", "POST"],
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
      console.log(users);
    });

    socket.on(
      "sendMessage",
      ({ senderId, receiverId, text, conversationId }) => {
        // const user = getUser(receiverId);
        // io.to(user.socketId).emit("getMessage", {
        io.emit("getMessage", {
          senderId,
          receiverId,
          text,
          conversationId,
        });

        console.log({ senderId, receiverId, text, conversationId });
      }
    );

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
      console.log(users);
    });
  });

  console.log("Socket.IO server initialized");
}

module.exports = { initializeSocket };
