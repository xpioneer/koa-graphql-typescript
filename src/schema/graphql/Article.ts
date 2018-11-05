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
} from 'graphql';
import * as Koa from '@core/koa'
import * as Moment from 'moment'
import ArticleCtl from '../../controllers/ArticleController'


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

const query: Thunk<GraphQLFieldConfigMap<Source, Koa.Context>> = {
  article: {
    type: articleType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      console.log('query article')
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

const mutation: Thunk<GraphQLFieldConfigMap<Source, Koa.Context>> = {
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
    resolve: async (obj, args, ctx, info) => {
      return {}
    }
  }
}

export default {
  query,
  mutation
};