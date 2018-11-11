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
import CommentCtrl from '../../controllers/CommentController'
import { metaFields, pageArgsFields } from './common'

// comment
export const commentObjectType = new GraphQLObjectType({
  name: 'comment',
  fields: {
    id: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    remark: {
      type: GraphQLString
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

// comment pages type
const CommentPagesType = new GraphQLObjectType({
  name: 'commentPageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(commentObjectType)
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  comment: {
    type: commentObjectType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const article = await CommentCtrl.getById(id)
      return article
    }
  },
  comments: {
    type: CommentPagesType,
    args: {
      ...pageArgsFields
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await CommentCtrl.pages(args)
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
  comment: {
    type: commentObjectType,
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