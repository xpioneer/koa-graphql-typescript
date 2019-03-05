"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var postData_1 = require("../core/postData");
var cors_1 = require("./cors");
var request_1 = require("./request");
var response_1 = require("./response");
var routes_1 = require("../routes");
// import JWT from './jwt'
var xJwt_1 = require("./xJwt");
var Middlewares = function (App) {
    App.use(postData_1.default);
    App.use(xJwt_1.default);
    App.use(auth_1.default);
    App.use(cors_1.default);
    App.use(request_1.default);
    App.use(response_1.default);
    App.use(routes_1.default.routes()); //inject routes
};
exports.default = Middlewares;
//# sourceMappingURL=index.js.map