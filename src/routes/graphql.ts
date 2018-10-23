import * as Koa from '../core/koa'
import {graphql} from 'graphql'
import {schema} from '../schema/demo'
import {Delay} from '../utils/tools/index'

export const world = async (ctx: Koa.Context) => {
  await Delay(1000)
  ctx.Json('world')
}

export const MyGraphql = async (ctx: Koa.Context) => {
  const result = await graphql(schema, ctx.body)
  console.log('graphql: ', result.data, result.errors)
  // if(result.data) {
    ctx.Json(result.data)
  // } else {
  //   ctx.Json({data: result.data, errors: result.errors})
  // }
}
