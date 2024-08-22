// koa
import * as Koa from 'koa'
import * as KoaLogger from 'koa-logger'
import { Context } from '@/core/koa'
import Catch from './middlewares/catch'
import Middlewares from './middlewares/index'
import {connectDB, connectMongo} from './database/conectDB'

const _DEV_ = process.env.NODE_ENV === 'development'

export class Application {
	private app: Koa
	
	constructor(port = 8200){
		this.app = new Koa()
		this.connectDBs().then(() => {
			this.init()
		}).then(() => {
			this.start(port)
		}).catch(e => {
			console.log('Server setup failed!')
		})
	}

	private connectDBs() {
		return Promise.all([connectDB(), connectMongo()]).then(r => {
			console.log('All databases are connected.')
		})
	}

	// init middlewares
	private init(){
		if(_DEV_) {
			this.app.use(KoaLogger())
		}
		this.app.use(Catch) //catch middldware
		this.app.keys = ['APP_Keys']; // set app keys
		this.app.use(async (ctx: Context, next: () => Promise<any>) => {
			const path = ctx.request.path
			console.log(`path: ${path}`)
			if(path === '/') {
				ctx.body = 'Welcome to koa-graphql server.'
			}
			await next()
			ctx.set('X-Powered-By', 'Keefe');
		})

		Middlewares(this.app)
	}

	// start app
	public start(port: number) {
		// change to the databases priority startup
		this.app.listen(port, () => {
			console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `)
		})
		// this.app.listen(port, (): void => {
		// 	console.log(`Koa server has started, running with: http://127.0.0.1:${port}. `)
		// 	connectDB() // db start after server running
		// 	connectMongo() // connect mongodb
		// })
	}
}
