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
const getParams = (ctx) => {
    const data = {};
    let query = ctx.query;
    if (query && Object.keys(query).length > 0) {
        data['limit'] = (query.pageSize ? query.pageSize : 10) * 1;
        let page = (query.page ? query.page : 1) - 1; //offset start 0(如果不存在则只返回一条)
        let offset = (query.page < 1 ? 0 : page) * data['limit'];
        data['offset'] = offset * 1;
        /*filter*/
        if (query['filter'] && query['filter'].length > 0) {
            data['where'] = {};
            for (let filter of query['filter']) {
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
                            data['where'][filter.col] = { $like: `%${filter.val}%` };
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
            let orders = query['orderBy'].map((o) => {
                return [o.col, o.dir];
            });
            data['order'] = orders;
        }
    }
    return data;
};
let requestData = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    // if (!ctx.getParams){
    ctx.getParams = getParams(ctx);
    // }
    yield next();
});
exports.default = requestData;
// const requestData = async (ctx: any, next: any) => {
//   await next();
// }
// export default requestData;
//# sourceMappingURL=request.js.map