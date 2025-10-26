module.exports = (socket, io) => {
    socket.on("newMessage", (msgData) => {
      console.log("New message received:", msgData);
      io.emit("messageReceived", msgData);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.user.name);
    });
}