import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLScalarType
} from 'graphql';
import * as Koa from '@core/koa'
import * as Moment from 'moment'
import Article from './Article'
import Qixi from './Qixi'

let RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      ...Article.query,
      ...Qixi.query
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      ...Article.mutation,
      ...Qixi.mutation
    }
  })
})

export {
  RootSchema
};
