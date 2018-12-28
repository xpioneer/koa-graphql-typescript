"use strict";
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
const typeorm_1 = require("typeorm");
const baseModel_1 = require("./baseModel");
let Errors = class Errors extends baseModel_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "host", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "path", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Errors.prototype, "params", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "method", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "origin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "hostname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "headers", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Errors.prototype, "resHeaders", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Errors.prototype, "resData", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Errors.prototype, "time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "protocol", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Errors.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "msg", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Errors.prototype, "client", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], Errors.prototype, "errors", void 0);
Errors = __decorate([
    typeorm_1.Entity()
], Errors);
exports.Errors = Errors;
//# sourceMappingURL=errors.js.map