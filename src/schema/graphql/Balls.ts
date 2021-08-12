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
import { toDate } from 'date-fns'
import DoubleBallCtrl from '../../controllers/DoubleColorBallController'
import { metaFields, pageArgsFields } from './common'
import { formatDate } from '../../utils/tools/formatDate';
import { DateFormat } from '../../types/base';

const BallChartType = new GraphQLObjectType({
  name: 'ballChartType',
  fields: {
    name: {
      type: GraphQLInt,
      resolve(obj: any) {
        return obj.ball
      }
    },
    value: {
      type: GraphQLInt,
      resolve(obj: any) {
        return obj.total
      }
    }
  }
})

// ballInputType
const BallInputType = new GraphQLInputObjectType({
  name: 'ballInput',
  description: 'input ball playload',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    issue: {
      type: GraphQLNonNull(GraphQLString)
    },
    reds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLInt))
    },
    blue: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    pool: {
      type: new GraphQLNonNull(GraphQLInt)
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
    },
    drawDate: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

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
    reds: {
      type: GraphQLList(GraphQLInt),
      resolve(obj, args, ctx, info){
        return [obj.red1, obj.red2, obj.red3, obj.red4, obj.red5, obj.red6]
      }
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
        return formatDate(drawDate, DateFormat.Date)
      }
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
        // name: 'id',
        type: GraphQLNonNull(GraphQLString)
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
  },
  ballCount: {
    type: new GraphQLObjectType({
      name: 'ballCount',
      fields: {
        reds: { type: GraphQLList(BallChartType) },
        blues: { type: GraphQLList(BallChartType) },
        redDisList: { type: GraphQLList(GraphQLList(BallChartType)) }
      }
    }),
    resolve: async (obj, args, ctx, info): Promise<any> => {
      const result = await DoubleBallCtrl.allBallCount()
      return result;
    }
  }
}

const mutation: Thunk<GraphQLFieldConfigMap<Source, Context>> = {
  ball: {
    type: DoubleColorBallType,
    description: 'create/update a ball',
    args: {
      input: {
        type: new GraphQLNonNull(BallInputType)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await DoubleBallCtrl.insert(args.input, ctx)
      return {id: result.id}
    }
  },
  editBall: {
    type: GraphQLBoolean,
    description: 'update ball',
    args: {
      input: {
        type: new GraphQLNonNull(BallInputType)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await DoubleBallCtrl.update(args.input, ctx)
      return result
    }
  },
  delBall: {
    type: GraphQLBoolean,
    description: 'update ball',
    args: {
      id: {
        // name: 'id',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (obj, args, ctx, info) => {
      const result = await DoubleBallCtrl.deleteById(args.id, ctx)
      return result
    }
  }
}

export default {
  query,
  mutation
};