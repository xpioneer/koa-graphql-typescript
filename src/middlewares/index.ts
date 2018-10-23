import * as Koa from 'koa'
import Cors from './cors';
import Request from './request';
import Response from './response';
import Routes from '../routes';

const Middlewares = (App: Koa) => {
  // App.use(Cors({}));
  App.use(Request);
  App.use(Response);

  App.use(Routes.routes());//inject routes
};

export default Middlewares;
