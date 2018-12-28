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
const renderGraphQL_1 = require("./renderGraphQL");
exports.KoaGraphql = (options
// Promise<OptionsData>
) => {
    return function middleware(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = ctx.req; // node request
            const request = ctx.request; // koa request
            const response = ctx.response; // koa response
            let schema, context, rootValue, pretty, graphql, formatErrorFn, extensionsFn, showGraphQL, query, documentAST, variables, operationName, validationRules, result;
            try {
                const optionsData = (typeof options === 'function' ? options(request, response, ctx) : options);
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
                // ctx.body = ctx.body || ctx.query.query;
                // get graphql params
                const params = ctx.method === 'GET' ? ctx.query : ctx.fields;
                query = params.query;
                variables = params.variables;
                operationName = params.operationName;
                showGraphQL = graphql && canDisplayGraphQL(request, params);
                console.log('\n');
                console.log('ctx graphql params: ', params);
                console.log('\n');
                result = yield new Promise((resolve, reject) => {
                    if (!query) {
                        if (showGraphQL) {
                            return resolve(null);
                        }
                        ctx.throw(400, `'query' must be required.`);
                    }
                    // GraphQL source.
                    const source = new graphql_1.Source(query, 'GraphQL request');
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
                    const validationErrors = graphql_1.validate(schema, documentAST, validationRules);
                    if (validationErrors.length > 0) {
                        // Return 400: Bad Request if any validation errors exist.
                        response.status = 400;
                        return resolve({ errors: validationErrors });
                    }
                    if (request.method === 'GET') {
                        // Determine if this GET request will perform a non-query.
                        const operationAST = graphql_1.getOperationAST(documentAST, operationName);
                        if (operationAST && operationAST.operation !== 'query') {
                            // If GraphQL can be shown, do not perform this query, but
                            // provide it to GraphQL so that the requester may perform it
                            // themselves if desired.
                            if (showGraphQL) {
                                return resolve(null);
                            }
                            // Otherwise, report a 405: Method Not Allowed error.
                            response.set('Allow', 'POST');
                            ctx.throw(405, `Can only perform a ${operationAST.operation} operation ` +
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
                });
            }
            catch (error) {
                // If an error was caught, report the httpError status, or 500.
                response.status = error.status || 500;
                result = { errors: [error] };
            }
            if (result && result.data === null) {
                response.status = 500;
            }
            // Format any encountered errors.
            if (result && result.errors) {
                result.errors = result.errors.map(err => (formatErrorFn ? formatErrorFn(err, context) : graphql_1.formatError(err)));
            }
            // If allowed to show GraphQL, present it instead of JSON.
            if (showGraphQL) {
                const payload = renderGraphQL_1.renderGraphQL();
                response.type = 'text/html';
                response.body = payload;
            }
            else {
                // Otherwise, present JSON directly.
                const payload = pretty ? JSON.stringify(result, null, 2) : result;
                response.type = 'application/json';
                response.body = payload;
            }
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