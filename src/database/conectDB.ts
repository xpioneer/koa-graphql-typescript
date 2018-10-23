import { createConnection } from "typeorm";
import { MySqlConf } from '../../conf/db.conf'
import { Entities } from '../entities/index'

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
    console.log('db connect success!')
  }).catch((err) => {
    console.log('db connect fail!', err)
  })  
}

export default connectDB
