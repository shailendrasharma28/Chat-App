const express = require('express');
const app = express();
const db = require('./config/db-connection');
const path = require("path");
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketAuth = require('./middlewares/socketMiddleware');
require("dotenv").config({ quiet: true })

// Port Defined...
const PORT = process.env.PORT;
const server = createServer(app)
const io = new Server(server);
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.static(path.join(__dirname, "../frontend/src/pages")));

// Require all middlewares
require("./middlewares/midlewares")(app);
require("./routes/routes")(app);
require("./routes/frontendRoutes")(app);
// Middleware which logs the method of request and Url
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(`${method} request made to ${url}`);
  next();
})

io.use(socketAuth)

io.on('connection', (socket) => {
  console.log("user connected:", socket.user.name);

  socket.on("newMessage", (msgData) => {
    console.log("New message received:", msgData);
    io.emit("messageReceived", msgData);
  });

  socket.on('disconnect', () => {
    console.log("user disconnected", socket.user.name);
  })
})

db.sync({alter: true}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("Unable to connect with databse!", err);
})
