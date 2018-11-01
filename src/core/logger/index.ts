import { Context } from '@core/koa'
import { getMongoManager, getMongoRepository } from 'typeorm'
import { Guid } from '../../utils/tools';
import MongoModel from '../../schema/mongo'
import * as Moment from 'moment'

const { API, Errors } = MongoModel

const APIlogger = async (ctx: Context, options: any): Promise<void> => {
  const guid = Guid()
  const model = new API()
  const method = ctx.method
  model.id = guid
  model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
  model.path = ctx.path
  model.url = ctx.url
  model.status = ctx.status
  model.origin = ctx.origin
  model.hostname = ctx.header['x-host'];
  model.headers = JSON.stringify(ctx.header)
  model.protocol = ctx.protocol;
  model.created_at = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
  model.created_by = ctx.session['CUR_USER'] ? ctx.session['CUR_USER'].id : null
  

  model.method = method
  if(method === 'GET') {
    model.params = ctx.querystring
  } else if(/^P(U|OS)T$/.test(method)){
    let params = JSON.stringify(ctx.fields);
    if(/^\/api\/login$/.test(ctx.path)){
      params = params.replace(/"password":".+\b"/, '******');
    }
    model.params = params
  }

  model.time = options.time  // deal time

  const result = await getMongoManager().save(model)

}

const ERRlogger = async (ctx: Context, options: any): Promise<void> => {
  const guid = Guid()
  const model = new Errors()
  const method = ctx.method
  model.id = guid
  model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
  model.path = ctx.path
  model.url = ctx.url
  model.status = ctx.status
  model.origin = ctx.origin
  model.hostname = ctx.header['x-host'];
  model.headers = JSON.stringify(ctx.header)
  model.protocol = ctx.protocol;
  model.created_at = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
  model.created_by = ctx.session['CUR_USER'] ? ctx.session['CUR_USER'].id : null

  model.errors = options.errors
  

  model.method = method
  if(method === 'GET') {
    model.params = ctx.querystring
  } else if(/^P(U|OS)T$/.test(method)){
    let params = JSON.stringify(ctx.fields);
    if(/^\/api\/login$/.test(ctx.path)){
      params = params.replace(/"password":".+\b"/, '******');
    }
    model.params = params
  }

  model.time = options.time  // deal time

  const result = await getMongoRepository(Errors).save(model)

}

export {
  APIlogger,
  ERRlogger
}