const routes = [
    {path: "/api/user", module: "../apis/routes/userRoutes"},
    {path: "/api/chat", module: "../apis/routes/chatRoutes"},
]

module.exports = (app) => {
  routes.forEach(({ path, module }) => {
    app.use(path, require(module));
  });
};