import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
  GraphQLInputObjectType,
} from 'graphql';
import {Context} from '@core/koa'
import * as Moment from 'moment'
import ArticleCtrl from '../../controllers/ArticleController'
import ArticleTypeCtrl from '../../controllers/ArticleTypeController'
import { metaFields, pageArgsFields } from './common'
import { articleTypeObjectType } from './ArticleType'

const ArticleInputType = new GraphQLInputObjectType({
  name: 'articleInput',
  description: 'input article playload',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    abstract: {
      type: new GraphQLNonNull(GraphQLString)
    },
    isTop: {
      type: GraphQLString,
      defaultValue: 0
    },
    tag: {
      type: GraphQLString
    },
    typeId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

// article
const ArticleObjectType = new GraphQLObjectType({
  name: 'article',
  description: 'an article single model',
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
    isTop: {
      type: GraphQLString
    },
    tag: {
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
  description: 'article pages query',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(ArticleObjectType),
      // resolve(obj, args, ctx, info){
      //   return obj.list
      // }
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  article: {
    type: ArticleObjectType,
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
      ...pageArgsFields,
      title: {
        type: GraphQLString
      },
      abstract: {
        type: GraphQLString
      },
      tag: {
        type: GraphQLString
      }
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
    type: ArticleObjectType,
    description: 'create/update article',
    args: {
      input: {
        type: new GraphQLNonNull(ArticleInputType)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await ArticleCtrl.insert(args.input, ctx)
      return {id: result.id}
    }
  }
}

export default {
  query,
  mutation
};