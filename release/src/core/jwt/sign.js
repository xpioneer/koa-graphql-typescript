"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = require("crypto");
var Options = /** @class */ (function () {
    function Options() {
        this.alg = 'HS256';
        this.typ = 'JWT';
    }
    return Options;
}());
function createHmacSigner(thing, secret) {
    var sig = Crypto.createHmac('sha256', secret).update(thing).digest('base64');
    return sig.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
exports.createHmacSigner = createHmacSigner;
function toString(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    if (typeof obj === 'number') {
        return obj.toString();
    }
    if (Buffer.isBuffer(obj)) {
        return obj.toString();
    }
    return JSON.stringify(obj);
}
function base64url(string, encoding) {
    return Buffer
        .from(string, encoding)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
function jwtSecuredInput(header, payload, encoding) {
    encoding = encoding || 'utf8';
    var encodedHeader = base64url(toString(header), 'binary');
    var encodedPayload = base64url(toString(payload), encoding);
    return encodedHeader + "." + encodedPayload;
}
// sign jwt
exports.sign = function (payload, secret, opts) {
    if (opts === void 0) { opts = new Options; }
    var header = opts;
    if (payload.exp <= 0) {
        throw new Error('the payload.exp must be greater than 0');
    }
    payload.iat = Date.now(); // sign time
    payload.exp = payload.iat + payload.exp; // expire time, become time stamp
    var secretOrKey = secret;
    var encoding = opts.encoding;
    var securedInput = jwtSecuredInput(header, payload, encoding);
    var signature = createHmacSigner(securedInput, secretOrKey);
    var signStr = securedInput + "." + signature;
    return signStr;
};
//# sourceMappingURL=sign.js.map