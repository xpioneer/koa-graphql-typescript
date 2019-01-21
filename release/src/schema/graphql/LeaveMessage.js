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
const LeaveMessageController_1 = require("../../controllers/LeaveMessageController");
const common_1 = require("./common");
// leaveMessage
exports.leaveMessageObjectType = new graphql_1.GraphQLObjectType({
    name: 'leaveMessage',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        description: {
            type: graphql_1.GraphQLString
        },
        parentId: {
            type: graphql_1.GraphQLString
        },
        ip: {
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
// leaveMessage pages type
const LeaveMsgPagesType = new graphql_1.GraphQLObjectType({
    name: 'leaveMsgPageType',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(exports.leaveMessageObjectType)
        } })
});
const query = {
    leaveMsg: {
        type: exports.leaveMessageObjectType,
        args: {
            id: {
                name: 'id',
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const leaveMsg = yield LeaveMessageController_1.default.getById(id);
            return leaveMsg;
        })
    },
    leaveMsgs: {
        type: LeaveMsgPagesType,
        args: Object.assign({}, common_1.pageArgsFields, { description: {
                name: 'description',
                type: graphql_1.GraphQLString
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield LeaveMessageController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    }
};
const mutation = {
    leaveMessage: {
        type: exports.leaveMessageObjectType,
        args: {
            description: {
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
//# sourceMappingURL=LeaveMessage.js.map