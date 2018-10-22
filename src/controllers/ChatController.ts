import {getManager, getRepository} from "typeorm";
import { Chat } from '../entities/qixi'

export default class ChatController {

  static async getAll() {
    return await getManager().find(Chat);
  }

}