
import { ResponseData, ReturnPage } from '@/models/ResponseData';
import * as Koa from 'koa'

export interface Context<T = any> extends Koa.Context {
  // post fields
  fields?: T

  body: any

  // session
  session?: object

  // request
  getParams?: {
    offset: number
    limit: number
  }

  params: AnyObject

  // response
  Json?: <T = any>(res: T | ResponseData<T> | (() => T)) => ResponseData<T>
  Pages?: <T = any>(res: ReturnPage<T>) => ResponseData<T[]>
}


