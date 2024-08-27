import { Like, FindManyOptions, Between} from "typeorm";
import { Context } from '@/core/koa'
import { Tag } from '../entities/mysql/tag'
import { Guid } from "../utils/tools";
import { endOfDay, startOfDay } from 'date-fns'
import { JWT_KEY } from '../constants'
import { useBlogRepository } from '../database/dbUtils';

class TagController {

  async getAll(args: any) {
    console.log(args)
    return await useBlogRepository(Tag).findOne({});
  }


  async getById(id: string = '') {
    const tag = await useBlogRepository(Tag).findOne({
      where: {
        id
      }
    })
    return tag
  }

  async pages(args: any) {
    const options: FindManyOptions<Tag> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      },
      select: ['id', 'name', 'remark', 'createdAt', 'createdBy', 'updatedAt']
    }
    if(args.name) {
      options.where['name'] = Like(`%${args.name}%`)
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
    const pages = await useBlogRepository(Tag).findAndCount(options)
    return pages
  }

  async save({
    id,
    name,
    remark,
  }: any, ctx: Context) {
    if(!name || name.length < 1) {
      ctx.throw(400, '标签名称长度必须大于1')
    }
    let model = new Tag()
    model.id = Guid()
    if(id) {
      model.id = id
    } else {
      model.createdAt = Date.now()
      model.createdBy = ctx.state['CUR_USER'].id
    }
    model.name = name
    model.remark = remark
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state[JWT_KEY].id
    const result = await useBlogRepository(Tag).save(model)
    return result
  }

  async insert(args: any, ctx: Context) {
    if(!args.name || args.name.length < 1) {
      ctx.throw(400, '标签名称长度必须大于1')
    }
    let model = new Tag()
    model.id = Guid()
    model.name = args.name
    model.remark = args.remark
    model.createdAt = Date.now()
    model.createdBy = ctx.state[JWT_KEY].id
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state[JWT_KEY].id
    const result = await useBlogRepository(Tag).save(model)
    return result
  }

  async update(args: any, ctx: Context) {
    if(!args.name || args.name.length < 1) {
      ctx.throw(400, '标签名称长度必须大于1')
    }
    let model = new Tag()
    model.id = args.id
    model.name = args.name
    model.remark = args.remark
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state[JWT_KEY].id
    const result = await useBlogRepository(Tag).save(model)
    return result
  }

}

export default new TagController