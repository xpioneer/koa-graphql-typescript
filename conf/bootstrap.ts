import { createConnection } from "typeorm";
import App from '../src/app'
import { PORT } from './server.conf'
import { MySqlConf } from './db.conf'
import { Entities } from '../src/entities/index'

const bootstrap = (): void => {
  createConnection({
    type     : "mysql",
    host     : MySqlConf.host,
    port     : MySqlConf.port,
    username : MySqlConf.username,
    password : MySqlConf.password,
    database : "qixi",
    entities : Entities
  }).then((connect) => {
    console.log('db connect success!')
    App.start(PORT)
  }).catch((err) => {
    console.log('db connect fail!', err)
  })  
}

export default bootstrap
