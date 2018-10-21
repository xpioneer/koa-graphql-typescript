import {createConnection} from "typeorm";
import {MySqlConf} from '../../conf/db.conf'
import {Entities} from '../entities/index'

// connect db
const connectionDB = (start: Function) => {
  createConnection({
    type: "mysql",
    host: MySqlConf.host,
    port: MySqlConf.port,
    username: MySqlConf.username,
    password: MySqlConf.password,
    database: "qixi",
    entities: Entities
  }).then((connect) => {
    console.log('db connect success!')
    start()
  }).catch((err) => {
    console.log('db connect fail!', err)
  })  
}

export default connectionDB
