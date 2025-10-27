module.exports = (socket, io) => {

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
    });

    socket.on("personal-message", (msgData, roomName) => {
      console.log("New message received:", msgData);
      io.emit("messageReceived", msgData);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.user.name);
    });
}