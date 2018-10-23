import * as Router from 'koa-router'
import graphql from './graphql'

const router = new Router();

router.get('/graphql', graphql)

export default graphql