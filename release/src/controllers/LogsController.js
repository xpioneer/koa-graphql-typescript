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
const typeorm_1 = require("typeorm");
const Moment = require("moment");
const api_1 = require("../entities/mongo/api");
const errors_1 = require("../entities/mongo/errors");
const tools_1 = require("../utils/tools");
class LogsController {
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield typeorm_1.getMongoRepository(api_1.API, 'mongo').findOne({ id });
            // console.log('api: ', api)
            return api;
        });
    }
    static apiPages(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('log-----', ctx.state)
            const params = ctx.getParams;
            const query = ctx.query;
            const options = {
                skip: params.offset,
                take: params.limit,
                order: {
                    createdAt: 'DESC'
                },
                where: {}
            };
            if (query.path) {
                // const dateRange = query.createdAt.split(',').map((d: string) => Moment(d).format('YYYY/MM/DD HH:mm:ss.SSS'))
                options.where['path'] = query.path;
            }
            if (query.url) {
                options.where['url'] = query.url;
            }
            const pages = yield typeorm_1.getMongoRepository('API', 'mongo').findAndCount(options);
            ctx.Pages({ page: pages });
        });
    }
    static errorsPages(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = ctx.getParams;
            const query = ctx.query;
            const options = {
                skip: params.offset,
                take: params.limit,
                order: {
                    createdAt: 'DESC'
                },
                where: {}
            };
            if (query.path) {
                options.where['path'] = query.path;
            }
            if (query.url) {
                options.where['url'] = query.url;
            }
            const pages = yield typeorm_1.getMongoRepository('Errors', 'mongo').findAndCount(options);
            ctx.Pages({ page: pages });
        });
    }
    // api log insert
    static APIlogger(ctx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
                const guid = tools_1.Guid();
                const model = new api_1.API();
                const method = ctx.method;
                model.id = guid;
                model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
                    model.path = ctx.path;
                model.url = ctx.url;
                model.status = ctx.status;
                model.origin = ctx.origin;
                model.hostname = ctx.header['x-host'];
                model.headers = ctx.header;
                model.resHeaders = ctx.response.header;
                model.resData = ctx.body;
                model.protocol = ctx.protocol;
                model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS');
                model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip;
                model.method = method;
                if (method === 'GET') {
                    model.params = ctx.querystring;
                }
                else if (/^P(U|OS)T$/.test(method)) {
                    if (/^\/api\/login$/.test(ctx.path)) {
                        let params = ctx.fields;
                        params['password'] = '******';
                    }
                    model.params = ctx.fields;
                }
                model.time = options.time; // deal time
                const result = yield typeorm_1.getMongoManager('mongo').save(model);
            }
        });
    }
    // errors log insert
    static ERRlogger(ctx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const guid = tools_1.Guid();
            const model = new errors_1.Errors();
            const method = ctx.method;
            model.id = guid;
            model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
                model.path = ctx.path;
            model.url = ctx.url;
            model.origin = ctx.origin;
            model.hostname = ctx.header['x-host'];
            model.headers = ctx.header;
            model.resHeaders = ctx.response.header;
            model.resData = ctx.body;
            model.protocol = ctx.protocol;
            model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS');
            model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip;
            model.status = options.status;
            model.errors = options.errors;
            model.msg = options.msg;
            model.method = method;
            if (method === 'GET') {
                model.params = ctx.querystring;
            }
            else if (/^P(U|OS)T$/.test(method)) {
                if (/^\/api\/login$/.test(ctx.path)) {
                    let params = ctx.fields;
                    params['password'] = '******';
                }
                model.params = ctx.fields;
            }
            model.time = options.time; // deal time
            const result = yield typeorm_1.getMongoRepository(errors_1.Errors, 'mongo').save(model);
        });
    }
}
exports.default = LogsController;
//# sourceMappingURL=LogsController.js.map