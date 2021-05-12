const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://1fa1923f2a94.ap.ngrok.io',
      changeOrigin: true
    })
  );
};