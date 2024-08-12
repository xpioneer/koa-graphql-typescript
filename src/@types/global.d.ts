import { ResponseData, ReturnPage } from '@/models/ResponseData';
export {}

declare global {
  
  type AnyObject<T = any> = Record<string, T>
}

declare module 'koa' {
  interface Context {
    body: any

    // other custome fields
    
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
}