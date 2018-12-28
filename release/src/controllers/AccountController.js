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
const store_1 = require("../utils/session/store");
const constants_1 = require("../constants");
const sign_1 = require("../core/jwt/sign");
const tools_1 = require("../utils/tools");
const store = new store_1.default;
class AccountController {
    //POST
    static login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputs = ctx.fields;
            let username = inputs.username;
            let password = inputs.password;
            if ((username && username.length > 0) && (password && password.length > 5)) {
                const result = yield typeorm_1.getManager().findOne(user_1.User, {
                    select: ['id', 'username', 'nickName', 'sex', 'userType'],
                    where: {
                        username: username,
                        password: tools_1.cryptoPwd(password, username)
                    }
                });
                if (result) {
                    const token = sign_1.sign(Object.assign({}, result, { exp: constants_1.EXP_TIME }), constants_1.JWT_SECRET);
                    yield store.set('true', {
                        sid: token,
                        maxAge: constants_1.EXP_TIME // millisecond
                    });
                    ctx.Json({ data: token });
                }
                else {
                    ctx.throw(400, '用户名或密码错误！');
                }
            }
            else {
                ctx.throw(400, '用户名或密码错误！');
            }
        });
    }
    //POST
    static logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = ctx.header['authorization'];
            const token = tokens.split(' ')[1];
            yield store.destroy(token);
            ctx.Json({ data: 1, msg: '退出成功！' });
        });
    }
}
exports.default = AccountController;
//# sourceMappingURL=AccountController.js.map