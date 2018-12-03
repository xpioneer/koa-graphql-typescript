import * as Crypto from 'crypto';
import {getManager, getRepository, Like, Equal} from "typeorm";
import { Context } from '@core/koa'
import { User } from '../entities/mysql/user'
import { Guid } from "../utils/tools";

const jwt = require('jsonwebtoken')
const Secret = 'koa-grapqhql-secret'

const cryptoPwd = (pwd: string, key: string) => {
  return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
};

export default class AccountController {

  
  //POST
  static async login(ctx: Context) {
    const inputs: any = ctx.fields;
    console.log(inputs, '=====')
    let username = inputs.username;
    let password = inputs.password;
    if ((username && username.length > 0) && (password && password.length > 5)) {
      const result = await getManager().findOne(User, {
        select: ['username', 'nickName', 'sex', 'userType'],
        where: {
          username: username,
          password: cryptoPwd(password, username)
        }
      });
      if(result) {
        const token = jwt.sign({
          data: result,
          exp: 1000 * 60
        }, Secret)
        console.log(result, '----', token)
        ctx.Json({ data: result, token });
      } else {
        ctx.throw(400, '用户名或密码错误！');
      }
      
      // if (result > 0) {
      //   const user = await UserService.getByName(username);
      //   await store.checkLogin(user.id);
      //   ctx.session['CUR_USER'] = user;
      //   ctx.session['AUTH_TOKEN'] = Crypto.randomBytes(32).toString('hex');
      //   ctx.Json({ data: user, msg: ctx.session['AUTH_TOKEN'] });
      // } else {
      //   ctx.Json({ data: result, status: 400, msg: '用户名或密码错误！' });
      // }
    } else {
      ctx.throw(400, '用户名或密码错误！');
    }
  }

  //POST
  static async logout(ctx: Context) {
    // await store.destroy(ctx.session['CUR_USER'].id);
    // delete ctx.session['CUR_USER'];
    // delete ctx.session['AUTH_TOKEN'];
    ctx.Json({ data: 1, msg: '退出成功！' });
  }

}