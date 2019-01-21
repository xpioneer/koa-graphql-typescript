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
let Balls = class Balls extends baseEntity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.r1 = 0;
        this.r2 = 0;
        this.r3 = 0;
        this.r4 = 0;
        this.r5 = 0;
        this.r6 = 0;
        this.r7 = 0;
        this.r8 = 0;
        this.r9 = 0;
        this.r10 = 0;
        this.r11 = 0;
        this.r12 = 0;
        this.r13 = 0;
        this.r14 = 0;
        this.r15 = 0;
        this.r16 = 0;
        this.r17 = 0;
        this.r18 = 0;
        this.r19 = 0;
        this.r20 = 0;
        this.r21 = 0;
        this.r22 = 0;
        this.r23 = 0;
        this.r24 = 0;
        this.r25 = 0;
        this.r26 = 0;
        this.r27 = 0;
        this.r28 = 0;
        this.r29 = 0;
        this.r30 = 0;
        this.r31 = 0;
        this.r32 = 0;
        this.r33 = 0;
        this.b1 = 0;
        this.b2 = 0;
        this.b3 = 0;
        this.b4 = 0;
        this.b5 = 0;
        this.b6 = 0;
        this.b7 = 0;
        this.b8 = 0;
        this.b9 = 0;
        this.b10 = 0;
        this.b11 = 0;
        this.b12 = 0;
        this.b13 = 0;
        this.b14 = 0;
        this.b15 = 0;
        this.b16 = 0;
    }
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
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r3", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r4", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r5", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r6", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r7", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r8", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r9", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r10", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r11", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r12", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r13", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r14", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r15", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r16", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r17", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r18", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r19", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r20", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r21", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r22", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r23", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r24", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r25", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r26", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r27", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r28", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r29", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r30", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r31", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r32", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "r33", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b3", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b4", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b5", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b6", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b7", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b8", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b9", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b10", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b11", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b12", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b13", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b14", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b15", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Balls.prototype, "b16", void 0);
Balls = __decorate([
    typeorm_1.Entity('doubleColorBall')
], Balls);
exports.Balls = Balls;
//# sourceMappingURL=balls.js.map