import {KoaGraphql} from '@core/graphql/index'
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
import ArticleCtl from '../../controllers/ArticleController'

interface ResolveConfig {
  [key: string]: any
}


let articleType = new GraphQLObjectType({
  name: 'articleType',
  fields: {
    id: {
      type: GraphQLString
    },
    message: {
      type: GraphQLString
    },
    ip: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString,
      resolve(){
        return Moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    created_by: {
      type: GraphQLString
    }
  }
})

const query = {
  article: {
    type: articleType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj: any, args: any, ctx: Koa.Context, info: any) => {
      const {id} = args;
      const article = await ArticleCtl.getById(id)
      return article
    }
  },
  articles: {
    type: new GraphQLList(articleType),
    resolve: async (): Promise<any> => {
      // const list = await DemoCtrl.getAll()
      return [];
    }
  }
}

const mutation = {
  article: {
    type: articleType,
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
    resolve: async (obj: any, args: any, ctx: Koa.Context, info: any) => {
      return {}
    }
  }
}

export default {
  query,
  mutation
};