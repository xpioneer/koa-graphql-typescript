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
var CORSOptionsData = /** @class */ (function () {
    function CORSOptionsData() {
        this.allowMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'];
    }
    return CORSOptionsData;
}());
var Cors = function (options) {
    if (options === void 0) { options = new CORSOptionsData(); }
    return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
        var origin, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof options.origin === 'function') {
                        origin = options.origin(ctx); // frequently-used
                    }
                    else {
                        origin = options.origin || ctx.get('Origin') || '*';
                    }
                    if (!(!origin || origin === ctx.origin)) return [3 /*break*/, 2];
                    return [4 /*yield*/, next()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    // Access-Control-Allow-Origin
                    ctx.set('Access-Control-Allow-Origin', origin);
                    if (!(ctx.method === 'OPTIONS')) return [3 /*break*/, 5];
                    if (!!ctx.get('Access-Control-Request-Method')) return [3 /*break*/, 4];
                    return [4 /*yield*/, next()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    // Access-Control-Max-Age
                    if (options.maxAge) {
                        ctx.set('Access-Control-Max-Age', String(options.maxAge));
                    }
                    // Access-Control-Allow-Credentials
                    if (options.credentials === true) {
                        // When used as part of a response to a preflight request,
                        // this indicates whether or not the actual request can be made using credentials.
                        ctx.set('Access-Control-Allow-Credentials', 'true');
                    }
                    // Access-Control-Allow-Methods
                    if (options.allowMethods) {
                        ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
                    }
                    // Access-Control-Allow-Headers
                    if (options.allowHeaders) {
                        ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
                    }
                    else {
                        ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
                    }
                    ctx.status = 204; // No Content(Recommended Use)
                    ctx.body = '';
                    return [3 /*break*/, 9];
                case 5:
                    // Request
                    // Access-Control-Allow-Credentials
                    if (options.credentials === true) {
                        if (origin === '*') {
                            // `credentials` can't be true when the `origin` is set to `*`
                            ctx.remove('Access-Control-Allow-Credentials');
                        }
                        else {
                            ctx.set('Access-Control-Allow-Credentials', 'true');
                        }
                    }
                    // Access-Control-Expose-Headers
                    if (options.exposeHeaders) {
                        ctx.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
                    }
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, next()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    throw err_1;
                case 9: return [2 /*return*/];
            }
        });
    }); };
};
exports.default = Cors;
//# sourceMappingURL=index.js.map