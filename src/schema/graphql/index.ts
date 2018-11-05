import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  Thunk,
  GraphQLFieldConfigMap,
  Source
} from 'graphql';
import {Context} from '@core/koa'
import Article from './Article'
import Qixi from './Qixi'

let count = 0
const demo: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  count: {
    type: GraphQLInt,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt // 参数不为空
      }
    },
    resolve: (obj, args, ctx, info) => {
      ++count;
      return count;
    }
  },
}

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      ...demo,
      // ...Article.query,
      ...Qixi.query
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      // ...Article.mutation,
      ...Qixi.mutation
    }
  })
})

console.log('RootSchema:', RootSchema.getQueryType())

export {
  RootSchema
};
