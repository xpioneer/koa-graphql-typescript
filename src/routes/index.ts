import * as Router from 'koa-router'
import {world, MyGraphql} from './graphql'
import { KoaGraphql } from '../core/graphql'
import {RootSchema} from '../schema/graphql/index'

const router = new Router();

router.get('/hello', world)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router