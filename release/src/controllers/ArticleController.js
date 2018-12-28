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
const article_1 = require("../entities/mysql/article");
const tools_1 = require("../utils/tools");
const Moment = require("moment");
class ArticleController {
    static getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            return yield typeorm_1.getManager().find(article_1.Article);
        });
    }
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield typeorm_1.getRepository(article_1.Article).findOne({ id });
            // console.log('article: ', article)
            return article;
        });
    }
    static pages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args, 'query args ===================');
            const options = {
                skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                take: args.pageSize,
                order: {},
                where: {
                    deletedAt: null
                }
            };
            if (args.title) {
                options.where['title'] = typeorm_1.Like(`%${args.title}%`);
            }
            if (args.abstract) {
                options.where['abstract'] = typeorm_1.Like(`%${args.abstract}%`);
            }
            if (args.tag) {
                options.where['tag'] = typeorm_1.Like(`%${args.tag}%`);
            }
            if (args.createdAt) {
                const date = args.createdAt.map((c) => (Moment(c)).valueOf());
                options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            console.log(options, '----options');
            const pages = yield typeorm_1.getRepository(article_1.Article).findAndCount(options);
            // .createQueryBuilder()
            // .where({
            //   // title: Like(args.title)
            // })
            // .orderBy({createdAt: 'DESC'})
            // .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
            // .take(args.pageSize)
            // .cache(10000)
            // .getManyAndCount()
            // console.log(pages[0].length, pages[1])
            return pages;
        });
    }
    static insert(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new article_1.Article();
            model.id = tools_1.Guid();
            model.title = args.title;
            model.abstract = args.abstract;
            model.description = args.description;
            model.typeId = args.typeId;
            model.isTop = args.isTop;
            model.tag = args.tag;
            model.createdBy = ctx.state['CUR_USER'].id;
            model.createdAt = Date.now();
            model.updatedBy = ctx.state['CUR_USER'].id;
            model.updatedAt = Date.now();
            const result = yield typeorm_1.getRepository(article_1.Article).save(model);
            return result;
        });
    }
    static update(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = new article_1.Article;
            article.id = args.id;
            article.title = args.title;
            article.abstract = args.abstract;
            article.description = args.description;
            article.typeId = args.typeId;
            article.isTop = args.isTop;
            article.tag = args.tag;
            article.updatedAt = Date.now();
            article.updatedBy = ctx.state['CUR_USER'].id;
            const result = yield typeorm_1.getRepository(article_1.Article).save(article);
            return result;
        });
    }
}
exports.default = ArticleController;
//# sourceMappingURL=ArticleController.js.map