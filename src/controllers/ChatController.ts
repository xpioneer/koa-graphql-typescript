import {getManager, getRepository, getMongoManager, getMongoRepository} from "typeorm";
import { Context } from '@core/koa'
import { Chat } from '../entities/qixi'
import { Guid } from "../utils/tools";
import { TestMongo } from '../schema/mongo/test_mongo'

const guid = Guid()

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
    // const result = await test.save()
    // const result = await Test.find({
    //   name: {$regex: '08'},
    //   // _id: false
    // }).select('id name').exec()
    const testMongo = new TestMongo()
    testMongo.name = '日志' + guid.substring(0, 6)
    testMongo.version = 666
    testMongo.id = guid
    testMongo.created_by = guid
    const result = await getMongoManager().save(testMongo);
    console.log(result)
    // const chat = await getRepository(Chat).findOne()
    ctx.Json({data: result})
  }

}