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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../utils/session/store");
var constants_1 = require("../constants");
var store = new store_1.default;
exports.default = (function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var method, path, token, authorized, fields, USER_TYPE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                method = ctx.method;
                path = ctx.path;
                if (!constants_1.NO_AUTH_URLS.some(function (urlReg) { return urlReg[0].test(path) && urlReg[1].test(method); })) return [3 /*break*/, 2];
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [3 /*break*/, 8];
            case 2:
                token = ctx.header['authorization'].split(' ')[1] || '' // after jwt, token must exist
                ;
                return [4 /*yield*/, store.get(token)];
            case 3:
                authorized = _a.sent();
                if (!authorized) return [3 /*break*/, 7];
                fields = ctx.fields;
                USER_TYPE = ctx.state[constants_1.JWT_KEY].userType;
                if (!(method === 'GET' || // all get, pass
                    USER_TYPE !== 9 || // not demo user, pass
                    (USER_TYPE === 9 && constants_1.NO_AUTH_URLS.some(function (urlReg) { return urlReg[0].test(path) && urlReg[1].test(method); })) || // demo user, but not auth urls, pass
                    (path === '/graphql' && !/^\smutation\s/.test(fields.query)) || // grahpql not mutation, pass
                    (USER_TYPE === 9 && path === '/api/logout')) // demo use logout, pass
                ) return [3 /*break*/, 5]; // demo use logout, pass
                return [4 /*yield*/, next()];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                ctx.throw(403, '测试用户禁止访问！');
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                ctx.throw(401);
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=auth.js.map