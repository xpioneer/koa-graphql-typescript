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
const graphql_1 = require("graphql");
const demo_1 = require("../schema/demo");
const index_1 = require("../utils/tools/index");
exports.world = (ctx) => __awaiter(this, void 0, void 0, function* () {
    yield index_1.Delay(1000);
    ctx.Json('world');
});
exports.MyGraphql = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const params = ctx.body;
    console.log(ctx.body, ctx.params, ctx.query);
    const source = new graphql_1.Source(ctx.query, 'GraphQL request');
    console.log('source: ', source);
    const result = yield graphql_1.graphql(demo_1.schema, ctx.query.query);
    const err = result.errors || [];
    for (let i = 0; i < err.length; i++) {
        console.log('err: ', i, err[i].message, err[i].locations, err[i].stack);
    }
    // console.log('graphql: ', result.data, Object.prototype.toString.call(err))
    ctx.Json({ data: result.data, errors: err.length > 0 ? err[0].stack.split('\n') : undefined });
});
//# sourceMappingURL=graphql.js.map