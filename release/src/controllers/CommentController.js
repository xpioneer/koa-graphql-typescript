"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const comment_1 = require("../entities/mysql/comment");
const Moment = require("moment");
class CommentController {
    static getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getManager().find(comment_1.Comment);
        });
    }
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield typeorm_1.getRepository(comment_1.Comment).findOne({ id });
            return article;
        });
    }
    static pages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
                take: args.pageSize,
                order: {},
                where: {
                    deletedAt: null
                }
            };
            if (args.description) {
                options.where['description'] = typeorm_1.Like(`%${args.description}%`);
            }
            if (args.createdAt) {
                const date = args.createdAt.map((c) => (Moment(c)).valueOf());
                options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            const pages = yield typeorm_1.getRepository('comment').findAndCount(options);
            return pages;
        });
    }
}
exports.default = CommentController;
//# sourceMappingURL=CommentController.js.map