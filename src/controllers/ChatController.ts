import {getManager, getRepository} from "typeorm";
import { Chat } from '../entities/qixi'

export default class ChatController {

  static async getAll(ctx: any) {
    const list = await getManager().find(Chat);
    return ctx.Json(list)
  }

}