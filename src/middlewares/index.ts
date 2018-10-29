import * as Koa from 'koa'
import Catch from './catch'
import KoaBody from '../core/postData'
import Cors from './cors';
import Request from './request';
import Response from './response';
import Routes from '../routes';

const Middlewares = (App: Koa) => {
  App.use(Catch)
  App.use(KoaBody)
  // App.use(Cors({}));
  App.use(Request);
  App.use(Response);

  App.use(Routes.routes());//inject routes
};

export default Middlewares;
