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
const graphql_1 = require("graphql");
const Moment = require("moment");
const ArticleController_1 = require("../../controllers/ArticleController");
const ArticleTypeController_1 = require("../../controllers/ArticleTypeController");
const common_1 = require("./common");
const ArticleType_1 = require("./ArticleType");
const ArticleInputType = new graphql_1.GraphQLInputObjectType({
    name: 'articleInput',
    description: 'input article playload',
    fields: () => ({
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
    })
});
// article
const ArticleObjectType = new graphql_1.GraphQLObjectType({
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
            resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
                const articleType = yield ArticleTypeController_1.default.getById(obj.typeId);
                return articleType;
            })
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve(obj, args, ctx, info) {
                const createdAt = Number(obj.createdAt) || Date.now();
                return Moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        createdBy: {
            type: graphql_1.GraphQLString
        }
    }
});
// article pages type
const ArticlePagesType = new graphql_1.GraphQLObjectType({
    name: 'articlePageType',
    description: 'article pages query',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(ArticleObjectType),
        } })
});
const query = {
    article: {
        type: ArticleObjectType,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const article = yield ArticleController_1.default.getById(id);
            return article;
        })
    },
    articles: {
        type: ArticlePagesType,
        args: Object.assign({}, common_1.pageArgsFields, { title: {
                type: graphql_1.GraphQLString
            }, abstract: {
                type: graphql_1.GraphQLString
            }, tag: {
                type: graphql_1.GraphQLString
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield ArticleController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    article: {
        type: ArticleObjectType,
        description: 'create/update article',
        args: {
            input: {
                type: new graphql_1.GraphQLNonNull(ArticleInputType)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ArticleController_1.default.insert(args.input, ctx);
            return { id: result.id };
        })
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
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ArticleController_1.default.update(args, ctx);
            return result;
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=Article.js.map