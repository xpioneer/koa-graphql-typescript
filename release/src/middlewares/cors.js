"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("../core/cors");
var _PROD_ = process.env.NODE_ENV === 'production';
exports.default = cors_1.default({
    origin: function (ctx) {
        var origin = ctx.header.origin;
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