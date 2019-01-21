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
const store_1 = require("../utils/session/store");
const constants_1 = require("../constants");
const store = new store_1.default;
exports.default = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const method = ctx.method;
    const path = ctx.path;
    if (constants_1.NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))) {
        yield next();
    }
    else {
        const token = ctx.header['authorization'].split(' ')[1] || ''; // after jwt, token must exist
        const authorized = yield store.get(token);
        if (authorized) { // redis exist jwt token
            const fields = ctx.fields;
            const USER_TYPE = ctx.state[constants_1.JWT_KEY].userType;
            if (method === 'GET' || // all get, pass
                USER_TYPE !== 9 || // not demo user, pass
                (USER_TYPE === 9 && constants_1.NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))) || // demo user, but not auth urls, pass
                (path === '/graphql' && !/^\smutation\s/.test(fields.query)) || // grahpql not mutation, pass
                (USER_TYPE === 9 && path === '/api/logout') // demo use logout, pass
            ) {
                yield next();
            }
            else {
                ctx.throw(403, '测试用户禁止访问！');
            }
        }
        else {
            ctx.throw(401);
        }
    }
});
//# sourceMappingURL=auth.js.map