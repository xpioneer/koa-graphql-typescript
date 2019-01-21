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
const CommentController_1 = require("../../controllers/CommentController");
const common_1 = require("./common");
// comment
exports.commentObjectType = new graphql_1.GraphQLObjectType({
    name: 'comment',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        description: {
            type: graphql_1.GraphQLString
        },
        articleId: {
            type: graphql_1.GraphQLString
        },
        parentId: {
            type: graphql_1.GraphQLString
        },
        ip: {
            type: graphql_1.GraphQLString
        },
        client: {
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
// comment pages type
const CommentPagesType = new graphql_1.GraphQLObjectType({
    name: 'commentPageType',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(exports.commentObjectType)
        } })
});
const query = {
    comment: {
        type: exports.commentObjectType,
        args: {
            id: {
                name: 'id',
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const article = yield CommentController_1.default.getById(id);
            return article;
        })
    },
    comments: {
        type: CommentPagesType,
        args: Object.assign({}, common_1.pageArgsFields, { description: {
                name: 'description',
                type: graphql_1.GraphQLString
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield CommentController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    comment: {
        type: exports.commentObjectType,
        args: {
            name: {
                type: graphql_1.GraphQLString
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            return {};
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=Comment.js.map