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
const LogsController_1 = require("../controllers/LogsController");
exports.default = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // console.log('ctx-----------', ctx.header)
    const start = Date.now();
    try {
        yield next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
        if (ctx.path === '/graphql' && ctx.body.errors) {
            LogsController_1.default.ERRlogger(ctx, {
                status: status,
                time: Date.now() - start,
                errors: ctx.body.errors,
                msg: ctx.body.errors[0].message
            }); // error log
        }
        else {
            LogsController_1.default.APIlogger(ctx, { time: Date.now() - start }); // api log
        }
    }
    catch (err) {
        let stack = err.stack;
        console.log('catch', err, err.status, err.message);
        try {
            let status = err.status || 500;
            LogsController_1.default.ERRlogger(ctx, {
                status: status,
                time: Date.now() - start,
                errors: stack.split('\n'),
                msg: err.toString()
            }); // error log
            ctx.status = status;
            if (status === 404) {
                ctx.body = { status: 404, data: null, msg: 'Not Found' };
            }
            else {
                let msg = err.message || err.toString();
                let errors = stack ? stack.split('\n') : err.toString();
                ctx.body = { status, data: null, msg, errors };
            }
        }
        catch (e) {
            let msg = e.message || e.toString();
            let errors = e.stack ? e.stack.split('\n') : e.toString();
            ctx.status = 500;
            ctx.body = { status: 500, data: null, msg, errors };
        }
    }
});
//# sourceMappingURL=catch.js.map