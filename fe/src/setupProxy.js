const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/uploadVideo",
    createProxyMiddleware({
      target: "http://localhost:6000",
      changeOrigin: true,
    })
  );
};
