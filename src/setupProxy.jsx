const { createProxyMiddleware } = require('http-proxy-middleware');
const brokerURIPaths = [ '/word', '/hwp', '/show', '/cell', '/common', '/resource'];
module.exports = (app) => {
  brokerURIPaths.map((uri) => {
    app.use(
      createProxyMiddleware(uri, {
        target: process.env.REACT_APP_BROKER_HOST,
        changeOrigin: true,
      })
    );
  });
};
