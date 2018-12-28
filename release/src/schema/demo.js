"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
let count = 0;
let schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            count: {
                type: graphql_1.GraphQLInt,
                args: {
                    id: {
                        name: 'id',
                        type: graphql_1.GraphQLInt // 参数不为空
                    }
                },
                resolve: (a, b, c, d) => {
                    ++count;
                    return count;
                }
            }
        }
    })
});
exports.schema = schema;
//# sourceMappingURL=demo.js.map