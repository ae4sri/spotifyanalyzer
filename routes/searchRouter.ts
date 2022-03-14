import KoaRouter from 'koa-router'
import { search } from '../db/data'

const searchRouter = new KoaRouter()

searchRouter.get('/search/:query', async (ctx) => {
    try {
        const query = ctx.params.query
        ctx.body = search(query)
    }
    catch(e: unknown) {
        const error = e as Error;
        ctx.throw(400, error.message )
    }
})


export default searchRouter