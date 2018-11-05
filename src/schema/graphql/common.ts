import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
  GraphQLFieldConfigArgumentMap
} from 'graphql';
import {Context} from '@core/koa'

export const PageDataType = new GraphQLObjectType({
  name: 'pageData',
  fields: {
    page: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['page'] || 1
      }
    },
    page_size: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['page_size']
      }
    },
    total: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return obj['total']
      }
    },
    total_page: {
      type: GraphQLInt,
      resolve(obj, args, ctx, info) {
        return Math.ceil((obj['total'] || 0)/(obj['page_size']))
      }
    },
    cur_size: {
      type: GraphQLInt
    }
  }
})

export const metaFields: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  meta: {
    type: PageDataType,
    resolve(obj, args, ctx, info){
      const pageInfo = {}
      pageInfo['total'] = obj['total']
      pageInfo['cur_size'] = obj['list'].length
      pageInfo['page'] = obj['page']
      pageInfo['page_size'] = obj['page_size']
      return pageInfo
    }
  },
}

export const pageArgsFields: GraphQLFieldConfigArgumentMap = {
  page: {type: GraphQLInt, defaultValue: 1},
  page_size: {type: GraphQLInt, defaultValue: 10}
}