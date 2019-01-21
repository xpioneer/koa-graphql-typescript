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
const verify_1 = require("./verify");
// verify jwt, koa middleware
exports.default = (opts) => {
    const { debug, key = 'jwt-user', unless, passthrough, tokenKey } = opts;
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const method = ctx.method;
        if (unless.some(urlReg => urlReg[0].test(ctx.path) && urlReg[1].test(method))) {
            yield next();
        }
        else {
            let token = ctx.header['authorization'];
            if (!token) {
                ctx.throw(401, debug ? 'Token not found' : 'Authentication Error');
            }
            let { state: { secret = opts.secret } } = ctx;
            try {
                if (!secret) {
                    throw new Error('Secret not provided');
                }
                const result = verify_1.verify(token, opts);
                if (!result[0]) {
                    ctx.throw(401, debug ? result[1] : 'Authentication Error');
                }
                // pass
                ctx.state[key] = result[1];
                if (tokenKey) {
                    ctx.state[key] = token;
                }
            }
            catch (e) {
                const msg = debug ? e.message : 'Authentication Error';
                ctx.throw(401, msg, { originalError: e });
            }
            yield next(); // authorized, next()
        }
    });
};
//# sourceMappingURL=index.js.map