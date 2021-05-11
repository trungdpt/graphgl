const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'https://41a46db2c6eb.ap.ngrok.io',
      changeOrigin: true
    })
  );
};