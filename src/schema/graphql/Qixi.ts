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
  Source
} from 'graphql';
import {Context} from '@core/koa'
import * as Moment from 'moment'
import DemoCtrl from '../../controllers/DemoController'

const chatType = new GraphQLObjectType({
  name: 'chatType',
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

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  chat: {
    type: chatType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const article = await DemoCtrl.getById(id)
      return article
    }
  },
  chats: {
    type: new GraphQLList(chatType),
    resolve: async () => {
      const list = await DemoCtrl.getAll()
      return list;
    }
  },
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  chat: {
    type: chatType,
    args: {
      message: {
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await DemoCtrl.insert(args, ctx)
      return result;
    }
  }
}

export default {
  query,
  mutation
};