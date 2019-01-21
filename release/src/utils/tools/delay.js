"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = (ms = 0) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
//# sourceMappingURL=delay.js.map