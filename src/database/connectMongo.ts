import { connect, connection } from "mongoose";
import { MongoConf } from '../../conf/db.conf'

const Connection = () => {
  connect(`mongodb://${MongoConf.host}`, {
    useNewUrlParser: true,
    poolSize: 20,
    dbName: 'test',
    reconnectTries: 10,
    // auth: {
    //   // username:MongoConf.username,
    //   user: MongoConf.username,
    //   password: MongoConf.password
    // }
  })

  connection.on('open', (r) => {
    console.log('mongodb opened.', r)
  }).on('error', err => {
    console.log('mongodb connection fail.', err)
  }).on('close', close => {
    console.log('mongodb connection closed.', close)
  })
}

export default Connection
