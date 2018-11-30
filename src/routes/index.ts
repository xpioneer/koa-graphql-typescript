import * as Router from 'koa-router'
import {world, MyGraphql} from './graphql'
import { KoaGraphql } from '../core/graphql'
import {RootSchema} from '../schema/graphql/index'
import LogsCtrl from '../controllers/LogsController'
import ServerAPI from '../controllers/ServerAPIController'

const router = new Router();

router.get('/hello', world)
  .post('/platform/*', ServerAPI.KDJZ)
  .get('/api/log-api', LogsCtrl.apiPages)
  .get('/api/log-errors', LogsCtrl.errorsPages)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router