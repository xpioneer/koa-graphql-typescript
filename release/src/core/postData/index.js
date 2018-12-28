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
// only post fields(not upload file stream)
const getPostData = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.on('data', data => {
                // console.log(data, 'data')
                postData += data;
            });
            ctx.req.on('end', () => {
                if (postData === '') {
                    resolve({});
                }
                else {
                    resolve(JSON.parse(postData));
                }
            });
        }
        catch (e) {
            reject({ err: e.toString() });
        }
    });
};
const KoaBody = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (/^(POST|PUT)$/.test(ctx.method) && !/\/api\/upload/.test(ctx.path)) {
        ctx.fields = yield getPostData(ctx);
    }
    // console.log('ctx.fields,', ctx.fields)
    yield next();
});
exports.default = KoaBody;
//# sourceMappingURL=index.js.map