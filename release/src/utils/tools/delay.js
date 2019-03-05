"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};
//# sourceMappingURL=delay.js.map