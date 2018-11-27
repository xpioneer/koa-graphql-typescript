import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
} from 'graphql';
import {Context} from '@core/koa'
import * as Moment from 'moment'
import ArticleTypeCtrl from '../../controllers/ArticleTypeController'
import { metaFields, pageArgsFields } from './common'

// articleType
export const articleTypeObjectType = new GraphQLObjectType({
  name: 'articleType',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    remark: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const createdAt = Number(obj.createdAt) || Date.now()
        return Moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    createdBy: {
      type: GraphQLString
    }
  }
})

// article pages type
const ArticleTypePagesType = new GraphQLObjectType({
  name: 'articleTypePageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(articleTypeObjectType)
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  articleType: {
    type: articleTypeObjectType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const article = await ArticleTypeCtrl.getById(id)
      return article
    }
  },
  articleTypes: {
    type: ArticleTypePagesType,
    args: {
      ...pageArgsFields
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await ArticleTypeCtrl.pages(args)
      // console.log(args, '-------------->args')
      return Object.assign({
        list: pages[0],
        total: pages[1],
        ...args
      });
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  articleType: {
    type: articleTypeObjectType,
    description: 'create articleType',
    args: {
      name: {
        type: GraphQLString
      },
      remark: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      return {}
    }
  }
}

export default {
  query,
  mutation
};