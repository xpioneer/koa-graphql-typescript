import {getManager, getRepository} from "typeorm";
import { Context } from '@core/koa'
import { Chat } from '../entities/qixi'
import { Schema, model } from 'mongoose'
import { Guid } from "../utils/tools";

const TestSchema = new Schema({
  name: String,
  id: String
})


const Test = model('tb_test', TestSchema)

const guid = Guid()
const test = new Test({name: 'test' + guid.substring(0, 5), id: guid})

export default class ChatController {

  static async getAll(ctx: any) {
    const list = await getManager().find(Chat);
    return ctx.Json(list)
  }


  static async getById(ctx: Context) {
    const id = ctx.params.id;
    const chat = await getRepository(Chat).findOne({id})
    ctx.Json({data: chat, result: {id:123}});
  }

  static async testLog(ctx: Context) {
    // const r = await test.save()
    const result = await Test.find({
      name: {$regex: '08'}
    }).select('id name').exec()
    console.log(result)
    // const chat = await getRepository(Chat).findOne()
    ctx.Json({data: result, r: {r:123}})
  }

}