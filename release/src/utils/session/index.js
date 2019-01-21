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
// import * as Koa from '@core/koa'
// import * as Cookies from "cookies";
const store_1 = require("./store");
class SessionOptions {
    constructor() {
        this.key = 'SESSION_ID';
        this.store = new store_1.default();
    }
}
const Session = (opts = new SessionOptions) => {
    const { key, store } = opts;
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let id = ctx.cookies.get(key, opts);
        if (id) {
            ctx.session = yield opts.store.get(id);
            if (typeof ctx.session !== "object" || ctx.session == null) {
                ctx.session = {};
                id = undefined; // clear old id
            }
        }
        else {
            ctx.session = {};
        }
        const old = JSON.stringify(ctx.session);
        yield next(); // any calc
        // if is an empty object
        if (ctx.session instanceof Object && !Object.keys(ctx.session).length) {
            ctx.session = {};
            // need clear old session
            if (id) {
                yield store.destroy(id);
                return;
            }
        }
        // need clear old session
        // if (id && !ctx.session) {
        //   await store.destroy(id);
        //   return;
        // }
        // set/update session
        const sid = yield store.set(ctx.session, Object.assign({}, opts, { sid: id }));
        // need to optimize
        ctx.cookies.set(key, sid, opts);
    });
};
exports.default = Session;
//# sourceMappingURL=index.js.map