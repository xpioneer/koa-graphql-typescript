"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Article_1 = require("./Article");
const ArticleType_1 = require("./ArticleType");
const Comment_1 = require("./Comment");
const Tag_1 = require("./Tag");
const User_1 = require("./User");
const LeaveMessage_1 = require("./LeaveMessage");
const Balls_1 = require("./Balls");
let count = 0;
const demo = {
    count: {
        type: graphql_1.GraphQLInt,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLInt // 参数不为空
            }
        },
        resolve: (obj, args, ctx, info) => {
            ++count;
            return count;
        }
    },
};
const RootSchema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQuery',
        fields: Object.assign({}, demo, Article_1.default.query, ArticleType_1.default.query, Comment_1.default.query, Tag_1.default.query, User_1.default.query, LeaveMessage_1.default.query, Balls_1.default.query)
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: 'RootMutation',
        fields: Object.assign({}, Article_1.default.mutation, ArticleType_1.default.mutation, Comment_1.default.mutation, Tag_1.default.mutation, User_1.default.mutation, LeaveMessage_1.default.mutation, Balls_1.default.mutation)
    })
});
exports.RootSchema = RootSchema;
//# sourceMappingURL=index.js.map