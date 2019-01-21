"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_mongo_1 = require("./test_mongo");
const api_1 = require("./api");
const errors_1 = require("./errors");
exports.MongoEntities = [
    test_mongo_1.TestMongo,
    api_1.API,
    errors_1.Errors
];
exports.default = {
    TestMongo: test_mongo_1.TestMongo,
    API: api_1.API,
    Errors: errors_1.Errors
};
//# sourceMappingURL=index.js.map