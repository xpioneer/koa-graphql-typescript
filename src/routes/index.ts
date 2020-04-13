import * as Router from 'koa-router'
import { KoaGraphql } from '../core/graphql'
import { RootSchema } from '../schema/graphql/index'
import DemoCtrl from '../controllers/DemoController'
import AccountCtrl from '../controllers/AccountController'
import FileCtrl from '../controllers/FileController'
import LogsCtrl from '../controllers/LogsController'
import ServerAPI from '../controllers/ServerAPIController'
import DoubleColorBallController from '../controllers/DoubleColorBallController'

const _PROD_ = process.env.NODE_ENV === 'production'

const router = new Router();

router
  .post('/api/testInsert', DoubleColorBallController.batchInsert)
  .post('/api/login', AccountCtrl.login)
  .post('/api/logout', AccountCtrl.logout)
  .get('/view/:site', DemoCtrl.views)
  .post('/api/compose', DemoCtrl.compose)
  .get('/api/test/:id', DemoCtrl.test)
  .post('/platform/*', ServerAPI.KDJZ)
  .get('/api/log-api', LogsCtrl.apiPages)
  .get('/api/log-errors', LogsCtrl.errorsPages)
  .post('/api/upload', FileCtrl.upload)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: _PROD_ ? false : true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router