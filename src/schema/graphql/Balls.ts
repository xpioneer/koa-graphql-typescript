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
import DoubleBallCtrl from '../../controllers/DoubleColorBallController'
import { metaFields, pageArgsFields } from './common'

// const ArticleInputType = new GraphQLInputObjectType({
//   name: 'articleInput',
//   description: 'input article playload',
//   fields: () => ({
//     title: {
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     description: {
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     abstract: {
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     isTop: {
//       type: GraphQLInt,
//       defaultValue: 0
//     },
//     tag: {
//       type: GraphQLString
//     },
//     typeId: {
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   })
// })

// doubleColorBall
const DoubleColorBallType = new GraphQLObjectType({
  name: 'doubleColorBall',
  description: 'an doubleColorBall single model',
  fields: {
    id: {
      type: GraphQLString
    },
    issue: {
      type: GraphQLString,
      description: '期数'
    },
    red1: {
      type: GraphQLInt
    },
    red2: {
      type: GraphQLInt
    },
    red3: {
      type: GraphQLInt
    },
    red4: {
      type: GraphQLInt
    },
    red5: {
      type: GraphQLInt
    },
    red6: {
      type: GraphQLInt
    },
    blue: {
      type: GraphQLInt
    },
    happySun: {
      type: GraphQLString,
      description: '快乐星期天'
    },
    pool: {
      type: GraphQLInt
    },
    prizeOne: {
      type: GraphQLInt
    },
    prizeOneNum: {
      type: GraphQLInt
    },
    prizeTwo: {
      type: GraphQLInt
    },
    prizeTwoNum: {
      type: GraphQLInt
    },
    bettingNum: {
      type: GraphQLInt
    },
    drawDate: {
      type: GraphQLString,
      resolve(obj, args, ctx, info){
        const drawDate = Number(obj.drawDate) || Date.now()
        return Moment(drawDate).format('YYYY-MM-DD')
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

// doubleColorBall pages type
const DoubleColorBallPagesType = new GraphQLObjectType({
  name: 'doubleColorBallPageType',
  description: 'balls pages query',
  fields: {
    ...metaFields,
    list: {
      type: new GraphQLList(DoubleColorBallType),
    }
  }
})

const query: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  ball: {
    type: DoubleColorBallType,
    args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const {id} = args;
      const ball = await DoubleBallCtrl.getById(id)
      return ball
    }
  },
  balls: {
    type: DoubleColorBallPagesType,
    args: {
      ...pageArgsFields,
      issue: {
        type: GraphQLString
      },
      drawDate: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const pages = await DoubleBallCtrl.pages(args)
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
    type: DoubleColorBallType,
    description: 'create/update a ball',
    args: {
      reds: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
      },
      blue: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      pool: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      drawDate: {
        type: new GraphQLNonNull(GraphQLString)
      },
      prizeOne: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      prizeOneNum: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      prizeTwo: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      prizeTwoNum: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      bettingNum: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await DoubleBallCtrl.insert(args.input, ctx)
      return {id: result.id}
    }
  },
  // editArticle: {
  //   type: DoubleBallCtrl,
  //   description: 'create/update article',
  //   args: {
  //     id: {
  //       type: new GraphQLNonNull(GraphQLString)
  //     },
  //   },
  //   resolve: async (obj, args, ctx, info) => {
  //     const result = await ArticleCtrl.update(args, ctx)
  //     return result
  //   }
  // }
}

export default {
  query,
  mutation
};