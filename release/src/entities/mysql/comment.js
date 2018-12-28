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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
let Comment = class Comment extends baseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "client", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "url", void 0);
Comment = __decorate([
    typeorm_1.Entity('comment')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map