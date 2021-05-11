const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://a27871b27fc3.ap.ngrok.io',
      changeOrigin: true
    })
  );
};