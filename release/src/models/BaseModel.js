"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../utils/tools");
class BaseModel {
    constructor() {
        this._id = tools_1.Guid();
        this._created_at = Date.now();
        this.version = 0;
    }
    // id: string
    get id() { return this._id; }
    set id(_id) { this._id = _id; }
    get created_at() { return this._created_at; }
    set created_at(_created_at) { this._created_at = _created_at; }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map