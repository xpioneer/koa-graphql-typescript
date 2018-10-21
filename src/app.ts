// koa
import * as Koa from 'koa'
import Catch from './middlewares/catch'
import CahtCtrl from './controllers/ChatController'

const App: Koa = new Koa();

App.use(Catch)

App.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
	const path = ctx.request.path
	console.log(`path: ${path}`)
	if(path === '/') {
		ctx.body = 'Welcome to koa server.'
	}
	if(path === '/api') {
		const all = await CahtCtrl.getAll()
		console.log('all:', all)
		ctx.body = all
	}
	
	await next()

	ctx.set('X-Powered-By', 'Keefe');
})

const start = (port: number):void => {
	console.log('start app...')
	App.listen(port, ():void => {
		console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `)
	})
}

export default {
	start,
}