// koa
import * as Koa from 'koa'
import { Context } from '@core/koa'
import Catch from './middlewares/catch'
import Middlewares from './middlewares/index'
import CahtCtrl from './controllers/ChatController'

const App: Koa = new Koa();

App.use(Catch)
Middlewares(App)

App.use(async (ctx: Context, next: () => Promise<any>) => {
	const path = ctx.request.path
	console.log(`path: ${path}`)
	if(path === '/') {
		ctx.body = 'Welcome to koa server.'
	}
	if(path === '/api') {
		const all = await CahtCtrl.getAll()
		console.log('all:', all)
		// ctx.body = all
		ctx.Json(all)
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