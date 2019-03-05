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
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Article_1 = require("./Article");
var ArticleType_1 = require("./ArticleType");
var Comment_1 = require("./Comment");
var Tag_1 = require("./Tag");
var User_1 = require("./User");
var LeaveMessage_1 = require("./LeaveMessage");
var Balls_1 = require("./Balls");
var count = 0;
var demo = {
    count: {
        type: graphql_1.GraphQLInt,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLInt // 参数不为空
            }
        },
        resolve: function (obj, args, ctx, info) {
            ++count;
            return count;
        }
    },
};
var RootSchema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQuery',
        fields: __assign({}, demo, Article_1.default.query, ArticleType_1.default.query, Comment_1.default.query, Tag_1.default.query, User_1.default.query, LeaveMessage_1.default.query, Balls_1.default.query)
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: 'RootMutation',
        fields: __assign({}, Article_1.default.mutation, ArticleType_1.default.mutation, Comment_1.default.mutation, Tag_1.default.mutation, User_1.default.mutation, LeaveMessage_1.default.mutation, Balls_1.default.mutation)
    })
});
exports.RootSchema = RootSchema;
//# sourceMappingURL=index.js.map