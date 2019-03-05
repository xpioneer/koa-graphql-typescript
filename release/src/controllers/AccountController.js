"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var store_1 = require("../utils/session/store");
var constants_1 = require("../constants");
var sign_1 = require("../core/jwt/sign");
var tools_1 = require("../utils/tools");
var store = new store_1.default;
var AccountController = /** @class */ (function () {
    function AccountController() {
    }
    //POST
    AccountController.login = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, username, password, result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs = ctx.fields;
                        username = inputs.username;
                        password = inputs.password;
                        if (!((username && username.length > 0) && (password && password.length > 5))) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getManager().findOne(user_1.User, {
                                select: ['id', 'username', 'nickName', 'sex', 'userType'],
                                where: {
                                    username: username,
                                    password: tools_1.cryptoPwd(password, username)
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        token = sign_1.sign(__assign({}, result, { exp: constants_1.EXP_TIME }), constants_1.JWT_SECRET);
                        return [4 /*yield*/, store.set('true', {
                                sid: token,
                                maxAge: constants_1.EXP_TIME // millisecond
                            })];
                    case 2:
                        _a.sent();
                        ctx.Json({ data: token });
                        return [3 /*break*/, 4];
                    case 3:
                        ctx.throw(400, '用户名或密码错误！');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ctx.throw(400, '用户名或密码错误！');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //POST
    AccountController.logout = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokens = ctx.header['authorization'];
                        token = tokens.split(' ')[1];
                        return [4 /*yield*/, store.destroy(token)];
                    case 1:
                        _a.sent();
                        ctx.Json({ data: 1, msg: '退出成功！' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return AccountController;
}());
exports.default = AccountController;
//# sourceMappingURL=AccountController.js.map