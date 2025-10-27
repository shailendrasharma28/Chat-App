const { Server } = require("socket.io");
const socketAuth = require("./middleware");
const chatHandler = require("./handlers/chat");
const personalChatHandler = require("./handlers/personalChat");

module.exports = (server) => {
  const io = new Server(server);

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("user connected:", socket.user.name);
    chatHandler(socket, io);
    personalChatHandler(socket, io);
  });
};
