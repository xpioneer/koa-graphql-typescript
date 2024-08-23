// import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";
import { format } from 'date-fns'
import { MysqlConf, MongoConf } from '../../conf/db.conf'
import { Entities, ShareEntities } from '../entities/mysql'
import { MongoEntities } from '../entities/mongo'
import { CONNECT_BLOG, CONNECT_MONGO, CONNECT_SHARES, setDataSource, setMongoDataSource } from './dbUtils';
import stockHistoryDao from '../daos/StockHistoryDao'

const _PROD_ = process.env.NODE_ENV === 'production'

const connectDB = () => {
  const connectOptions = [
    {name: CONNECT_BLOG, entities: Entities, database: CONNECT_BLOG},
    {name: CONNECT_SHARES, entities: ShareEntities, database: CONNECT_SHARES}
  ].map<DataSourceOptions>(db => {
    return {
      ...db,
      type     : 'mysql',
      host     : '127.0.0.1',
      port     : MysqlConf.port,
      username : MysqlConf.username,
      password : MysqlConf.password,
      logging  : _PROD_ ? false : true,
      // driver   : require('mysql2/promise'),
    }
  })
  const connectDBs = connectOptions.map(c => new DataSource(c).initialize())
  return Promise.all(connectDBs).then((datasource) => {
    console.log(`${connectOptions.map(c => c.name).join()} ${connectOptions.length} mysql connected successfully!`)
    console.log(`connencted at ${format(new Date, 'yyyy-MM-dd HH:mm:ss:SSS')}`)
    // stockHistoryDao._getTotal()
    setDataSource(datasource)
    return Promise.resolve(datasource)
  }).catch((err) => {
    console.log('mysql failed to connect!', err)
    return Promise.reject(err)
  })
}

const connectMongo = () => {
  return new DataSource({
    name     : CONNECT_MONGO,
    type     : 'mongodb',
    host     : MongoConf.host,
    port     : MongoConf.port,
    username : MongoConf.username,
    password : MongoConf.password,
    database : MongoConf.database,
    entities : MongoEntities,
    authSource: MongoConf.username,
    // logging  : _PROD_ ? false : true,
  }).initialize().then((datasource) => {
    console.log('mongo connected successfully!')
    setMongoDataSource(datasource)
    return Promise.resolve(datasource)
  }).catch((err) => {
    console.log('mongo connect fail!', err)
    return Promise.reject(err)
  })
}

export {
  connectDB,
  connectMongo
}
