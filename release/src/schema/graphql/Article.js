"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var graphql_1 = require("graphql");
var Moment = require("moment");
var ArticleController_1 = require("../../controllers/ArticleController");
var ArticleTypeController_1 = require("../../controllers/ArticleTypeController");
var common_1 = require("./common");
var ArticleType_1 = require("./ArticleType");
var ArticleInputType = new graphql_1.GraphQLInputObjectType({
    name: 'articleInput',
    description: 'input article playload',
    fields: function () { return ({
        title: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        description: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        abstract: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        isTop: {
            type: graphql_1.GraphQLInt,
            defaultValue: 0
        },
        tag: {
            type: graphql_1.GraphQLString
        },
        typeId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        }
    }); }
});
// article
var ArticleObjectType = new graphql_1.GraphQLObjectType({
    name: 'article',
    description: 'an article single model',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        title: {
            type: graphql_1.GraphQLString
        },
        description: {
            type: graphql_1.GraphQLString
        },
        abstract: {
            type: graphql_1.GraphQLString
        },
        isTop: {
            type: graphql_1.GraphQLInt
        },
        tag: {
            type: graphql_1.GraphQLString
        },
        typeId: {
            type: graphql_1.GraphQLString
        },
        articleType: {
            type: ArticleType_1.articleTypeObjectType,
            resolve: function (obj, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
                var articleType;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ArticleTypeController_1.default.getById(obj.typeId)];
                        case 1:
                            articleType = _a.sent();
                            return [2 /*return*/, articleType];
                    }
                });
            }); }
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: function (obj, args, ctx, info) {
                var createdAt = Number(obj.createdAt) || Date.now();
                return Moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        createdBy: {
            type: graphql_1.GraphQLString
        }
    }
});
// article pages type
var ArticlePagesType = new graphql_1.GraphQLObjectType({
    name: 'articlePageType',
    description: 'article pages query',
    fields: __assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(ArticleObjectType),
        } })
});
var query = {
    article: {
        type: ArticleObjectType,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: function (obj, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
            var id, article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id;
                        return [4 /*yield*/, ArticleController_1.default.getById(id)];
                    case 1:
                        article = _a.sent();
                        return [2 /*return*/, article];
                }
            });
        }); }
    },
    articles: {
        type: ArticlePagesType,
        args: __assign({}, common_1.pageArgsFields, { title: {
                type: graphql_1.GraphQLString
            }, abstract: {
                type: graphql_1.GraphQLString
            }, tag: {
                type: graphql_1.GraphQLString
            } }),
        resolve: function (obj, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ArticleController_1.default.pages(args)];
                    case 1:
                        pages = _a.sent();
                        return [2 /*return*/, Object.assign(__assign({ list: pages[0], total: pages[1] }, args))];
                }
            });
        }); }
    }
};
var mutation = {
    article: {
        type: ArticleObjectType,
        description: 'create/update article',
        args: {
            input: {
                type: new graphql_1.GraphQLNonNull(ArticleInputType)
            }
        },
        resolve: function (obj, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ArticleController_1.default.insert(args.input, ctx)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { id: result.id }];
                }
            });
        }); }
    },
    editArticle: {
        type: ArticleObjectType,
        description: 'create/update article',
        args: {
            id: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            title: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            abstract: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            typeId: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            isTop: {
                type: graphql_1.GraphQLInt
            },
            description: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            tag: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: function (obj, args, ctx, info) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ArticleController_1.default.update(args, ctx)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); }
    }
};
exports.default = {
    query: query,
    mutation: mutation
};
//# sourceMappingURL=Article.js.map