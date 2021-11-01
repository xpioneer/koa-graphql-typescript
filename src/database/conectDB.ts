// import 'reflect-metadata'
import { createConnection, createConnections, ConnectionOptions } from "typeorm";
import { MysqlConf, MongoConf } from '../../conf/db.conf'
import { Entities, ShareEntities } from '../entities/mysql'
import { MongoEntities } from '../entities/mongo'
import { CONNECT_BLOG, CONNECT_MONGO, CONNECT_SHARES } from './dbUtils';
import stockHistoryDao from '../daos/StockHistoryDao'

const _PROD_ = process.env.NODE_ENV === 'production'

const connectDB = (): Promise<void> => {
  const connectOptions = [
    {name: CONNECT_BLOG, entities: Entities, database: CONNECT_BLOG},
    {name: CONNECT_SHARES, entities: ShareEntities, database: CONNECT_SHARES}
  ].map<ConnectionOptions>(db => {
    return {
      ...db,
      type     : 'mysql',
      host     : MysqlConf.host,
      port     : MysqlConf.port,
      username : MysqlConf.username,
      password : MysqlConf.password,
      logging  : _PROD_ ? false : true,
    }
  })
  return createConnections(connectOptions).then((connect) => {
    console.log(`${connectOptions.map(c => c.name).join()} ${connectOptions.length} mysql connected successfully!`)
    stockHistoryDao._getTotal()
  }).catch((err) => {
    console.log('mysql failed to connect!', err)
  })
}

const connectMongo = (): Promise<void> => {
  return createConnection({
    name     : CONNECT_MONGO,
    type     : 'mongodb',
    host     : MongoConf.host,
    port     : MongoConf.port,
    // username : MongoConf.username,
    // password : MongoConf.password,
    database : MongoConf.database,
    entities : MongoEntities,
    // logging  : _PROD_ ? false : true,
  }).then((connect) => {
    console.log('mongo connected successfully!')
  }).catch((err) => {
    console.log('mongo connect fail!', err)
  })
}

export {
  connectDB,
  connectMongo
}
