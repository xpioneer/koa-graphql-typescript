import * as Crypto from 'crypto';
import {getManager, getRepository, Like, Equal} from "typeorm";
import { Context } from '@/core/koa'
import { User } from '@/entities/mysql/user'
import Store from "@/utils/session/store";
import { JWT_SECRET, EXP_TIME } from '../constants'
import { sign } from '../core/jwt/sign'
import { cryptoPwd, formatDate, Guid } from "../utils/tools"
import { useBlogRepository } from '../database/dbUtils';
import { UserType } from '@/types/base'
import { UserLogin } from '@/types/user';

class AccountController {

  private verifyNameAndPwd(username: string, password: string) {
    if(!username || !password || password?.length < 6)
      throw 'Incorrect username or password'
  }
  
  //POST
  async login(ctx: Context) {
    const inputs: any = ctx.fields;
    let username = inputs.username;
    let password = inputs.password;
    if ((username && username.length > 0) && (password && password.length > 5)) {
      const result = await useBlogRepository(User).findOne({
        select: ['id', 'username', 'nickName', 'sex', 'userType'],
        where: {
          username: username,
          password: cryptoPwd(password, username)
        }
      });
      if(result) {
        const token = sign({ ...result, exp: EXP_TIME }, JWT_SECRET)
        await Store.set('true', {
          sid: token,
          maxAge: EXP_TIME // millisecond
        })
        ctx.Json({ data: token });
      } else {
        ctx.throw(400, '用户名或密码错误！');
      }
    } else {
      ctx.throw(400, '用户名或密码错误！');
    }
  }

  //POST
  async logout(ctx: Context) {
    const tokens = ctx.header['authorization']
    const token = tokens.split(' ')[1]
    await Store.destroy(token)
    ctx.Json({ data: 1, msg: '退出成功！' });
  }


  //POST
  async register(ctx: Context<UserLogin>) {
    const inputs = ctx.fields;
    let username = inputs.username;
    let password = inputs.password;
    if ((username && username.length > 0) && (password && password.length > 5)) {
      const model = new User
      model.id = Guid()
      model.username = username
      model.password = cryptoPwd(password, username)
      model.userType = UserType.normal
      model.createdAt = Date.now()
      model.createdBy = model.id
      model.updatedAt = Date.now()
      model.updatedBy = model.id
      const result = await useBlogRepository(User).save(model)
      if(result) {
        ctx.Json({ data: 1 });
      } else {
        ctx.throw(400, '注册失败！');
      }
    } else {
      ctx.throw(400, '用户名或密码格式错误！');
    }
  }

}

export default new AccountController