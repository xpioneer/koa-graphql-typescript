import * as Koa from 'koa'
import Session from '../utils/session'
import Store from "../utils/session/store";
import KoaBody from '../core/postData'
import Cors from './cors';
import Request from './request';
import Response from './response';
import Routes from '../routes';

const Middlewares = (App: Koa) => {
  // App.use(Session({
  //   key: 'SESSION_ID',
  //   store: new Store(),
  //   signed: true,
  //   maxAge: 1000 * 60 * 60,
  // }))
  App.use(KoaBody)
  App.use(Cors);
  App.use(Request);
  App.use(Response);

  App.use(Routes.routes());//inject routes
};

export default Middlewares;
