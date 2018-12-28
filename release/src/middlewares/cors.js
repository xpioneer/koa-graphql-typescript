"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("../core/cors");
const _PROD_ = process.env.NODE_ENV === 'production';
exports.default = cors_1.default({
    origin: function (ctx) {
        const origin = ctx.header.origin;
        if (_PROD_) {
            return false;
        }
        else {
            return origin;
        }
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization-User', 'X-Requested-With', 'Accept', 'token', 'x-url', 'x-store']
});
//# sourceMappingURL=cors.js.map