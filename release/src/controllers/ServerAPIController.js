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
const http_1 = require("../utils/http");
class ServerAPIController {
    static KDJZ(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const HOST = '';
            const token = ctx.header['token'];
            const UA = ctx.header['user-agent'];
            let path = ctx.path;
            const input = ctx.fields;
            if (/^\/platform/.test(path)) {
                const result = yield http_1.default.post(HOST + path, input, {
                    headers: {
                        'token': token,
                        'User-Agent': UA
                    }
                });
                // console.log(result)
                ctx.body = result;
            }
            else {
                ctx.body = { data: {}, msg: 'empty' };
            }
        });
    }
    static compose(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const HOST = 'https://www.google.com';
            console.log('--react--');
            const token = ctx.header['token'];
            const UA = ctx.header['user-agent'];
            let path = ctx.path;
            const input = ctx.fields;
            if (/^\/platform/.test(path)) {
                const result = yield http_1.default.post(HOST + path, input, {
                    headers: {
                        'token': token,
                        'User-Agent': UA
                    }
                });
                ctx.body = result.data;
            }
            else {
                ctx.body = { data: {}, msg: 'empty' };
            }
        });
    }
}
exports.default = ServerAPIController;
//# sourceMappingURL=ServerAPIController.js.map