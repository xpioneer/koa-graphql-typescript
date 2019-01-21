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
const typeorm_1 = require("typeorm");
const balls_1 = require("../entities/mysql/balls");
const tools_1 = require("../utils/tools");
class DoubleColorBallController {
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getRepository(balls_1.Balls).findOne({ id });
            console.log(result, 'getById');
            return result;
        });
    }
    static deleteById(id = '', ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getRepository(balls_1.Balls).update({ id }, {
                deletedAt: Date.now(),
                deletedBy: ctx.state['CUR_USER'].id,
            });
            console.log(result, '--------delete');
            if (result.raw.affectedRows) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    static pages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(args)
            // delete args.createdAt // delete createdAt
            const options = {
                skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                take: args.pageSize,
                order: { 'drawDate': 'DESC' },
                where: {
                    deletedAt: null
                }
            };
            if (args.issue) {
                const issue = args.issue.split(',');
                options.where['issue'] = typeorm_1.Between(issue[0], issue[1]);
            }
            if (args.drawDate) {
                const date = args.drawDate.map((c) => (new Date(c)).valueOf());
                options.where['drawDate'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            console.log(options, '----options');
            const pages = yield typeorm_1.getRepository(balls_1.Balls).findAndCount(options);
            return pages;
        });
    }
    static insert(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const ball = yield typeorm_1.getRepository(balls_1.Balls).findOne({ issue: args.issue });
            if (ball) {
                ctx.throw(500, '该期号已存在');
            }
            let model = new balls_1.Balls();
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
            const result = yield typeorm_1.getRepository(balls_1.Balls).save(model);
            return result;
        });
    }
    static update(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const ball = yield typeorm_1.getRepository(balls_1.Balls).findOne({ id: args.id });
            if (!ball) {
                ctx.throw(500, '该期不存在');
            }
            let model = new balls_1.Balls();
            model.issue = args.issue;
            model.red1 = args.reds[0];
            model.red2 = args.reds[1];
            model.red3 = args.reds[2];
            model.red4 = args.reds[3];
            model.red5 = args.reds[4];
            model.red6 = args.reds[5];
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
            const result = yield typeorm_1.getRepository(balls_1.Balls).update({ id: args.id }, model);
            if (result.raw.affectedRows) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    static allBallCount() {
        return __awaiter(this, void 0, void 0, function* () {
            let redList = [], _redDisList = [];
            for (let i = 1; i <= 6; i++) {
                const list = yield typeorm_1.getRepository(balls_1.Balls)
                    .createQueryBuilder('ball')
                    .select(`COUNT(ball.red${i})`, 'total')
                    .addSelect(`red${i}`)
                    .groupBy(`red${i}`)
                    .getRawMany();
                redList = [...redList, ...list.map(v => {
                        return { total: v.total, ball: v[`red${i}`] };
                    })];
                _redDisList.push(list.map(v => ({ total: +v.total, ball: v[`red${i}`] })));
            }
            let reds = [];
            redList.forEach((v) => {
                let r = reds.filter((v1) => v1.ball === v.ball);
                if (r.length === 1) {
                    r[0].total = r[0].total + 1 * v.total;
                }
                else {
                    reds.push({ ball: v.ball, total: +v.total });
                }
            });
            let blues = [];
            const list = yield typeorm_1.getRepository(balls_1.Balls)
                .createQueryBuilder('ball')
                .select('COUNT(ball.blue)', 'total')
                .addSelect('blue')
                .groupBy('blue')
                .getRawMany();
            blues = list.map(v => ({ total: v.total, ball: +v['blue'] }));
            // 补充
            let $redDisList = JSON.parse(JSON.stringify(_redDisList)), redDisList = [];
            $redDisList.forEach((item, index) => {
                let _item = [];
                for (let i = 1; i <= 33; i++) {
                    let redBall = item.filter(b => b.ball === i)[0];
                    _item[i - 1] = { ball: i, total: redBall ? redBall.total : 0 };
                }
                redDisList[index] = _item;
            });
            return {
                reds,
                blues,
                redDisList
            };
        });
    }
}
exports.default = DoubleColorBallController;
//# sourceMappingURL=DoubleColorBallController.js.map