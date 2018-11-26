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
import TagCtrl from '../../controllers/TagController'
import { metaFields, pageArgsFields } from './common'

// tag
const tagObjectType = new GraphQLObjectType({
  name: 'tag',
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

// tag pages type
const TagPagesType = new GraphQLObjectType({
  name: 'tagPageType',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(tagObjectType)
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  tag: {
    type: tagObjectType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const tag = await TagCtrl.getById(id)
      return tag
    }
  },
  tags: {
    type: TagPagesType,
    args: {
      ...pageArgsFields
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await TagCtrl.pages(args)
      return Object.assign({
        list: pages[0],
        total: pages[1],
        ...args
      });
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  tag: {
    type: tagObjectType,
    args: {
      name: {
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