"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const graphql_1 = require("../core/graphql");
const index_1 = require("../schema/graphql/index");
const DemoController_1 = require("../controllers/DemoController");
const AccountController_1 = require("../controllers/AccountController");
const FileController_1 = require("../controllers/FileController");
const LogsController_1 = require("../controllers/LogsController");
const ServerAPIController_1 = require("../controllers/ServerAPIController");
const router = new Router();
router
    .post('/api/login', AccountController_1.default.login)
    .post('/api/logout', AccountController_1.default.logout)
    .get('/view/:site', DemoController_1.default.views)
    .post('/api/compose', DemoController_1.default.compose)
    .post('/platform/*', ServerAPIController_1.default.KDJZ)
    .get('/api/log-api', LogsController_1.default.apiPages)
    .get('/api/log-errors', LogsController_1.default.errorsPages)
    .post('/api/upload', FileController_1.default.upload)
    .get('/graphql', graphql_1.KoaGraphql({
    schema: index_1.RootSchema,
    graphql: true
}))
    .post('/graphql', graphql_1.KoaGraphql({
    schema: index_1.RootSchema,
}));
exports.default = router;
//# sourceMappingURL=index.js.map