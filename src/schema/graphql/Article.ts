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
import ArticleCtrl from '../../controllers/ArticleController'
import ArticleTypeCtrl from '../../controllers/ArticleTypeController'
import { metaFields, pageArgsFields } from './common'
import { articleTypeObjectType } from './ArticleType'

// article
const articleObjectType = new GraphQLObjectType({
  name: 'article',
  fields: {
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    abstract: {
      type: GraphQLString
    },
    typeId: {
      type: GraphQLString
    },
    articleType: {
      type: articleTypeObjectType,
      resolve: async(obj, args, ctx, info) => {
        const articleType = await ArticleTypeCtrl.getById(obj.typeId)
        return articleType
      }
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
const ArticlePagesType = new GraphQLObjectType({
  name: 'articlePageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(articleObjectType),
      // resolve(obj, args, ctx, info){
      //   return obj.list
      // }
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  article: {
    type: articleObjectType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const article = await ArticleCtrl.getById(id)
      return article
    }
  },
  articles: {
    type: ArticlePagesType,
    args: {
      ...pageArgsFields
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await ArticleCtrl.pages(args)
      return Object.assign({
        list: pages[0],
        total: pages[1],
        ...args
      });
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  article: {
    type: articleObjectType,
    args: {
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      typeId: {
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