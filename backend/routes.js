const routes = [
    {path: "/api/user", module: "./apis/routes/userRoutes"}
]

module.exports = (app) => {
  routes.forEach(({ path, module }) => {
    app.use(path, require(module));
  });
};