import { Like, Between, Equal, FindManyOptions, In} from "typeorm";
import { Context } from 'koa'
import { User } from '@/entities/mysql/user'
import { Guid, cryptoPwd } from "../utils/tools"
import { endOfDay, startOfDay } from 'date-fns'
import { useBlogRepository } from '@/database/dbUtils';
import UserService from '@/services/UserService'
// import DataLoader from 'dataloader'
const DataLoader = require('dataloader')

export const UsersLoader = new DataLoader(async(ids: string[]) => {
  console.log(ids, 'UsersLoader----------------ids')
  const users = await (new UserController).findAllUsers(ids)
  return users
})

class UserController {

  async getAll(args: any) {
    return await useBlogRepository(User).find();
  }

  async findAllUsers(ids: string[]) {
    const [list, total] = await useBlogRepository(User).findAndCount({
      where: {
        id: In(ids)
      }
    })
    console.log(list, total, '>>>>>>>>>>>>>>>>>')
    return list
  }

  async getById(id = null) {
    const user = await UserService.getById(id)
    return user
  }

  async pages(args: any) {
    console.log(args, 'query args ===================')
    const options: FindManyOptions<User> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      },
      select: ['id', 'username', 'nickName', 'userType', 'createdAt', 'updatedAt', 'sex', 'remark']
    }
    if(args.username) {
      options.where['username'] = Like(`%${args.username}%`)
    }
    if(args.nickName) {
      options.where['nickName'] = Like(`%${args.nickName}%`)
    }
    if(args.userType >= 0) {
      options.where['userType'] = Equal(args.userType)
    }
    if(args.createdAt) {
      const date = (args.createdAt as string[]).map(
        (d, i) => i > 0 ? +endOfDay(new Date(d)) : +startOfDay(new Date(d))
      )
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    const pages = await useBlogRepository(User).findAndCount(options)
    return pages
  }

  async insert(args: any, ctx: Context) {
    let username = args.username;
    let password = args.password;
    if(!(username && username.length > 2)) {
      ctx.throw(400, '用户名长度必须大于1个字符')
    }
    if(!(password && password.length > 5)) {
      ctx.throw(400, '用户密码长度必须大于6个字符')
    }
    let model = new User()
    model.id = Guid()
    model.username = args.username
    model.nickName = args.nickName
    model.userType = args.userType
    model.password = cryptoPwd(password, username)
    model.remark =  args.remark
    model.sex =  args.sex
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await useBlogRepository(User).save(model)
    return result
  }

  async update(args: any, ctx: Context) {
    let username = args.username;
    let password = args.password;
    if(!(username && username.length > 2)) {
      ctx.throw(400, '用户名长度必须大于1个字符')
    }
    if(password && password.length < 6) {
      ctx.throw(400, '用户密码长度必须大于6个字符')
    }

    const user = new User
    user.id = args.id
    // user.username = args.username
    user.nickName = args.nickName
    user.userType = args.userType
    user.sex = args.sex
    user.remark =  args.remark
    if(password) { // if pwd changed
      user.password = cryptoPwd(password, username)
    }
    user.updatedBy = ctx.state['CUR_USER'].id
    user.updatedAt = Date.now()
    const result = await useBlogRepository(User).save(user)
    return result
  }
  

  async save(args: any, ctx: Context) {
    const isEdit = !!args.id
    if(isEdit) {
      const user = await UserService.getById(args.id)
      args.username = user.username
      return this.update(args, ctx)
    } else {
      return this.insert(args, ctx)
    }
  }

}

export default new UserController