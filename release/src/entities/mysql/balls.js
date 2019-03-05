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
let Balls = class Balls extends baseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Balls.prototype, "issue", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red3", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red4", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red5", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "red6", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "blue", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Balls.prototype, "happySun", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "pool", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "prizeOne", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "prizeOneNum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "prizeTwo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "prizeTwoNum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "bettingNum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "drawDate", void 0);
Balls = __decorate([
    typeorm_1.Entity('doubleColorBall')
], Balls);
exports.Balls = Balls;
//# sourceMappingURL=balls.js.map