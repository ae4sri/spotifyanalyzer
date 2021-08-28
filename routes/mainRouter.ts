import KoaRouter from 'koa-router'
import { allSongs, timesOnChart, tenStrongestSongs, tenStrongestDates, tenHighestDailyStreamsOnIndividualSongs, 
    topTenDatesForSong, daysSpentOnChart, firstDateOnChart, lastDateOnChart, getGenreOfSong, highestPosition } from '../db/data'
    
const artistRouter = new KoaRouter()

artistRouter.get('/:artist/:song', async (ctx) => {
    try {
        const song = ctx.params.song
        const artist = ctx.params.artist
        ctx.body = {
            topTenDates: topTenDatesForSong(song, artist),
            daysOnChart: daysSpentOnChart(song, artist),
            firstDate: firstDateOnChart(song, artist),
            lastDate: lastDateOnChart(song, artist),
            genres: getGenreOfSong(song, artist),
            highestPosition: highestPosition(song, artist)
        }        
    } catch(e) {
        ctx.throw(400, e.message )
    }
})

artistRouter.get('/:artist', async (ctx) => {
    try {
        const artist = ctx.params.artist
        ctx.body = {
            allSongs: allSongs(artist),
            timesOnChart: timesOnChart(artist),
            tenStrongestSongs: tenStrongestSongs(artist),
            tenStrongestDates: tenStrongestDates(artist),
            highestIndividualSongStreams: tenHighestDailyStreamsOnIndividualSongs(artist)
        }
    } catch(e) {
        ctx.throw(404, e.message)
    }
})

export default artistRouter