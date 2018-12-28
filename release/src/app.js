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
// koa
const Koa = require("koa");
const KoaLogger = require("koa-logger");
const catch_1 = require("./middlewares/catch");
const index_1 = require("./middlewares/index");
const conectDB_1 = require("./database/conectDB");
const _DEV_ = process.env.NODE_ENV === 'development';
class Application {
    constructor() {
        this.app = new Koa();
        this.init();
    }
    // init middlewares
    init() {
        if (_DEV_) {
            this.app.use(KoaLogger());
        }
        this.app.use(catch_1.default); //catch middldware
        this.app.keys = ['APP_Keys']; // set app keys
        this.app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const path = ctx.request.path;
            console.log(`path: ${path}`);
            if (path === '/') {
                ctx.body = 'Welcome to koa-graphql server.';
            }
            yield next();
            ctx.set('X-Powered-By', 'Keefe');
        }));
        index_1.default(this.app);
    }
    // start app
    start(port) {
        this.app.listen(port, () => {
            console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `);
            conectDB_1.connectDB(); // db start after server running
            conectDB_1.connectMongo(); // connect mongodb
        });
    }
}
exports.default = new Application();
//# sourceMappingURL=app.js.map