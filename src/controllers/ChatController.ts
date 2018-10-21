// import 'reflect-metadata'
import {getManager, getRepository} from "typeorm";
import { Chat } from '../entities/qixi'

export default class ChatController {
	chatRepository: any
	constructor(){
		this.chatRepository = getRepository(Chat)
	}

  static async getAll() {
    return await getManager().find(Chat);
  }

}