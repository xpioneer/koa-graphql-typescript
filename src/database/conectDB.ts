import { createConnection } from "typeorm";
import { MySqlConf, MongoConf } from '../../conf/db.conf'
import { Entities } from '../entities/index'
import { MongoEntities } from '../schema/mongo'

const connectDB = (): void => {
  createConnection({
    type     : 'mysql',
    host     : MySqlConf.host,
    port     : MySqlConf.port,
    username : MySqlConf.username,
    password : MySqlConf.password,
    database : 'qixi',
    entities : Entities
  }).then((connect) => {
    console.log('mysql connect success!')
  }).catch((err) => {
    console.log('mysql connect fail!', err)
  })  
}

const connectMongo = (): void => {
  createConnection({
    type     : 'mongodb',
    host     : MongoConf.host,
    port     : MongoConf.port,
    // username : MongoConf.username,
    // password : MongoConf.password,
    database : 'test',
    entities : MongoEntities
  }).then((connect) => {
    console.log('mongo connect success!')
  }).catch((err) => {
    console.log('mongo connect fail!', err)
  })  
}

export {
  connectDB,
  connectMongo
}
