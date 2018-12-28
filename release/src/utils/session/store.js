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
const crypto_1 = require("crypto");
const Redis = require("ioredis");
const db_conf_1 = require("../../../conf/db.conf");
// const { Guid } = TOOLS;
class RedisStore {
    constructor() {
        this.redis = new Redis(db_conf_1.RedisConf);
    }
    getID(length) {
        return crypto_1.randomBytes(length).toString('hex');
    }
    get(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.redis.get(sid);
            return JSON.parse(data);
        });
    }
    set(obj, { sid = this.getID(32), maxAge } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.redis.set(sid, JSON.stringify(obj), 'PX', maxAge);
            }
            catch (e) { }
            return sid;
        });
    }
    destroy(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.del(sid);
        });
    }
    checkLogin(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sid = yield this.redis.get(userId);
            if (sid)
                yield this.destroy(sid);
            return sid;
        });
    }
}
exports.default = RedisStore;
//# sourceMappingURL=store.js.map