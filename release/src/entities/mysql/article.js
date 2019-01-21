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
// import 'reflect-metadata'
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("./baseEntity");
let Article = class Article extends baseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "abstract", void 0);
__decorate([
    typeorm_1.Column({
        type: 'longtext'
    }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ length: 32 }),
    __metadata("design:type", String)
], Article.prototype, "typeId", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], Article.prototype, "isTop", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "pics", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "tag", void 0);
Article = __decorate([
    typeorm_1.Entity('article')
], Article);
exports.Article = Article;
//# sourceMappingURL=article.js.map