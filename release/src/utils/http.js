"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const $http = axios_1.default.create({
    baseURL: "",
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials: true,
    responseType: 'json',
    timeout: 30000
});
$http.interceptors.request.use(config => {
    // console.log('$http', config)
    return config;
}, error => {
    return Promise.reject(error);
});
$http.interceptors.response.use(response => {
    return Promise.resolve(response.data);
}, error => {
    return Promise.reject(error.response);
});
exports.default = $http;
//# sourceMappingURL=http.js.map