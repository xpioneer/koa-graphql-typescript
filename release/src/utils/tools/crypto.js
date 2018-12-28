"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
exports.cryptoPwd = (pwd, key) => {
    return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
};
//# sourceMappingURL=crypto.js.map