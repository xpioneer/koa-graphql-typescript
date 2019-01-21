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
const UserController_1 = require("../../controllers/UserController");
const common_1 = require("./common");
// user
exports.userObjectType = new graphql_1.GraphQLObjectType({
    name: 'user',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        username: {
            type: graphql_1.GraphQLString
        },
        nickName: {
            type: graphql_1.GraphQLString
        },
        userType: {
            type: graphql_1.GraphQLInt
        },
        sex: {
            type: graphql_1.GraphQLInt
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
// user pages type
const UserPagesType = new graphql_1.GraphQLObjectType({
    name: 'userPageType',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(exports.userObjectType)
        } })
});
const query = {
    user: {
        type: exports.userObjectType,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const article = yield UserController_1.default.getById(id);
            return article;
        })
    },
    users: {
        type: UserPagesType,
        args: Object.assign({}, common_1.pageArgsFields, { username: {
                type: graphql_1.GraphQLString
            }, nickName: {
                type: graphql_1.GraphQLString
            }, userType: {
                type: graphql_1.GraphQLInt
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield UserController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    user: {
        type: exports.userObjectType,
        args: {
            username: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            nickName: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            password: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            userType: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
            },
            sex: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserController_1.default.insert(args, ctx);
            return result;
        })
    },
    editUser: {
        type: exports.userObjectType,
        args: {
            id: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            username: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            nickName: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            password: {
                type: graphql_1.GraphQLString
            },
            userType: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
            },
            sex: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
            },
            remark: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield UserController_1.default.update(args, ctx);
            return result;
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=User.js.map