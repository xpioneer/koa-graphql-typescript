"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const getFile = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let buf;
            let arr = [];
            ctx.req.on('data', (data) => {
                try {
                    arr.push(data);
                }
                catch (e) {
                    reject(e);
                }
            });
            ctx.req.on('end', () => {
                try {
                    buf = buffer_1.Buffer.concat(arr);
                    if (buf.length <= 0) {
                        resolve({});
                    }
                    else {
                        resolve(buf);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
class FileController {
    static upload(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield getFile(ctx);
            console.log(file, 'file');
            ctx.Json({
                data: {
                    path: '/a/b/c/d.jpg',
                    name: 'heheda'
                },
                msg: file.length
            });
        });
    }
}
exports.default = FileController;
//# sourceMappingURL=FileController.js.map