const path = require("path")
const routes = [
    {staticRoute: "/auth", filePath: "../../frontend/index.html"},
    {staticRoute: "/chat-window", filePath: "../../frontend/src/pages/chatWindow/chatWindow.html"},
]

module.exports = (app) => {
  routes.forEach(({ staticRoute, filePath }) => {
    app.get(staticRoute, (req, res) => {
      res.sendFile(path.join(__dirname, filePath));
    });
  });
};