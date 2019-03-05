"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sign_1 = require("./sign");
var JsonWebTokenError = /** @class */ (function (_super) {
    __extends(JsonWebTokenError, _super);
    function JsonWebTokenError(msg) {
        var _this = _super.call(this) || this;
        _this.name = 'JsonWebTokenError';
        _this.message = msg;
        return _this;
    }
    return JsonWebTokenError;
}(Error));
// verify is equal
function verifyEqual(thing, sig, secrect) {
    var computeSig = sign_1.createHmacSigner(thing, secrect);
    // console.log('verifyEqual--', computeSig, secrect)
    return computeSig === sig;
}
exports.verify = function (jwtStr, opts) {
    var jwtToken = jwtStr.split(' ')[1]; // "Bearer jwtToken"
    // console.log(jwtStr, '-------',jwtToken)
    if (!/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+){1}$/.test(jwtToken)) {
        throw new JsonWebTokenError('jwt js error format');
    }
    try {
        var jwtTokenArr = jwtToken.split('.');
        var header = JSON.parse(Buffer.from(jwtTokenArr[0], 'base64').toString('binary'));
        var payload = JSON.parse(Buffer.from(jwtTokenArr[1], 'base64').toString(opts.encoding || 'utf-8'));
        var signature = jwtTokenArr[2];
        // check header
        if (header && header.alg !== 'HS256') {
            return [false, 'invalid algorithm'];
        }
        if (header && header.typ !== 'JWT') {
            return [false, 'invalid type'];
        }
        // check payload
        if (payload && typeof payload.exp !== 'number') {
            return [false, 'invalid exp'];
        }
        if (payload && typeof payload.iat !== 'number') {
            return [false, 'invalid iat'];
        }
        // check signature
        if (!signature) {
            return [false, 'invalid signature'];
        }
        // verify jwtString sig
        var isEqual = verifyEqual(jwtTokenArr[0] + '.' + jwtTokenArr[1], signature, opts.secret);
        if (!isEqual) {
            return [false, 'sig verify error'];
        }
        // verify exp
        if (Date.now() >= payload.exp) {
            return [false, 'jwt expired'];
        }
        return [true, payload];
    }
    catch (e) {
        throw new JsonWebTokenError(e.message || 'jwt verify error');
    }
};
//# sourceMappingURL=verify.js.map