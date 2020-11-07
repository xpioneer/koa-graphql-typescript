
import { IResponseData, IReturnPage } from '@src/models/ResponseData';
import {Context as KoaContext} from 'koa'

export interface Context extends KoaContext {
  // post fields
  fields?: IAnyObject

  // session
  session?: object

  // request
  getParams?: {
    offset: number
    limit: number
  }

  // response
  Json?: <T = any>(res: T | IResponseData<T> | (() => T)) => IResponseData<T>
  Pages?: <T = any>(res: IReturnPage<T>) => IResponseData<T>
}


