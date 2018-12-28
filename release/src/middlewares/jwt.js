"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("koa-jwt");
const constants_1 = require("../constants");
exports.default = JWT({
    secret: constants_1.JWT_SECRET,
    key: constants_1.JWT_KEY
}).unless({ path: [/\/api\/login/] });
//# sourceMappingURL=jwt.js.map