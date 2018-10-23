import {getManager, getRepository} from "typeorm";
import { Chat } from '../entities/qixi'
import {graphql,} from 'graphql'

export default class ChatController {

  static async getAll() {
    return await getManager().find(Chat);
  }

}