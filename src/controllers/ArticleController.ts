import {
  Equal, Like, Between,
  And,
  FindManyOptions, FindOptionsWhere,
} from "typeorm";
import { Context } from 'koa'
import { Article } from '../entities/mysql/article'
import { Guid } from "../utils/tools";
import { toDate } from 'date-fns'
import { useBlogRepository } from '../database/dbUtils';


// const articleRepository = useBlogRepository()

class ArticleController {

  async getAll(args: any) {
    console.log(args)
    return await useBlogRepository(Article).findAndCount();
  }


  async getById(id: string = '') {
    const article = await useBlogRepository(Article).findOne({
      where: {
        id: Equal(id)
      }
    })
    // console.log('article: ', article)
    return article
  }

  async pages(args: any) {
    console.log(args, 'query args ===================')
    const options: FindManyOptions<Article> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    const whereConditions: FindOptionsWhere<Article> = {
      deletedAt: null,
    }
    if(args.title) {
      whereConditions.title = Like(`%${args.title}%`)
    }
    if(args.abstract) {
      whereConditions.abstract = Like(`%${args.abstract}%`)
    }
    if(args.tag) {
      whereConditions.tag = Like(`%${args.tag}%`)
    }
    if(args.tag) {
      const date = args.createdAt.map((c: any) => +toDate(c))
      whereConditions.createdAt = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    options.where = whereConditions

    const pages = await useBlogRepository(Article).findAndCount(options)
      // .createQueryBuilder()
      // .where({
      //   // title: Like(args.title)
      // })
      // .orderBy({createdAt: 'DESC'})
      // .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      // .take(args.pageSize)
      // .cache(10000)
      // .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  async insert(args: any, ctx: Context) {
    let model = new Article()
    model.id = Guid()
    model.title = args.title
    model.abstract = args.abstract
    model.description =  args.description
    model.typeId = args.typeId
    model.isTop = args.isTop
    model.tag = args.tag
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await useBlogRepository(Article).save(model)
    return result
  }

  async update(args: any, ctx: Context) {
    const article = new Article
    article.id = args.id
    article.title = args.title
    article.abstract = args.abstract
    article.description =  args.description
    article.typeId = args.typeId
    article.isTop = args.isTop
    article.tag = args.tag
    article.updatedAt = Date.now()
    article.updatedBy = ctx.state['CUR_USER'].id
    const result = await useBlogRepository(Article).update(article.id, article)
    return result
  }

}

export default new ArticleController