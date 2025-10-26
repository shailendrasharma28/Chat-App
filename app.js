const express = require('express');
const app = express();
const db = require('./config/db-connection');
const path = require("path");
const { createServer } = require('http');
require("dotenv").config({ quiet: true })

// Port Defined...
const PORT = process.env.PORT;
const server = createServer(app)
app.use(express.static(path.join(__dirname, "./view")));
app.use(express.static(path.join(__dirname, "./view/src/pages")));

// Require all middlewares
require("./middlewares/midlewares")(app);
require("./socket_io/index")(server);
require("./routes/routes")(app);
require("./routes/frontendRoutes")(app);
// Middleware which logs the method of request and Url
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(`${method} request made to ${url}`);
  next();
})

db.sync({alter: true}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("Unable to connect with databse!", err);
})
