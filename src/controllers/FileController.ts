import { Buffer } from 'buffer';
import { Context } from '@core/koa'

const getFile = (ctx: Context) => {

  return new Promise((resolve, reject) => {
    try{
      let buf: Buffer
      let arr: Buffer[] = []
      ctx.req.on('data', (data: Buffer) => {
        try{
          arr.push(data)
        } catch(e) {
          reject(e)
        }
      })

      ctx.req.on('end', () => {
        try{
          buf = Buffer.concat(arr)
          if(buf.length <= 0) {
            resolve({})
          } else {
            resolve(buf)
          }
        } catch(e) {
          reject(e)
        }
        
      })
    } catch(e) {
      reject(e)
    }
  })
}

export default class FileController {
  
  static async upload (ctx: Context) {
    const file: any = await getFile(ctx)
    console.log(file, 'file')
    ctx.Json({
      data:{
        path: '/a/b/c/d.jpg',
        name: 'heheda'
      },
      msg: file.length
    })
  }

}