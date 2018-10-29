import {getManager, getRepository} from "typeorm";
import { Context } from '@core/koa'
import { Chat } from '../entities/qixi'
import {graphql,} from 'graphql'

export default class ChatController {

  static async getAll() {
    return await getManager().find(Chat);
  }


  static async getById(id: string) {
    const chat = await getRepository(Chat).findOne({id})
    // console.log(ctx.query, ctx.params)
    return chat
  }

  static async insert(args: any, ctx: Context) {
    const model = ctx.fields
    console.log(args, model)
    const chat = await getRepository(Chat).findOne()
    return {data: '1111'}
  }

}