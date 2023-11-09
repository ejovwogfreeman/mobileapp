const socketIo = require("socket.io");

function initializeSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methdos: ["GET", "POST"],
    },
  });

  // io.on("connection", (socket) => {
  //   console.log("A user connected");

  //   socket.on("sendMessage", (message) => {
  //     io.emit("sendMessage", message);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected");
  //   });
  // });
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
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  console.log("Socket.IO server initialized");
}

module.exports = { initializeSocket };
