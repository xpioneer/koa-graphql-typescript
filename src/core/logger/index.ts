import { Context } from '@core/koa'
import { getMongoManager, getMongoRepository } from 'typeorm'
import { Guid } from '../../utils/tools';
import MongoModel from '../../entities/mongo'
import * as Moment from 'moment'

const { API, Errors } = MongoModel

const APIlogger = async (ctx: Context, options: any): Promise<void> => {
  if(!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
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
    model.headers = ctx.header
    model.responseHeaders = ctx.response.header
    model.protocol = ctx.protocol;
    model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
    // model.createdBy = ctx.session['CUR_USER'] ? ctx.session['CUR_USER'].id : null
    

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

    const result = await getMongoManager('mongo').save(model)
  }

}

const ERRlogger = async (ctx: Context, options: any): Promise<void> => {
  const guid = Guid()
  const model = new Errors()
  const method = ctx.method
  model.id = guid
  model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress,
  model.path = ctx.path
  model.url = ctx.url
  model.origin = ctx.origin
  model.hostname = ctx.header['x-host'];
  model.headers = ctx.header
  model.responseHeaders = ctx.response.header
  model.protocol = ctx.protocol;
  model.createdAt = Moment(Date.now()).format('YYYY/MM/DD HH:mm:ss.SSS')
  // model.createdBy = ctx.session['CUR_USER'] ? ctx.session['CUR_USER'].id : null

  model.status = options.status
  model.errors = options.errors
  model.msg = options.msg
  

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

  const result = await getMongoRepository(Errors, 'mongo').save(model)

}

export {
  APIlogger,
  ERRlogger
}