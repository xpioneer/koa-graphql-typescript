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
// koa
var Koa = require("koa");
var KoaLogger = require("koa-logger");
var catch_1 = require("./middlewares/catch");
var index_1 = require("./middlewares/index");
var conectDB_1 = require("./database/conectDB");
var _DEV_ = process.env.NODE_ENV === 'development';
var Application = /** @class */ (function () {
    function Application() {
        this.app = new Koa();
        this.init();
    }
    // init middlewares
    Application.prototype.init = function () {
        var _this = this;
        if (_DEV_) {
            this.app.use(KoaLogger());
        }
        this.app.use(catch_1.default); //catch middldware
        this.app.keys = ['APP_Keys']; // set app keys
        this.app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = ctx.request.path;
                        console.log("path: " + path);
                        if (path === '/') {
                            ctx.body = 'Welcome to koa-graphql server.';
                        }
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        ctx.set('X-Powered-By', 'Keefe');
                        return [2 /*return*/];
                }
            });
        }); });
        index_1.default(this.app);
    };
    // start app
    Application.prototype.start = function (port) {
        this.app.listen(port, function () {
            console.log("Koa server has started, running with: http://127.0.0.1:" + port + ". ");
            conectDB_1.connectDB(); // db start after server running
            conectDB_1.connectMongo(); // connect mongodb
        });
    };
    return Application;
}());
exports.default = new Application();
//# sourceMappingURL=app.js.map