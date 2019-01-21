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
const articleType_1 = require("../entities/mysql/articleType");
const tools_1 = require("../utils/tools");
const Moment = require("moment");
class ArticleController {
    static getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getManager().find(articleType_1.ArticleType);
        });
    }
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            // getManager().findOne()
            const articleType = yield typeorm_1.getRepository(articleType_1.ArticleType).findOne({ id });
            return articleType;
        });
    }
    static pages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                take: args.pageSize,
                order: {},
                where: {
                    deletedAt: null
                }
            };
            if (args.name) {
                options.where['name'] = typeorm_1.Like(`%${args.name}%`);
            }
            if (args.createdAt) {
                const date = args.createdAt.map((c) => (Moment(c)).valueOf());
                options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            console.log(options, '----options');
            const pages = yield typeorm_1.getRepository('articleType').findAndCount(options);
            // .createQueryBuilder()
            // .orderBy({createdAt: 'DESC'})
            // .offset(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
            // .limit(args.pageSize)
            // .getManyAndCount()
            // console.log(pages[0].length, pages[1])
            return pages;
        });
    }
    static insert(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new articleType_1.ArticleType();
            model.id = tools_1.Guid();
            model.name = args.name;
            model.remark = args.remark;
            model.createdAt = Date.now();
            model.createdBy = ctx.state['CUR_USER'].id;
            model.updatedAt = Date.now();
            model.updatedBy = ctx.state['CUR_USER'].id;
            const result = yield typeorm_1.getRepository(articleType_1.ArticleType).save(model);
            return result;
        });
    }
    static update(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new articleType_1.ArticleType();
            // model.id = args.id
            model.name = args.name;
            model.remark = args.remark;
            model.updatedAt = Date.now();
            model.updatedBy = ctx.state['CUR_USER'].id;
            const result = yield typeorm_1.getRepository(articleType_1.ArticleType).update(args.id, model);
            console.log('result:', result);
            return result;
        });
    }
}
exports.default = ArticleController;
//# sourceMappingURL=ArticleTypeController.js.map