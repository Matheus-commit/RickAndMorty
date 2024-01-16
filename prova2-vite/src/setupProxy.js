const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/laboratorios', // O caminho da sua API local
        createProxyMiddleware({
            target: 'http://localhost:8080', // A URL base da sua API local
            changeOrigin: true,
        })
    );
};