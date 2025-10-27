module.exports = (socket, io) => {

    socket.on("join-room", (roomName) => {
        socket.join(roomName);
        console.log("user Joined the room:",roomName);
        
    });

    socket.on("personal-message", ({msgData, roomName}) => {
      console.log("New message received:", msgData);
      io.to(roomName).emit("personal", msgData);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.user.name);
    });
}