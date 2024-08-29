import { Context } from 'koa'
import LogCtrl from '../controllers/LogsController'
// import * as Koa from 'koa'

export default async (ctx: Context, next: () => Promise<any>) => {
  // console.log('ctx-----------', ctx.header)
  const start = Date.now()
  try {
    await next();
    const status: number = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
    const f = ctx.fields
    const errors =(ctx.body as any).errors
    if(ctx.path === '/graphql' && errors) {
      LogCtrl.ERRlogger(ctx, {
        status: status,
        time: Date.now() - start,
        errors: errors,
        msg: errors[0].message
      }); // error log
    } else {
      LogCtrl.APIlogger(ctx, { time: Date.now() - start }) // api log
    }
  } catch (err) {
    let stack = (err || {}).stack
    try {
      console.log('catch', err, err.status, err.message);
      let status: number = err.status || 500;
      LogCtrl.ERRlogger(ctx, {
        status: status,
        time: Date.now() - start,
        errors: stack.split('\n'),
        msg: err.toString()
      }); // error log
      ctx.status = status;
      if (status === 404) {
        ctx.body = {status: 404, data: null, msg: 'Not Found'};
      } else {
        let msg: string = err.message || err.toString();
        let errors: string = stack ? stack.split('\n') : err.toString();
        ctx.body = {status, data: null, msg, errors};
      }
    } catch (e) {
      let msg: string = e.message || e.toString();
      let errors: string = e.stack ? e.stack.split('\n') : e.toString();
      ctx.status = 500;
      ctx.body = {status: 500, data: null, msg, errors};
    }
  }
};
