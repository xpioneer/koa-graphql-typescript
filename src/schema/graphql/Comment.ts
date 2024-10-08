import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLType,
  GraphQLNonNull,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
} from 'graphql';
import {Context} from 'koa'
import { toDate } from 'date-fns'
import CommentCtrl from '../../controllers/CommentController'
import { metaFields, pageArgsFields } from './common'
import { formatDate } from '../../utils/tools/formatDate';

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
    articleId: {
      type: GraphQLString
    },
    parentId: {
      type: GraphQLString
    },
    ip: {
      type: GraphQLString
    },
    client: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const createdAt = Number(obj.createdAt) || Date.now()
        return formatDate(createdAt)
      }
    },
    createdBy: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const updatedAt = Number(obj.updatedAt) || Date.now()
        return formatDate(updatedAt)
      }
    },
    updatedBy: {
      type: GraphQLString
    },
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
        // name: 'id',
        type: new GraphQLNonNull(GraphQLString)
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
      ...pageArgsFields,
      description: {
        // name: 'description',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await CommentCtrl.pages(args)
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