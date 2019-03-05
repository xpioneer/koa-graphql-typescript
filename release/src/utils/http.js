"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var $http = axios_1.default.create({
    baseURL: "",
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials: true,
    responseType: 'json',
    timeout: 30000
});
$http.interceptors.request.use(function (config) {
    // console.log('$http', config)
    return config;
}, function (error) {
    return Promise.reject(error);
});
$http.interceptors.response.use(function (response) {
    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error.response);
});
exports.default = $http;
//# sourceMappingURL=http.js.map