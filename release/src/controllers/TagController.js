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
const tag_1 = require("../entities/mysql/tag");
const tools_1 = require("../utils/tools");
const Moment = require("moment");
const constants_1 = require("../constants");
class TagController {
    static getAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            return yield typeorm_1.getManager().find(tag_1.Tag);
        });
    }
    static getById(id = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield typeorm_1.getRepository(tag_1.Tag).findOne({ id });
            return tag;
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
            if (args.name) {
                options.where['name'] = typeorm_1.Like(`%${args.name}%`);
            }
            if (args.createdAt) {
                const date = args.createdAt.map((c) => (Moment(c)).valueOf());
                options.where['createdAt'] = typeorm_1.Between(date[0], date[1]);
            }
            if (args.order) {
                options.order = Object.assign(options.order, args.order);
            }
            const pages = yield typeorm_1.getRepository(tag_1.Tag).findAndCount(options);
            return pages;
        });
    }
    static insert(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args.name || args.name.length < 1) {
                ctx.throw(400, '标签名称长度必须大于1');
            }
            let model = new tag_1.Tag();
            model.id = tools_1.Guid();
            model.name = args.name;
            model.remark = args.remark;
            model.createdAt = Date.now();
            model.createdBy = ctx.state[constants_1.JWT_KEY].id;
            model.updatedAt = Date.now();
            model.updatedBy = ctx.state[constants_1.JWT_KEY].id;
            const result = yield typeorm_1.getRepository(tag_1.Tag).save(model);
            return result;
        });
    }
    static update(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args.name || args.name.length < 1) {
                ctx.throw(400, '标签名称长度必须大于1');
            }
            let model = new tag_1.Tag();
            model.id = args.id;
            model.name = args.name;
            model.remark = args.remark;
            model.updatedAt = Date.now();
            model.updatedBy = ctx.state[constants_1.JWT_KEY].id;
            const result = yield typeorm_1.getRepository(tag_1.Tag).save(model);
            return result;
        });
    }
}
exports.default = TagController;
//# sourceMappingURL=TagController.js.map