import { DefaultState, DefaultContext } from 'koa'
import { ResponseData, ReturnPage } from '@/models/ResponseData';


declare module "koa" {
  export interface Context<S = DefaultState, D = DefaultContext> {
    // state: any

    // post fields
    fields?: AnyObject
  
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
}
