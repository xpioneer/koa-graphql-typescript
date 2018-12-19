import { Context } from '@core/koa'

// only post fields(not upload file stream)

const getPostData = (ctx: Context) => {

  return new Promise((resolve, reject) => {
    try{
      let postData = ''
      ctx.req.on('data', data => {
        // console.log(data, 'data')
        postData += data
      })

      ctx.req.on('end', () => {
        if(postData === '') {
          resolve({})
        } else {
          resolve(JSON.parse(postData))
        }
      })
    } catch(e) {
      reject({err: e.toString()})
    }
  })
}

const KoaBody = async (ctx: Context, next: () => Promise<any>) => {
  if(/^(POST|PUT)$/.test(ctx.method) && !/\/api\/upload/.test(ctx.path)) {
    ctx.fields = await getPostData(ctx)
  }
  // console.log('ctx.fields,', ctx.fields)
  await next()
}

export default KoaBody