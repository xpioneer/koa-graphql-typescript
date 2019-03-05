"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = require("crypto");
exports.cryptoPwd = function (pwd, key) {
    return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
};
//# sourceMappingURL=crypto.js.map