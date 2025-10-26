const path = require("path")
const routes = [
    {staticRoute: "/auth", filePath: "../view/index.html"},
    {staticRoute: "/chat-window", filePath: "../view/src/pages/chatWindow/chatWindow.html"},
]

module.exports = (app) => {
  routes.forEach(({ staticRoute, filePath }) => {
    app.get(staticRoute, (req, res) => {
      res.sendFile(path.join(__dirname, filePath));
    });
  });
};