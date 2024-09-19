import * as Router from 'koa-router'
import { KoaGraphql } from '../core/graphql'
import { RootSchema } from '../schema/graphql/index'
import DemoCtrl from '../controllers/DemoController'
import AccountCtrl from '../controllers/AccountController'
import FileCtrl from '../controllers/FileController'
import LogsCtrl from '../controllers/LogsController'
import GeoLogCtrl from '../controllers/GeoLogController'
import ServerAPI from '../controllers/ServerAPIController'
import DoubleColorBallController from '../controllers/DoubleColorBallController'
import SharesCtrl from '../controllers/SharesController'
import StockCtrl from '../controllers/StockController'
import StockHistoryCtrl from '../controllers/StockHistoryController'

const _PROD_ = process.env.NODE_ENV === 'production'

const router = new Router();

router
  .post('/api/testInsert', DoubleColorBallController.batchInsert)
  .post('/api/login', AccountCtrl.login)
  .post('/api/logout', AccountCtrl.logout)
  .post('/api/register', AccountCtrl.register)
  .get('/view/:site', DemoCtrl.views)
  .post('/api/compose', DemoCtrl.compose)
  .get('/api/test/:id', DemoCtrl.test)
  .post('/platform/*', ServerAPI.KDJZ)
  .get('/api/log-api', LogsCtrl.apiPages)
  .get('/api/log-errors', LogsCtrl.errorsPages)
  .get('/api/log/stats', LogsCtrl.stats)
  .get('/api/log/geos', GeoLogCtrl.pages)
  .get('/api/log/geo/day', GeoLogCtrl.dayStats)
  .get('/api/log/geo/stats', GeoLogCtrl.getCityStats)
  .get('/api/log/geo/china', GeoLogCtrl.getChinaStats)
  .post('/api/batchShares', SharesCtrl.batchInsert)
  .post('/api/upload', FileCtrl.upload)
  .get('/api/stocks', StockCtrl.pages1)
  .get('/api/stocks/:id', StockCtrl.getStock)
  .get('/api/stockhistory', StockHistoryCtrl.pages)
  .get('/api/stockline', StockHistoryCtrl.pages1)
  .get('/api/stockhistory/total', StockHistoryCtrl.getTotal)
  .get('/api/stock/chartCount', StockCtrl.getBlocksCount)
  .get('/graphql', KoaGraphql({
    schema: RootSchema,
    graphql: _PROD_ ? false : true
  }))
  .post('/graphql', KoaGraphql({
    schema: RootSchema,
  }))

export default router