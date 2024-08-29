import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNullableType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLType,
  GraphQLScalarType,
  Thunk,
  GraphQLFieldConfigMap,
  Source,
} from 'graphql';
import {Context} from 'koa'
import { toDate } from 'date-fns'
import TagCtrl from '../../controllers/TagController'
import { metaFields, pageArgsFields, creatorFields } from './common'
import { formatDate } from '../../utils/tools/formatDate';

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
    ...creatorFields
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
        // name: 'id',
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
      ...pageArgsFields,
      name: {
        // name: 'name',
        type: GraphQLString
      }
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
        type: new GraphQLNonNull(GraphQLString)
      },
      remark: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await TagCtrl.insert(args, ctx)
      return result
    }
  },
  editTag: {
    type: tagObjectType,
    args: {
      id: {
        type: GraphQLString
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      remark: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await TagCtrl.save(args, ctx)
      return result
    }
  }
}

export default {
  query,
  mutation
};