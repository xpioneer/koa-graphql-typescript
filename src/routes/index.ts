import * as Router from 'koa-router'
import CahtCtrl from '../controllers/ChatController'
import {world, MyGraphql} from './graphql'

const router = new Router();

router.get('/hello', world)
  .get('/api', CahtCtrl.getAll)
  .get('/graphql', MyGraphql)

export default router