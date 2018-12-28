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
class CORSOptionsData {
    constructor() {
        this.allowMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'];
    }
}
const Cors = (options = new CORSOptionsData()) => {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let origin;
        if (typeof options.origin === 'function') {
            origin = options.origin(ctx); // frequently-used
        }
        else {
            origin = options.origin || ctx.get('Origin') || '*';
        }
        if (!origin || origin === ctx.origin) {
            return yield next();
        }
        // Access-Control-Allow-Origin
        ctx.set('Access-Control-Allow-Origin', origin);
        if (ctx.method === 'OPTIONS') {
            // Preflight Request
            if (!ctx.get('Access-Control-Request-Method')) {
                return yield next();
            }
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
        }
        else {
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
            try {
                yield next();
            }
            catch (err) {
                throw err;
            }
        }
    });
};
exports.default = Cors;
//# sourceMappingURL=index.js.map