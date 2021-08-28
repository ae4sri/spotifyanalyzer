import KoaRouter from 'koa-router'
import { search } from '../db/data'

const searchRouter = new KoaRouter()

searchRouter.get('/search/:query', async (ctx) => {
    try {
        const query = ctx.params.query
        ctx.body = search(query)
    }
    catch(e) {
        ctx.throw(400, e.message )
    }
})


export default searchRouter