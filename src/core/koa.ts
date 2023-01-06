
import { ResponseData, ReturnPage } from '@/models/ResponseData';
import {Context as KoaContext} from 'koa'

export interface Context extends KoaContext {
  // post fields
  fields?: AnyObject

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


