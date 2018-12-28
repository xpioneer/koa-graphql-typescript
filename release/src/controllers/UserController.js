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
const user_1 = require("../entities/mysql/user");
const tools_1 = require("../utils/tools");
const Moment = require("moment");
class UserController {
    static getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getManager().find(user_1.User);
        });
    }
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield typeorm_1.getRepository(user_1.User).findOne({ id }, {
                select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
            });
            return article;
        });
    }
    static pages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args, 'query args ===================');
            const options = {
                skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                take: args.pageSize,
                order: {},
                where: {
                    deletedAt: null
                },
                select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
            };
            if (args.username) {
                options.where['username'] = typeorm_1.Like(`%${args.username}%`);
            }
            if (args.nickName) {
                options.where['nickName'] = typeorm_1.Like(`%${args.nickName}%`);
            }
            if (args.userType >= 0) {
                options.where['userType'] = typeorm_1.Equal(args.userType);
            }
            if (args.createdAt) {
                const date = args.createdAt.map((c) => (Moment(c)).valueOf());
                options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            const pages = yield typeorm_1.getRepository(user_1.User).findAndCount(options);
            return pages;
        });
    }
    static insert(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = args.username;
            let password = args.password;
            if (!(username && username.length > 2)) {
                ctx.throw(400, '用户名长度必须大于1个字符');
            }
            if (!(password && password.length > 5)) {
                ctx.throw(400, '用户密码长度必须大于6个字符');
            }
            let model = new user_1.User();
            model.id = tools_1.Guid();
            model.username = args.username;
            model.nickName = args.nickName;
            model.userType = args.userType;
            model.password = tools_1.cryptoPwd(password, username);
            model.remark = args.remark;
            model.sex = args.sex;
            model.createdBy = ctx.state['CUR_USER'].id;
            model.createdAt = Date.now();
            model.updatedBy = ctx.state['CUR_USER'].id;
            model.updatedAt = Date.now();
            const result = yield typeorm_1.getRepository(user_1.User).save(model);
            return result;
        });
    }
    static update(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let username = args.username;
            let password = args.password;
            if (!(username && username.length > 2)) {
                ctx.throw(400, '用户名长度必须大于1个字符');
            }
            if (password && password.length > 0 && password.length < 6) {
                ctx.throw(400, '用户密码长度必须大于6个字符');
            }
            const user = new user_1.User;
            user.id = args.id;
            user.username = args.username;
            user.nickName = args.nickName;
            user.userType = args.userType;
            user.sex = args.sex;
            user.remark = args.remark;
            if (password) { // if pwd changed
                user.password = tools_1.cryptoPwd(password, username);
            }
            user.updatedBy = ctx.state['CUR_USER'].id;
            user.updatedAt = Date.now();
            const result = yield typeorm_1.getRepository(user_1.User).save(user);
            return result;
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map