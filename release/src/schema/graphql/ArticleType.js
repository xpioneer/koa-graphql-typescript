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
const ArticleTypeController_1 = require("../../controllers/ArticleTypeController");
const common_1 = require("./common");
// articleType
exports.articleTypeObjectType = new graphql_1.GraphQLObjectType({
    name: 'articleType',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        remark: {
            type: graphql_1.GraphQLString
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
const ArticleTypePagesType = new graphql_1.GraphQLObjectType({
    name: 'articleTypePageType',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(exports.articleTypeObjectType)
        } })
});
const query = {
    articleType: {
        type: exports.articleTypeObjectType,
        args: {
            id: {
                name: 'id',
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const articleType = yield ArticleTypeController_1.default.getById(id);
            return articleType;
        })
    },
    articleTypes: {
        type: ArticleTypePagesType,
        args: Object.assign({}, common_1.pageArgsFields, { name: {
                type: graphql_1.GraphQLString
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield ArticleTypeController_1.default.pages(args);
            // console.log(args, '-------------->args')
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    articleType: {
        type: exports.articleTypeObjectType,
        description: 'create articleType',
        args: {
            name: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ArticleTypeController_1.default.insert(args, ctx);
            return result;
        })
    },
    editArticleType: {
        type: exports.articleTypeObjectType,
        description: 'edit articleType',
        args: {
            id: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            name: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield ArticleTypeController_1.default.update(args, ctx);
            return result;
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=ArticleType.js.map