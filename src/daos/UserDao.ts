import {
  Equal,
  Like,
  Between,
  FindManyOptions,
  FindOptions,
  In,
} from "typeorm";
import { Guid, cryptoPwd } from "../utils/tools"
import { User } from '@/entities/mysql/user'
import { useBlogRepository } from '@/database/dbUtils';



class UserDao {

  async getById(id: string) {
    const user = await useBlogRepository(User).findOne({
      where: {
        id
      },
      // select: ['id', 'username', 'nickName', 'remark']
    })
    return user
  }

  async getByUsername(username: string) {
    const user = await useBlogRepository(User).findOne({
      where: {
        username
      }
    })
    return user
  }

  async getByIds(ids: string[]) {
    const users = await useBlogRepository(User).find({
      where: {
        id: In(ids)
      }
    })
    return users
  }
}

export default new UserDao