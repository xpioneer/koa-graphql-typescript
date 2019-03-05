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
// xpoineer
// import moment from 'moment';
// const setCreatedAt = (filter) => {
//   let arr = [];
//   if (toString.call(filter.val) === '[object Array]') {
//     arr = filter.val.map((v) => {
//       if (filter.col === 'created_at')
//         return moment(v).format('x');
//       return v;
//     });
//   }
//   if (typeof filter.val === 'string') {
//     arr = filter.val ? filter.val.split(',').map((v) => {
//       if (filter.col === 'created_at')
//         return moment(v).format('x');
//       return v;
//     }) : [];
//   }
//   return arr;
// };
var getParams = function (ctx) {
    var data = {};
    var query = ctx.query;
    if (query && Object.keys(query).length > 0) {
        data['limit'] = (query.pageSize ? query.pageSize : 10) * 1;
        var page = (query.page ? query.page : 1) - 1; //offset start 0(如果不存在则只返回一条)
        var offset = (query.page < 1 ? 0 : page) * data['limit'];
        data['offset'] = offset * 1;
        /*filter*/
        if (query['filter'] && query['filter'].length > 0) {
            data['where'] = {};
            for (var _i = 0, _a = query['filter']; _i < _a.length; _i++) {
                var filter = _a[_i];
                if (filter.col === '_orFilter_') {
                    data['where']['$or'] = filter.val;
                }
                else {
                    switch (filter.exp) {
                        case '=':
                            data['where'][filter.col] = filter.val;
                            break;
                        case '>':
                            data['where'][filter.col] = { $gt: filter.val };
                            break;
                        case '>=':
                            data['where'][filter.col] = { $gte: filter.val };
                            break;
                        case '<':
                            data['where'][filter.col] = { $lt: filter.val };
                            break;
                        case '<=':
                            data['where'][filter.col] = { $lte: filter.val };
                            break;
                        case 'in':
                            data['where'][filter.col] = { $in: filter.val.split(',') };
                            break;
                        case '!=':
                            data['where'][filter.col] = { $ne: filter.val };
                            break;
                        case 'or':
                            data['where'][filter.col] = { $or: filter.val };
                            break;
                        case 'like':
                            data['where'][filter.col] = { $like: "%" + filter.val + "%" };
                            break;
                        case 'between':
                            data['where'][filter.col] = { $between: filter.val };
                            break;
                        default: // exp: '='
                            data['where'][filter.col] = filter.val;
                            break;
                    }
                }
            }
        }
        /*order*/
        if (query['orderBy'] && query['orderBy'].length > 0) {
            data['order'] = [];
            var orders = query['orderBy'].map(function (o) {
                return [o.col, o.dir];
            });
            data['order'] = orders;
        }
    }
    return data;
};
var requestData = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // if (!ctx.getParams){
                ctx.getParams = getParams(ctx);
                // }
                return [4 /*yield*/, next()];
            case 1:
                // }
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = requestData;
// const requestData = async (ctx: any, next: any) => {
//   await next();
// }
// export default requestData;
//# sourceMappingURL=request.js.map