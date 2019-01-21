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
let API = class API extends baseModel_1.BaseEntity {
};
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
exports.API = API;
//# sourceMappingURL=api.js.map