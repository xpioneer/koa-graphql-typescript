"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../core/jwt/index");
const constants_1 = require("../constants");
const _PROD_ = process.env.NODE_ENV === 'production';
exports.default = index_1.default({
    debug: _PROD_ ? false : true,
    secret: constants_1.JWT_SECRET,
    key: constants_1.JWT_KEY,
    unless: constants_1.NO_AUTH_URLS
});
//# sourceMappingURL=xJwt.js.map