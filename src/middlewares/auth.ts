import { Context } from '@core/koa'

const PROD = process.env.NODE_ENV === "production";

const notAuthPath = ['/api/login']

export default async(ctx: Context, next: () => Promise<any>) => {
  const method = ctx.method || 'POST';
  // const cur_user =  ctx.session['CUR_USER'];
  // const auth_token =  ctx.session['AUTH_TOKEN'];
  
  // if(!PROD && ctx.query['nologin'] == 99) { // only development mode 
  //   await next();
  // } else {
  //   if (notAuthPath.some(path => path === ctx.path) && method === 'POST') {
  //     await next();
  //   } else {
  //     let key = ctx.header['Authorization-User']
  //       || ctx.header['authorization-user']
  //       || ctx.query['Authorization-User'];
      
  //     if (cur_user && ctx.url.match(/^\/(api|uploads)\//)) { // logon users(api/uploads) verify
  //       if (key && key.length === 64 && auth_token === key) {
  //         if (method !== 'GET'
  //           && cur_user.user_type == 9
  //           && !(ctx.path === '/api/logout')) { // demo users only use get, except logout
  //           ctx.throw(403, '禁止访问！');
  //         }
  //         await next();
  //       } else { // wrong user
  //         ctx.session = {};
  //         ctx.throw(401);
  //       }
  //     } else { // throw 401
  //       ctx.session = {};
  //       ctx.throw(401);
  //     }
  //   }
  // }

  await next()
}