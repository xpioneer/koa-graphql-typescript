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
const ResponseData_1 = require("../models/ResponseData");
const json = (ctx) => (res) => {
    let resData = new ResponseData_1.ResponseData();
    const type = typeof res;
    if (type === 'undefined') {
        resData = { data: undefined, msg: 'return data is undefined', status: 200 };
    }
    else if (type === 'object' && res !== null) {
        if (res.hasOwnProperty('data')) { // data is the key property
            Object.assign(resData, res);
        }
        else {
            resData.data = res;
        }
        resData.msg = res.msg || "";
        resData.errors = res.errors;
    }
    else {
        resData.msg = `data's type is ${typeof res}`;
        if (type === 'function') {
            resData.data = res();
        }
        else { // not function
            resData.data = res;
        }
    }
    resData.status = res.status || 200; // resData status code
    let status = resData.status; // http status code
    // if (status == 200 && ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
    //   status = 201;
    // }
    ctx.status = status;
    return ctx.body = resData;
};
const page = (ctx) => (data) => {
    let resData = new ResponseData_1.ResponseData();
    if (typeof data === 'object' && data !== null) {
        const total = data.page[1] || 0;
        const count = data.page[0].length || 0;
        resData.data = data.page[0];
        let pageSize = ctx.query.pageSize ? ctx.query.pageSize * 1 : 10;
        resData.meta = {
            total: total,
            count: count,
            page: ctx.query.page ? ctx.query.page * 1 : 1,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize)
        };
        resData.msg = data.msg || `查询到${resData.meta.count}记录`;
    }
    resData.status = data.status || 200;
    ctx.status = resData.status;
    return ctx.body = resData;
};
const returnData = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (!ctx.Json) {
        ctx.Json = json(ctx);
    }
    if (!ctx.Pages) {
        ctx.Pages = page(ctx);
    }
    yield next();
});
exports.default = returnData;
// const returnData = async (ctx: any, next: any) => {
//   await next();
// }
// export default returnData;
//# sourceMappingURL=response.js.map