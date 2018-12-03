import * as Crypto from 'crypto';
import {getManager, getRepository, Like, Equal} from "typeorm";
import { Context } from '@core/koa'
import { User } from '../entities/mysql/user'
import Store from "../utils/session/store";

const jwt = require('jsonwebtoken')
const Secret = 'koa-grapqhql-secret'
const EXP_TIME = 10 * 60 * 1000

const store = new Store

const cryptoPwd = (pwd: string, key: string) => {
  return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
};

export default class AccountController {
  
  //POST
  static async login(ctx: Context) {
    const inputs: any = ctx.fields;
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
          exp: Math.ceil((Date.now() + EXP_TIME)/1000) // second
        }, Secret)
        await store.set('true', {
          sid: token,
          maxAge: EXP_TIME // millisecond
        })
        ctx.Json({ data: result, token });
      } else {
        ctx.throw(400, '用户名或密码错误！');
      }
    } else {
      ctx.throw(400, '用户名或密码错误！');
    }
  }

  //POST
  static async logout(ctx: Context) {
    const tokens = ctx.header['authorization']
    const token = tokens.split(' ')[1]
    await store.destroy(token)
    ctx.Json({ data: 1, msg: '退出成功！' });
  }

}