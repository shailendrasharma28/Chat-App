const express = require('express');
const app = express();
const db = require('./config/db-connection');
require("dotenv").config({ quiet: true })

// Port Defined...
const PORT = process.env.PORT;

// Require all middlewares
require("./middlewares/midlewares")(app);
require("./routes")(app)
// Middleware which logs the method of request and Url
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(`${method} request made to ${url}`);
  next();
})

db.sync({alter: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("Unable to connect with databse!", err);
})
