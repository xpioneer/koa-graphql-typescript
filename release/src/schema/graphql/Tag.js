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
const TagController_1 = require("../../controllers/TagController");
const common_1 = require("./common");
// tag
const tagObjectType = new graphql_1.GraphQLObjectType({
    name: 'tag',
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
// tag pages type
const TagPagesType = new graphql_1.GraphQLObjectType({
    name: 'tagPageType',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(tagObjectType)
        } })
});
const query = {
    tag: {
        type: tagObjectType,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const tag = yield TagController_1.default.getById(id);
            return tag;
        })
    },
    tags: {
        type: TagPagesType,
        args: Object.assign({}, common_1.pageArgsFields, { name: {
                name: 'name',
                type: graphql_1.GraphQLString
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield TagController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    tag: {
        type: tagObjectType,
        args: {
            name: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield TagController_1.default.insert(args, ctx);
            return result;
        })
    },
    editTag: {
        type: tagObjectType,
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
            const result = yield TagController_1.default.update(args, ctx);
            return result;
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=Tag.js.map