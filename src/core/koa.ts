
import {Context as KoaContext} from 'koa'

export interface Context extends KoaContext {
  // post fields
  fields?: object

  // session
  session?: object

  // request
  getParams?: Function

  // response
  Json?: Function
  Pages?: Function
}


