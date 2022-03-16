"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
function serverProxy(options) {
    return {
        name: "serverProxy",
        configureServer(server) {
            Object.keys(options).forEach((item) => {
                let optionSingleValue = options[item];
                server.middlewares.use(item, http_proxy_middleware_1.createProxyMiddleware(optionSingleValue.filter || ((pathname, req) => true), {
                    target: optionSingleValue.target,
                    changeOrigin: optionSingleValue.changeOrigin || true,
                    pathRewrite: optionSingleValue.rewrite || null,
                }));
            });
        },
    };
}
exports.default = serverProxy;
//# sourceMappingURL=index.js.map