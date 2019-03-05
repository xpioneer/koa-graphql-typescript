"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("../utils/tools");
var BaseModel = /** @class */ (function () {
    function BaseModel() {
        this._id = tools_1.Guid();
        this._created_at = Date.now();
        this.version = 0;
    }
    Object.defineProperty(BaseModel.prototype, "id", {
        // id: string
        get: function () { return this._id; },
        set: function (_id) { this._id = _id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseModel.prototype, "created_at", {
        get: function () { return this._created_at; },
        set: function (_created_at) { this._created_at = _created_at; },
        enumerable: true,
        configurable: true
    });
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map