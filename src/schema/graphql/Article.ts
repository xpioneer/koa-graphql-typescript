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
    type_id: {
      type: GraphQLString
    },
    article_type: {
      type: articleTypeObjectType,
      resolve: async(obj, args, ctx, info) => {
        const articleType = await ArticleTypeCtrl.getById(obj.type_id)
        return articleType
      }
    },
    created_at: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const created_at = Number(obj.created_at) || Date.now()
        return Moment(created_at).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    created_by: {
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
      // page: {type: GraphQLInt},
      // page_size: {type: GraphQLInt, defaultValue: 5},
      // total: {type: GraphQLInt},
      // total_page: {type: GraphQLInt},
      // cur_size: {type: GraphQLInt},
      ...pageArgsFields
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await ArticleCtrl.pages(args)
      console.log(args, '-------------->args')
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
      type_id: {
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