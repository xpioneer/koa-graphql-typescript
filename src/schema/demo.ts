import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLScalarType
} from 'graphql';
// import * as Koa from 'koa'
import { toDate } from 'date-fns'

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        args: {
          id: {
            // name: 'id',
            type: GraphQLInt // 参数不为空
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

export {
  schema
};
