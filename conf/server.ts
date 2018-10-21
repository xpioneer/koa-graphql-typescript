// "dev": "NODE_ENV=development nodemon --watch src/**/* -e ts,tsx --exec ts-node src/server/server.ts"

import App from '../src/app'
import {PORT} from './server.conf'
import connectDB from '../src/database/connectDB'

// connect db
connectDB(():void => {
	App.start(PORT)	// start app
})
