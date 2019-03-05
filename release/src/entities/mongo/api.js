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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var baseModel_1 = require("./baseModel");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "host", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "path", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Object)
    ], API.prototype, "params", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "method", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "origin", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "hostname", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Object)
    ], API.prototype, "headers", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Object)
    ], API.prototype, "resHeaders", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Object)
    ], API.prototype, "resData", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], API.prototype, "time", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "protocol", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], API.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "msg", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], API.prototype, "client", void 0);
    API = __decorate([
        typeorm_1.Entity('api')
    ], API);
    return API;
}(baseModel_1.BaseEntity));
exports.API = API;
//# sourceMappingURL=api.js.map