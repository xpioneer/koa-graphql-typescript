"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crypto = require("crypto");
class Options {
    constructor() {
        this.alg = 'HS256';
        this.typ = 'JWT';
    }
}
function createHmacSigner(thing, secret) {
    let sig = Crypto.createHmac('sha256', secret).update(thing).digest('base64');
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
    let encodedHeader = base64url(toString(header), 'binary');
    let encodedPayload = base64url(toString(payload), encoding);
    return `${encodedHeader}.${encodedPayload}`;
}
// sign jwt
exports.sign = (payload, secret, opts = new Options) => {
    let header = opts;
    if (payload.exp <= 0) {
        throw new Error('the payload.exp must be greater than 0');
    }
    payload.iat = Date.now(); // sign time
    payload.exp = payload.iat + payload.exp; // expire time, become time stamp
    let secretOrKey = secret;
    let encoding = opts.encoding;
    let securedInput = jwtSecuredInput(header, payload, encoding);
    let signature = createHmacSigner(securedInput, secretOrKey);
    const signStr = `${securedInput}.${signature}`;
    return signStr;
};
//# sourceMappingURL=sign.js.map