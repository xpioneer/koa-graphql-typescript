import { Schema, model, connection } from 'mongoose'
import Connection from '../../database/connectMongo'
import { Guid } from '../../utils/tools';


Connection()

const TestSchema = new Schema({
  name: String,
  id: String
})


const Test = model('tb_test', TestSchema)

const guid = Guid()
const test = new Test({name: 'test' + guid.substring(0, 5), id: guid})

connection.on('open', () => {
  test.save((err, test) => {
    if(err) {
      console.log(err)
    } else {
      console.log('test:', test)
    }
  })
})

