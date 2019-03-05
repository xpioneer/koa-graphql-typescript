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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var article_1 = require("../entities/mysql/article");
var tools_1 = require("../utils/tools");
var Moment = require("moment");
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.getAll = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(args);
                        return [4 /*yield*/, typeorm_1.getManager().find(article_1.Article)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ArticleController.getById = function (id) {
        if (id === void 0) { id = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(article_1.Article).findOne({ id: id })
                        // console.log('article: ', article)
                    ];
                    case 1:
                        article = _a.sent();
                        // console.log('article: ', article)
                        return [2 /*return*/, article];
                }
            });
        });
    };
    ArticleController.pages = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var options, date, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(args, 'query args ===================');
                        options = {
                            skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                            take: args.pageSize,
                            order: {},
                            where: {
                                deletedAt: null
                            }
                        };
                        if (args.title) {
                            options.where['title'] = typeorm_1.Like("%" + args.title + "%");
                        }
                        if (args.abstract) {
                            options.where['abstract'] = typeorm_1.Like("%" + args.abstract + "%");
                        }
                        if (args.tag) {
                            options.where['tag'] = typeorm_1.Like("%" + args.tag + "%");
                        }
                        if (args.createdAt) {
                            date = args.createdAt.map(function (c) { return (Moment(c)).valueOf(); });
                            options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
                        }
                        if (args.order) {
                            options.order = Object.assign(options.order, args.order);
                        }
                        console.log(options, '----options');
                        return [4 /*yield*/, typeorm_1.getRepository(article_1.Article).findAndCount(options)
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
                        ];
                    case 1:
                        pages = _a.sent();
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
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    ArticleController.insert = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var model, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new article_1.Article();
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
                        return [4 /*yield*/, typeorm_1.getRepository(article_1.Article).save(model)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ArticleController.update = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var article, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        article = new article_1.Article;
                        article.id = args.id;
                        article.title = args.title;
                        article.abstract = args.abstract;
                        article.description = args.description;
                        article.typeId = args.typeId;
                        article.isTop = args.isTop;
                        article.tag = args.tag;
                        article.updatedAt = Date.now();
                        article.updatedBy = ctx.state['CUR_USER'].id;
                        return [4 /*yield*/, typeorm_1.getRepository(article_1.Article).save(article)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ArticleController;
}());
exports.default = ArticleController;
//# sourceMappingURL=ArticleController.js.map