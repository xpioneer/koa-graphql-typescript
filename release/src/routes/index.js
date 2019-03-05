"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var graphql_1 = require("../core/graphql");
var index_1 = require("../schema/graphql/index");
var DemoController_1 = require("../controllers/DemoController");
var AccountController_1 = require("../controllers/AccountController");
var FileController_1 = require("../controllers/FileController");
var LogsController_1 = require("../controllers/LogsController");
var ServerAPIController_1 = require("../controllers/ServerAPIController");
var _PROD_ = process.env.NODE_ENV === 'production';
var router = new Router();
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
    graphql: _PROD_ ? false : true
}))
    .post('/graphql', graphql_1.KoaGraphql({
    schema: index_1.RootSchema,
}));
exports.default = router;
//# sourceMappingURL=index.js.map