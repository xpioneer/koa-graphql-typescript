"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};
exports.Guid = function () {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};
exports.Guid8 = function () {
    return s4() + s4();
};
exports.Guid16 = function () {
    return s4() + s4() + s4() + s4();
};
//# sourceMappingURL=guid.js.map