import { Application } from './app'
import { PORT } from '../conf/server.conf'

const App = new Application(PORT)

// App.start(PORT)