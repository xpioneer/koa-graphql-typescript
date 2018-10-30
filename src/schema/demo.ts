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
import { Chat } from '../entities/qixi'
import * as Moment from 'moment'
import DemoCtrl from '../controllers/DemoController'

let count = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt // 参数不为空
          }
        },
        resolve: (a, b, c, d) => {
          ++count;
          return count;
        }
      }
    }
  })
});

let fields = {
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


let chatType = new GraphQLObjectType({
  name: 'chatType',
  fields
})

let chats = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      count: {
        type: GraphQLInt,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt // 参数不为空
          }
        },
        resolve: (a, b, c, d) => {
          ++count;
          return count;
        }
      },
      chatlist: {
        type: new GraphQLList(chatType),
        resolve: async () => {
          const list = await DemoCtrl.getAll()
          return list;
        }
      },
      chat: {
        type: chatType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: async (obj, args, ctx, info) => {
          const {id} = args
          const chat = await DemoCtrl.getById(id)
          return chat;
        }
      }
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
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
      },
      chat1: {
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
  })
})

export {
  schema,
  // chat,
  chats
};
