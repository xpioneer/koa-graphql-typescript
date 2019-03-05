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
var user_1 = require("../entities/mysql/user");
var tools_1 = require("../utils/tools");
var Moment = require("moment");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getAll = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getManager().find(user_1.User)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.getById = function (id) {
        if (id === void 0) { id = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(user_1.User).findOne({ id: id }, {
                            select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
                        })];
                    case 1:
                        article = _a.sent();
                        return [2 /*return*/, article];
                }
            });
        });
    };
    UserController.pages = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var options, date, pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(args, 'query args ===================');
                        options = {
                            skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                            take: args.pageSize,
                            order: {},
                            where: {
                                deletedAt: null
                            },
                            select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'sex', 'remark']
                        };
                        if (args.username) {
                            options.where['username'] = typeorm_1.Like("%" + args.username + "%");
                        }
                        if (args.nickName) {
                            options.where['nickName'] = typeorm_1.Like("%" + args.nickName + "%");
                        }
                        if (args.userType >= 0) {
                            options.where['userType'] = typeorm_1.Equal(args.userType);
                        }
                        if (args.createdAt) {
                            date = args.createdAt.map(function (c) { return (Moment(c)).valueOf(); });
                            options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
                        }
                        if (args.order) {
                            options.order = Object.assign(options.order, args.order);
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(user_1.User).findAndCount(options)];
                    case 1:
                        pages = _a.sent();
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    UserController.insert = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, model, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = args.username;
                        password = args.password;
                        if (!(username && username.length > 2)) {
                            ctx.throw(400, '用户名长度必须大于1个字符');
                        }
                        if (!(password && password.length > 5)) {
                            ctx.throw(400, '用户密码长度必须大于6个字符');
                        }
                        model = new user_1.User();
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
                        return [4 /*yield*/, typeorm_1.getRepository(user_1.User).save(model)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserController.update = function (args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = args.username;
                        password = args.password;
                        if (!(username && username.length > 2)) {
                            ctx.throw(400, '用户名长度必须大于1个字符');
                        }
                        if (password && password.length > 0 && password.length < 6) {
                            ctx.throw(400, '用户密码长度必须大于6个字符');
                        }
                        user = new user_1.User;
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
                        return [4 /*yield*/, typeorm_1.getRepository(user_1.User).save(user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map