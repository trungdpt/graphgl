const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://1ddab18b2953.ap.ngrok.io',
      changeOrigin: true
    })
  );
};