import KoaRouter from 'koa-router'
import { songInfo, artistInfo } from '../db/fetchData'
    
const artistRouter = new KoaRouter()

artistRouter.get('/:artist/:song', async (ctx) => {
    try {
        const song = ctx.params.song
        const artist = ctx.params.artist
        ctx.body = songInfo(song,artist)     
    } catch(e) {
        const error = e as Error;
        ctx.throw(400, error.message )
    }
})

artistRouter.get('/:artist', async (ctx) => {
    try {
        const artist = ctx.params.artist
        ctx.body = artistInfo(artist);
    } catch(e) {
        const error = e as Error;
        ctx.throw(400, error.message )
    }
})

export default artistRouter