"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
exports.Guid = () => {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};
exports.Guid8 = () => {
    return s4() + s4();
};
exports.Guid16 = () => {
    return s4() + s4() + s4() + s4();
};
//# sourceMappingURL=guid.js.map