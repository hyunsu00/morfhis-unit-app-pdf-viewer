const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  const paths = ['/word', '/hwp', '/show', '/cell', '/common', '/resource'];
  for (let path of paths) {
    app.use(
      createProxyMiddleware(path, {
        target: process.env.REACT_APP_BROKER_HOST,
        changeOrigin: true,
      })
    );
  }
};
