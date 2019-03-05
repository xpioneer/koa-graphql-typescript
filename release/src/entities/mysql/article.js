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
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var baseEntity_1 = require("./baseEntity");
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Article;
}(baseEntity_1.BaseEntity));
exports.Article = Article;
//# sourceMappingURL=article.js.map