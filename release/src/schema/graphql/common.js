"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.PageDataType = new graphql_1.GraphQLObjectType({
    name: 'pageData',
    fields: {
        current: {
            type: graphql_1.GraphQLInt,
            resolve: function (obj, args, ctx, info) {
                return obj['page'] || 1;
            }
        },
        page: {
            type: graphql_1.GraphQLInt,
            resolve: function (obj, args, ctx, info) {
                return obj['page'] || 1;
            }
        },
        pageSize: {
            type: graphql_1.GraphQLInt,
            resolve: function (obj, args, ctx, info) {
                return obj['pageSize'];
            }
        },
        total: {
            type: graphql_1.GraphQLInt,
            resolve: function (obj, args, ctx, info) {
                return obj['total'];
            }
        },
        totalPage: {
            type: graphql_1.GraphQLInt,
            resolve: function (obj, args, ctx, info) {
                return Math.ceil((obj['total'] || 0) / (obj['pageSize']));
            }
        }
    }
});
// 计算返回分页数据
exports.metaFields = {
    meta: {
        type: exports.PageDataType,
        resolve: function (obj, args, ctx, info) {
            var pageInfo = {};
            pageInfo['total'] = obj['total'];
            pageInfo['curSize'] = obj['list'].length;
            pageInfo['page'] = obj['page'];
            pageInfo['pageSize'] = obj['pageSize'];
            return pageInfo;
        }
    },
};
// 分页排序默认参数
exports.PageOrderType = new graphql_1.GraphQLInputObjectType({
    name: 'pageOrder',
    fields: {
        createdAt: {
            type: graphql_1.GraphQLString
        },
        drawDate: {
            type: graphql_1.GraphQLString
        },
        id: {
            type: graphql_1.GraphQLString
        },
    }
});
// 获取参数
exports.pageArgsFields = {
    page: {
        type: graphql_1.GraphQLInt,
        defaultValue: 1,
    },
    pageSize: {
        type: graphql_1.GraphQLInt,
        defaultValue: 10
    },
    order: {
        type: exports.PageOrderType,
        defaultValue: { 'createdAt': 'DESC' }
    },
    createdAt: {
        type: new graphql_1.GraphQLList(graphql_1.GraphQLString)
    }
};
//# sourceMappingURL=common.js.map