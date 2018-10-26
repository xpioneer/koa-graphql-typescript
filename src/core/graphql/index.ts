import {
  Source,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
  GraphQLError, GraphQLSchema
} from 'graphql';
import { Request, Response } from 'koa';
import {Context} from '@core/koa'

interface OptionsData {
  schema: GraphQLSchema
  context?: Context
  rootValue?: any
  graphiql?: boolean
}

interface OptionsResult1 {

}

// export type Options =
//   | ((request: Request, response: Response, ctx: Context) => OptionsResult)
//   | OptionsResult;

// export type OptionsResult = OptionsData | Promise<OptionsData>;

// export type OptionsData = {
//   /**
//    * A GraphQL schema from graphql-js.
//    */
//   schema: GraphQLSchema,

//   /**
//    * A value to pass as the context to the graphql() function.
//    */
//   context?: any,

//   /**
//    * An object to pass as the rootValue to the graphql() function.
//    */
//   rootValue?: any,
//   /**
//    * A boolean to optionally enable GraphiQL mode.
//    */
//   graphiql?: boolean,
// };

// type Middleware = (ctx: Context) => Promise<void>;

export const KoaGraphql = (
  options: (
    request: Request,
    response: Response,
    ctx: Context
    ) => OptionsData | Promise<OptionsData>
  ): (ctx: Context) => Promise<void> => {
    
  return async function middleware (ctx: Context): Promise<any> {
    const req = ctx.req;
    const request = ctx.request;
    const response = ctx.response;

    let schema,
      context,
      rootValue,
      pretty,
      graphiql,
      formatErrorFn,
      extensionsFn,
      showGraphiQL,
      query,
      documentAST,
      variables,
      operationName,
      validationRules;
    
    const optionsData: OptionsData = (typeof options === 'function' ? await options(request, response, ctx) : options)

    if (!optionsData || typeof optionsData !== 'object') {
      throw new Error(
        'GraphQL middleware option function must return an options object ' +
          'or a promise which will be resolved to an options object.',
      );
    }

    if (!optionsData.schema) {
      throw new Error('GraphQL middleware options must contain a schema.');
    }

    schema = optionsData.schema;
    context = optionsData.context || ctx;
    rootValue = optionsData.rootValue;
    graphiql = optionsData.graphiql;

    if(!/^(GET|POST)$/.test(ctx.method)) {
      response.set('Allow', 'GET, POST');
      ctx.status = 405;
      ctx.Json({status: 405, msg: 'GraphQL only supports GET and POST requests.'})
      // throw new Error('GraphQL only supports GET and POST requests.');
    }


    ctx.body = ctx.body || ctx.query.query;

  }
}
