import * as Router from 'koa-router'
import ChatCtrl from '../controllers/ChatController'
import {world, MyGraphql} from './graphql'
import { KoaGraphql } from '../core/graphql'
import {RootSchema} from '../schema/graphql/index'

const router = new Router();

router.get('/hello', world)
  .get('/api/testlog', ChatCtrl.testLog)
  .get('/api', ChatCtrl.getAll)
  .get('/api/:id', ChatCtrl.getById)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router