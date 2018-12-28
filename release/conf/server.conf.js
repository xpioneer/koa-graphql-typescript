"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _PROD_ = process.env.NODE_ENV === 'production';
let PORT = 8020;
exports.PORT = PORT;
if (_PROD_) {
    exports.PORT = PORT = 8021;
}
//# sourceMappingURL=server.conf.js.map