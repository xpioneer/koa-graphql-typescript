"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var balls_1 = require("../entities/mysql/balls");
var tools_1 = require("../utils/tools");
var DoubleColorBallController = /** @class */ (function () {
    function DoubleColorBallController() {
    }
    DoubleColorBallController.getById = function (id) {
        if (id === void 0) { id = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).findOne({ id: id })];
                    case 1:
                        result = _a.sent();
                        console.log(result, 'getById');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DoubleColorBallController.deleteById = function (id, ctx) {
        if (id === void 0) { id = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).update({ id: id }, {
                            deletedAt: Date.now(),
                            deletedBy: ctx.state['CUR_USER'].id,
                        })];
                    case 1:
                        result = _a.sent();
                        console.log(result, '--------delete');
                        if (result.raw.affectedRows) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DoubleColorBallController.pages = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var options, issue, date, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log(args)
                        delete args.order.createdAt; // delete createdAt
                        options = {
                            skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                            take: args.pageSize,
                            order: { 'drawDate': 'DESC' },
                            where: {
                                deletedAt: null
                            }
                        };
                        if (args.issue) {
                            issue = args.issue.split(',');
                            options.where['issue'] = typeorm_1.Between(issue[0], issue[1]);
                        }
                        if (args.drawDate) {
                            date = args.drawDate.map(function (c) { return (new Date(c)).valueOf(); });
                            options.where['drawDate'] = typeorm_1.Between(date[0], date[1]);
                        }
                        if (args.order) {
                            options.order = Object.assign(options.order, args.order);
                        }
                        console.log(options, '----options');
                        return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).findAndCount(options)];
                    case 1:
                        pages = _a.sent();
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    DoubleColorBallController.insert = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var ball, model, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).findOne({ issue: args.issue })];
                    case 1:
                        ball = _a.sent();
                        if (ball) {
                            ctx.throw(500, '该期号已存在');
                        }
                        model = new balls_1.Balls();
                        model.id = tools_1.Guid();
                        model.issue = args.issue;
                        model.red1 = args.reds[0];
                        model.red2 = args.reds[1];
                        model.red3 = args.reds[2];
                        model.red4 = args.reds[3];
                        model.red5 = args.reds[4];
                        model.red6 = args.reds[5];
                        model.blue = args.blue;
                        // model.happySun = args.happySun
                        model.pool = args.pool;
                        model.prizeOne = args.prizeOne;
                        model.prizeOneNum = args.prizeOneNum;
                        model.prizeTwo = args.prizeTwo;
                        model.prizeTwoNum = args.prizeTwoNum;
                        model.bettingNum = args.bettingNum;
                        model.drawDate = new Date(args.drawDate).getTime();
                        model.createdBy = ctx.state['CUR_USER'].id;
                        model.createdAt = Date.now();
                        model.updatedBy = ctx.state['CUR_USER'].id;
                        model.updatedAt = Date.now();
                        return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).save(model)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DoubleColorBallController.update = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var ball, reds, model, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).findOne({ id: args.id })];
                    case 1:
                        ball = _a.sent();
                        if (!ball) {
                            ctx.throw(500, '该期不存在');
                        }
                        reds = args.reds;
                        model = new balls_1.Balls();
                        model.issue = args.issue;
                        model.red1 = reds[0];
                        model.red2 = reds[1];
                        model.red3 = reds[2];
                        model.red4 = reds[3];
                        model.red5 = reds[4];
                        model.red6 = reds[5];
                        model.blue = args.blue;
                        model.pool = args.pool;
                        model.prizeOne = args.prizeOne;
                        model.prizeOneNum = args.prizeOneNum;
                        model.prizeTwo = args.prizeTwo;
                        model.prizeTwoNum = args.prizeTwoNum;
                        model.bettingNum = args.bettingNum;
                        model.drawDate = new Date(args.drawDate).getTime();
                        model.updatedBy = ctx.state['CUR_USER'].id;
                        model.updatedAt = Date.now();
                        return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls).update({ id: args.id }, model)];
                    case 2:
                        result = _a.sent();
                        if (result.raw.affectedRows) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DoubleColorBallController.allBallCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var redList, _redDisList, _loop_1, i, reds, blues, list, $redDisList, redDisList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redList = [], _redDisList = [];
                        _loop_1 = function (i) {
                            var list_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls)
                                            .createQueryBuilder('ball')
                                            .select("COUNT(ball.red" + i + ")", 'total')
                                            .addSelect("red" + i)
                                            .groupBy("red" + i)
                                            .getRawMany()];
                                    case 1:
                                        list_1 = _a.sent();
                                        redList = redList.concat(list_1.map(function (v) {
                                            return { total: v.total, ball: v["red" + i] };
                                        }));
                                        _redDisList.push(list_1.map(function (v) { return ({ total: +v.total, ball: v["red" + i] }); }));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 6)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        reds = [];
                        redList.forEach(function (v) {
                            var r = reds.filter(function (v1) { return v1.ball === v.ball; });
                            if (r.length === 1) {
                                r[0].total = r[0].total + 1 * v.total;
                            }
                            else {
                                reds.push({ ball: v.ball, total: +v.total });
                            }
                        });
                        blues = [];
                        return [4 /*yield*/, typeorm_1.getRepository(balls_1.Balls)
                                .createQueryBuilder('ball')
                                .select('COUNT(ball.blue)', 'total')
                                .addSelect('blue')
                                .groupBy('blue')
                                .getRawMany()];
                    case 5:
                        list = _a.sent();
                        blues = list.map(function (v) { return ({ total: v.total, ball: +v['blue'] }); });
                        $redDisList = JSON.parse(JSON.stringify(_redDisList)), redDisList = [];
                        $redDisList.forEach(function (item, index) {
                            var _item = [];
                            var _loop_2 = function (i) {
                                var redBall = item.filter(function (b) { return b.ball === i; })[0];
                                _item[i - 1] = { ball: i, total: redBall ? redBall.total : 0 };
                            };
                            for (var i = 1; i <= 33; i++) {
                                _loop_2(i);
                            }
                            redDisList[index] = _item;
                        });
                        return [2 /*return*/, {
                                reds: reds,
                                blues: blues,
                                redDisList: redDisList
                            }];
                }
            });
        });
    };
    return DoubleColorBallController;
}());
exports.default = DoubleColorBallController;
//# sourceMappingURL=DoubleColorBallController.js.map