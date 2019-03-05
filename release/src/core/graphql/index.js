"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var renderGraphQL_1 = require("./renderGraphQL");
exports.KoaGraphql = function (options
// Promise<OptionsData>
) {
    return function middleware(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var req, request, response, schema, context, rootValue, pretty, graphql, formatErrorFn, extensionsFn, showGraphQL, query, documentAST, variables, operationName, validationRules, result, optionsData, params, error_1, payload, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = ctx.req;
                        request = ctx.request;
                        response = ctx.response;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        optionsData = (typeof options === 'function' ? options(request, response, ctx) : options);
                        if (!optionsData || typeof optionsData !== 'object') {
                            throw new Error('GraphQL middleware option function must return an options object ' +
                                'or a promise which will be resolved to an options object.');
                        }
                        if (!optionsData.schema) {
                            throw new Error('GraphQL middleware options must contain a schema.');
                        }
                        schema = optionsData.schema;
                        context = optionsData.context || ctx;
                        rootValue = optionsData.rootValue;
                        graphql = optionsData.graphql;
                        formatErrorFn = optionsData.formatError;
                        if (!/^(GET|POST)$/.test(ctx.method)) {
                            response.set('Allow', 'GET, POST');
                            ctx.status = 405;
                            ctx.Json({ status: 405, msg: 'GraphQL only supports GET and POST requests.' });
                            // throw new Error('GraphQL only supports GET and POST requests.');
                        }
                        params = ctx.method === 'GET' ? ctx.query : ctx.fields;
                        query = params.query;
                        variables = params.variables;
                        operationName = params.operationName;
                        showGraphQL = graphql && canDisplayGraphQL(request, params);
                        console.log('\n');
                        console.log('ctx graphql params: ', params);
                        console.log('\n');
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (!query) {
                                    if (showGraphQL) {
                                        return resolve(null);
                                    }
                                    ctx.throw(400, "'query' must be required.");
                                }
                                // GraphQL source.
                                var source = new graphql_1.Source(query, 'GraphQL request');
                                // Parse source to AST, reporting any syntax error.
                                try {
                                    documentAST = graphql_1.parse(source);
                                }
                                catch (syntaxError) {
                                    // Return 400: Bad Request if any syntax errors errors exist.
                                    response.status = 400;
                                    return resolve({ errors: [syntaxError] });
                                }
                                // Validate AST, reporting any errors.
                                var validationErrors = graphql_1.validate(schema, documentAST, validationRules);
                                if (validationErrors.length > 0) {
                                    // Return 400: Bad Request if any validation errors exist.
                                    response.status = 400;
                                    return resolve({ errors: validationErrors });
                                }
                                if (request.method === 'GET') {
                                    // Determine if this GET request will perform a non-query.
                                    var operationAST = graphql_1.getOperationAST(documentAST, operationName);
                                    if (operationAST && operationAST.operation !== 'query') {
                                        // If GraphQL can be shown, do not perform this query, but
                                        // provide it to GraphQL so that the requester may perform it
                                        // themselves if desired.
                                        if (showGraphQL) {
                                            return resolve(null);
                                        }
                                        // Otherwise, report a 405: Method Not Allowed error.
                                        response.set('Allow', 'POST');
                                        ctx.throw(405, "Can only perform a " + operationAST.operation + " operation " +
                                            'from a POST request.');
                                    }
                                }
                                try {
                                    resolve(graphql_1.execute(schema, documentAST, rootValue, context, variables, operationName));
                                }
                                catch (contextError) {
                                    // Return 400: Bad Request if any execution context errors exist.
                                    response.status = 400;
                                    resolve({ errors: [contextError] });
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // If an error was caught, report the httpError status, or 500.
                        response.status = error_1.status || 500;
                        result = { errors: [error_1] };
                        return [3 /*break*/, 4];
                    case 4:
                        if (result && result.data === null) {
                            response.status = 500;
                        }
                        // Format any encountered errors.
                        if (result && result.errors) {
                            result.errors = result.errors.map(function (err) { return (formatErrorFn ? formatErrorFn(err, context) : graphql_1.formatError(err)); });
                        }
                        // If allowed to show GraphQL, present it instead of JSON.
                        if (showGraphQL) {
                            payload = renderGraphQL_1.renderGraphQL();
                            response.type = 'text/html';
                            response.body = payload;
                        }
                        else {
                            payload = pretty ? JSON.stringify(result, null, 2) : result;
                            response.type = 'application/json';
                            response.body = payload;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
};
/**
 * Helper function to determine if GraphQL can be displayed.
 */
function canDisplayGraphQL(request, params) {
    // If `raw` exists, GraphQL mode is not enabled.
    // Allowed to show GraphQL if not requested as raw and this request
    // prefers HTML over JSON.
    return !params.raw && request.accepts(['json', 'html']) === 'html';
}
//# sourceMappingURL=index.js.map