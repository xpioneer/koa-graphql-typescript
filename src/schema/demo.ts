import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLType
} from 'graphql';
import * as Koa from '@core/koa'
import DemoCtrl from '../controllers/DemoController'
import {Chat} from '@entities/qixi'

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        resolve: () => {
          ++count;
          return count;
        }
      }
    }
  })
});

let chat = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ChatType',
    fields: {
      chats: {
        type: new GraphQLList(GraphQLString),
        resolve: async(source: any, ctx: Koa.Context) => {
          const list = await DemoCtrl.getAll()
          return list;
        }
      }
    }
  })
});

export {
  schema,
  chat
};
