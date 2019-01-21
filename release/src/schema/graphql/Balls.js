"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Moment = require("moment");
const DoubleColorBallController_1 = require("../../controllers/DoubleColorBallController");
const common_1 = require("./common");
const BallChartType = new graphql_1.GraphQLObjectType({
    name: 'ballChartType',
    fields: {
        name: {
            type: graphql_1.GraphQLInt,
            resolve(obj) {
                return obj.ball;
            }
        },
        value: {
            type: graphql_1.GraphQLInt,
            resolve(obj) {
                return obj.total;
            }
        }
    }
});
// ballInputType
const BallInputType = new graphql_1.GraphQLInputObjectType({
    name: 'ballInput',
    description: 'input ball playload',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        },
        issue: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        reds: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLInt))
        },
        blue: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        pool: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        prizeOne: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        prizeOneNum: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        prizeTwo: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        prizeTwoNum: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        bettingNum: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        drawDate: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        }
    })
});
// doubleColorBall
const DoubleColorBallType = new graphql_1.GraphQLObjectType({
    name: 'doubleColorBall',
    description: 'an doubleColorBall single model',
    fields: {
        id: {
            type: graphql_1.GraphQLString
        },
        issue: {
            type: graphql_1.GraphQLString,
            description: '期数'
        },
        red1: {
            type: graphql_1.GraphQLInt
        },
        red2: {
            type: graphql_1.GraphQLInt
        },
        red3: {
            type: graphql_1.GraphQLInt
        },
        red4: {
            type: graphql_1.GraphQLInt
        },
        red5: {
            type: graphql_1.GraphQLInt
        },
        red6: {
            type: graphql_1.GraphQLInt
        },
        reds: {
            type: graphql_1.GraphQLList(graphql_1.GraphQLInt),
            resolve(obj, args, ctx, info) {
                return [obj.red1, obj.red2, obj.red3, obj.red4, obj.red5, obj.red6];
            }
        },
        blue: {
            type: graphql_1.GraphQLInt
        },
        happySun: {
            type: graphql_1.GraphQLString,
            description: '快乐星期天'
        },
        pool: {
            type: graphql_1.GraphQLInt
        },
        prizeOne: {
            type: graphql_1.GraphQLInt
        },
        prizeOneNum: {
            type: graphql_1.GraphQLInt
        },
        prizeTwo: {
            type: graphql_1.GraphQLInt
        },
        prizeTwoNum: {
            type: graphql_1.GraphQLInt
        },
        bettingNum: {
            type: graphql_1.GraphQLInt
        },
        drawDate: {
            type: graphql_1.GraphQLString,
            resolve(obj, args, ctx, info) {
                const drawDate = Number(obj.drawDate) || Date.now();
                return Moment(drawDate).format('YYYY-MM-DD');
            }
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve(obj, args, ctx, info) {
                const createdAt = Number(obj.createdAt) || Date.now();
                return Moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        createdBy: {
            type: graphql_1.GraphQLString
        }
    }
});
// doubleColorBall pages type
const DoubleColorBallPagesType = new graphql_1.GraphQLObjectType({
    name: 'doubleColorBallPageType',
    description: 'balls pages query',
    fields: Object.assign({}, common_1.metaFields, { list: {
            type: new graphql_1.GraphQLList(DoubleColorBallType),
        } })
});
const query = {
    ball: {
        type: DoubleColorBallType,
        args: {
            id: {
                name: 'id',
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const ball = yield DoubleColorBallController_1.default.getById(id);
            return ball;
        })
    },
    balls: {
        type: DoubleColorBallPagesType,
        args: Object.assign({}, common_1.pageArgsFields, { issue: {
                type: graphql_1.GraphQLString
            }, drawDate: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString)
            } }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const pages = yield DoubleColorBallController_1.default.pages(args);
            return Object.assign(Object.assign({ list: pages[0], total: pages[1] }, args));
        })
    },
    ballCount: {
        type: new graphql_1.GraphQLObjectType({
            name: 'ballCount',
            fields: {
                reds: { type: graphql_1.GraphQLList(BallChartType) },
                blues: { type: graphql_1.GraphQLList(BallChartType) },
                redDisList: { type: graphql_1.GraphQLList(graphql_1.GraphQLList(BallChartType)) }
            }
        }),
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield DoubleColorBallController_1.default.allBallCount();
            return result;
        })
    }
};
const mutation = {
    ball: {
        type: DoubleColorBallType,
        description: 'create/update a ball',
        args: {
            input: {
                type: new graphql_1.GraphQLNonNull(BallInputType)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield DoubleColorBallController_1.default.insert(args.input, ctx);
            return { id: result.id };
        })
    },
    editBall: {
        type: graphql_1.GraphQLBoolean,
        description: 'update ball',
        args: {
            input: {
                type: new graphql_1.GraphQLNonNull(BallInputType)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield DoubleColorBallController_1.default.update(args.input, ctx);
            return result;
        })
    },
    delBall: {
        type: graphql_1.GraphQLBoolean,
        description: 'update ball',
        args: {
            id: {
                name: 'id',
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
            const result = yield DoubleColorBallController_1.default.deleteById(args.id, ctx);
            return result;
        })
    }
};
exports.default = {
    query,
    mutation
};
//# sourceMappingURL=Balls.js.map