// import * as Koa from '@core/koa'
// import { ResponseData } from '@src/models/ResponseData'

// const json = (ctx: Koa.Context) => (data: any) => {
//   const responseData = new ResponseData();
//   if (typeof data === 'object' && data !== null) {
//     responseData.data = data.data === undefined ? 'undefined': data.data;
//     responseData.msg = data.msg||"";
//   } else {
//     responseData.data = typeof data === 'function' ? data.toString() : data;
//     // responseData.msg = `data's type is ${typeof data}`;
//     responseData.msg = "data's type is not an empty object or arrary";
//   }
//   responseData.status = data.status || 200;
//   let status = responseData.status;
//   if (status == 200 && ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
//     status = 201;
//   }
//   ctx.status = status;
//   return ctx.body = responseData;
// };

// const page = (ctx: Koa.Context) => (data: any) => {
//     let responseData = new ResponseData();
//     if (typeof data === 'object' && data !== null) {
//       responseData.data = data.page.rows;
//       let per_page = ctx.query.per_page ? ctx.query.per_page*1 : data.page.rows.length;
//       responseData.meta = {
//         total: data.page.count,
//         count: data.page.rows.length,
//         cur_page: ctx.query.cur_page ? ctx.query.cur_page*1 : 1,
//         per_page: per_page,
//         total_page: Math.ceil(data.page.count/per_page)
//       };
//       responseData.msg = data.msg||`查询到${responseData.meta.count}记录`;
//     }
//     responseData.status = data.status || 200;
//     ctx.status = responseData.status;
//     return ctx.body = responseData;
// };

// const returnData = async (ctx: Koa.Context, next: () => Promise<any>) => {
//   if (!ctx.Json){
//     ctx.Json = json(ctx);
//   }
//   if (!ctx.Pages){
//     ctx.Pages = page(ctx);
//   }
//   await next();
// };

// export default returnData;


const returnData = async (ctx: any, next: any) => {
  await next();
}
export default returnData;
