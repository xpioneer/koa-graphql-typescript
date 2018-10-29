import * as Router from 'koa-router'
import ChatCtrl from '../controllers/ChatController'
import {world, MyGraphql} from './graphql'
import { KoaGraphql } from '../core/graphql'
import {schema, chats} from '../schema/demo'

const router = new Router();

router.get('/hello', world)
  .get('/api', ChatCtrl.getAll)
  .get('/api/:id', ChatCtrl.getById)
  .get('/graphql', KoaGraphql({
    schema: schema,
    graphql: true
  }))
  .post('/graphql', KoaGraphql({
    schema: chats,
  }))

export default router