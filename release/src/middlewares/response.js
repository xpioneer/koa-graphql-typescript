"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseData_1 = require("../models/ResponseData");
var json = function (ctx) { return function (res) {
    var resData = new ResponseData_1.ResponseData();
    var type = typeof res;
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
        resData.msg = "data's type is " + typeof res;
        if (type === 'function') {
            resData.data = res();
        }
        else { // not function
            resData.data = res;
        }
    }
    resData.status = res.status || 200; // resData status code
    var status = resData.status; // http status code
    // if (status == 200 && ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
    //   status = 201;
    // }
    ctx.status = status;
    return ctx.body = resData;
}; };
var page = function (ctx) { return function (data) {
    var resData = new ResponseData_1.ResponseData();
    if (typeof data === 'object' && data !== null) {
        var total = data.page[1] || 0;
        var count = data.page[0].length || 0;
        resData.data = data.page[0];
        var pageSize = ctx.query.pageSize ? ctx.query.pageSize * 1 : 10;
        resData.meta = {
            total: total,
            count: count,
            page: ctx.query.page ? ctx.query.page * 1 : 1,
            pageSize: pageSize,
            totalPage: Math.ceil(total / pageSize)
        };
        resData.msg = data.msg || "\u67E5\u8BE2\u5230" + resData.meta.count + "\u8BB0\u5F55";
    }
    resData.status = data.status || 200;
    ctx.status = resData.status;
    return ctx.body = resData;
}; };
var returnData = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.Json) {
                    ctx.Json = json(ctx);
                }
                if (!ctx.Pages) {
                    ctx.Pages = page(ctx);
                }
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = returnData;
// const returnData = async (ctx: any, next: any) => {
//   await next();
// }
// export default returnData;
//# sourceMappingURL=response.js.map