import * as Koa from '@core/koa'
import { ResponseData } from '../models/ResponseData'

const json = (ctx: Koa.Context) => (res: any) => {
  const resData = new ResponseData();
  const type = typeof res;
  if (type === 'object' && res !== null) {
    if(res.hasOwnProperty('data')) {
      resData.data = res.data === undefined ? 'undefined': res.data;
    } else {
      resData.data = res;
    }
    resData.msg = res.msg||"";
  } else {
    resData.msg = `data's type is ${typeof res}`;
    if(type === 'undefined' || type === 'function'){
      resData.data = res.toString();
    } else {
      resData.data = res;
    }
  }
  resData.status = res.status || 200; // resData status code
  let status = resData.status; // http status code
  if (status == 200 && ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
    status = 201;
  }
  ctx.status = status;
  return ctx.body = resData;
};

const page = (ctx: Koa.Context) => (data: any) => {
    let resData = new ResponseData();
    if (typeof data === 'object' && data !== null) {
      resData.data = data.page.rows;
      let per_page = ctx.query.per_page ? ctx.query.per_page*1 : data.page.rows.length;
      resData.meta = {
        total: data.page.count,
        count: data.page.rows.length,
        cur_page: ctx.query.cur_page ? ctx.query.cur_page*1 : 1,
        per_page: per_page,
        total_page: Math.ceil(data.page.count/per_page)
      };
      resData.msg = data.msg||`查询到${resData.meta.count}记录`;
    }
    resData.status = data.status || 200;
    ctx.status = resData.status;
    return ctx.body = resData;
};

const returnData = async (ctx: Koa.Context, next: () => Promise<any>) => {
  if (!ctx.Json){
    ctx.Json = json(ctx);
  }
  if (!ctx.Pages){
    ctx.Pages = page(ctx);
  }
  await next();
};

export default returnData;


// const returnData = async (ctx: any, next: any) => {
//   await next();
// }
// export default returnData;
