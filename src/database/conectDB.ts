import 'reflect-metadata'
import { createConnection, createConnections, ConnectionOptions } from "typeorm";
import { BlogConf, SharesConf, MongoConf } from '../../conf/db.conf'
import { Entities, ShareEntities } from '../entities/mysql'
import { MongoEntities } from '../entities/mongo'
import { CONNECT_BLOG, CONNECT_MONGO, CONNECT_SHARES } from './dbUtils';

const _PROD_ = process.env.NODE_ENV === 'production'

const connectDB = (): Promise<void> => {
  const connectOptions = [
    {name: CONNECT_BLOG, entities: Entities, database: BlogConf.database},
    {name: CONNECT_SHARES, entities: ShareEntities, database: SharesConf.database}
  ].map<ConnectionOptions>(db => {
    return {
      ...db,
      type     : 'mysql',
      host     : BlogConf.host,
      port     : BlogConf.port,
      username : BlogConf.username,
      password : BlogConf.password,
      logging  : _PROD_ ? false : true,
    }
  })
  return createConnections(connectOptions).then((connect) => {
    console.log(`${connectOptions.length} mysql connected successfully!`)
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
