"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const postData_1 = require("../core/postData");
const cors_1 = require("./cors");
const request_1 = require("./request");
const response_1 = require("./response");
const routes_1 = require("../routes");
const xJwt_1 = require("./xJwt");
const Middlewares = (App) => {
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