const Database = require('better-sqlite3');

const db = new Database(__dirname+'/spotifychartsdata.db'); // Connect pre-existing database to application

// Queries used for the individual artist page
const getUniqueSongs = db.prepare('SELECT DISTINCT TrackName FROM data WHERE Artist=? COLLATE NOCASE');
const instancesOnChart = db.prepare('SELECT COUNT(*) FROM (SELECT Trackname FROM data WHERE Artist=? COLLATE NOCASE)')
const topTenSongs = db.prepare('SELECT Trackname, COUNT(Trackname) AS `value_occurrence` FROM (SELECT TrackName FROM data WHERE Artist=? COLLATE NOCASE) GROUP BY Trackname ORDER BY `value_occurrence` DESC LIMIT 10')
const topDatesOnChart = db.prepare('SELECT * FROM (SELECT SUM(Streams), Date from data WHERE Artist=? COLLATE NOCASE Group By Date ORDER BY SUM(Streams) DESC) LIMIT 10')
const topTenSingleDayStreams = db.prepare('SELECT * FROM (SELECT Streams, Trackname, date from data WHERE Artist=? COLLATE NOCASE Group By Date ORDER BY Streams DESC) LIMIT 10')

// Queries used for the individual song page. Artists inserted into query to avoid overlap of songs with the same name by different artists
const topTenDates = db.prepare('SELECT * FROM (SELECT SUM(Streams), Date from data WHERE Trackname=? COLLATE NOCASE AND Artist=? COLLATE NOCASE Group By Date ORDER BY SUM(Streams) DESC) LIMIT 10')
const daysOnChart = db.prepare('SELECT COUNT(*) FROM (SELECT Trackname FROM data WHERE TrackName=? COLLATE NOCASE AND Artist=? COLLATE NOCASE)')
const firstDayOnChart = db.prepare('SELECT MIN(DATE), Streams, Position from Data WHERE Trackname=? COLLATE NOCASE AND Artist=? COLLATE NOCASE LIMIT 1')
const lastDayOnChart = db.prepare('SELECT MAX(DATE), Streams, Position from Data WHERE Trackname=? COLLATE NOCASE AND Artist=? COLLATE NOCASE LIMIT 1')
const getGenre = db.prepare('Select DISTINCT Genre from data WHERE TrackName=? COLLATE NOCASE AND Artist=? COLLATE NOCASE')
const highestPositionOnChart = db.prepare('SELECT DISTINCT MAX(Position), date, Streams FROM data WHERE TrackName=? COLLATE NOCASE AND Artist=? COLLATE NOCASE GROUP BY date ORDER BY Position ASC, Streams DESC LIMIT 1')


export const allSongs = (artist: string): Object[] => {
    return getUniqueSongs.all(artist) // return all unique songs artist has had on chart
}

export const timesOnChart = (artist: string): number => {
    return instancesOnChart.get(artist)['COUNT(*)'] // return # of instances an artist has been on the chart
}

export const tenStrongestSongs = (artist: string): Object[] => {
    return topTenSongs.all(artist) // return the 10 longest lasting songs on the chart by an artist
}

export const tenStrongestDates = (artist: string): Object[] => {
    return topDatesOnChart.all(artist) // return the top ten dates an artist was streamed
}

export const tenHighestDailyStreamsOnIndividualSongs = (artist: string): Object[] => {
    return topTenSingleDayStreams.all(artist) // return the ten highest daily streams on individual songs by given artist
}



export const topTenDatesForSong = (song: string, artist: string): Object[] => {
    return topTenDates.all(song, artist) // the ten dates where the song did the most streams
}

export const daysSpentOnChart = (song: string, artist: string): number => {
    return daysOnChart.get(song, artist)['COUNT(*)'] // how long the song spent on the charts
}

export const firstDateOnChart = (song: string, artist: string): Object => {
    return firstDayOnChart.get(song, artist) // day song entered the chart
}

export const lastDateOnChart = (song: string, artist: string): Object => {
    return lastDayOnChart.get(song, artist) // day song left the chart
}

export const getGenreOfSong = (song: string, artist: string): Array<string> => {
    return getGenre.get(song, artist).Genre // return genres of songs through an array of strings
}

export const highestPosition = (song: string, artist: string): Object => {
    return highestPositionOnChart.get(song, artist) // return highest position the song has peaked at
}

export const artistInfo = (artist: string): Object => {
    return {
        allSongs: allSongs(artist),
        timesOnChart: timesOnChart(artist),
        tenStrongestSongs: tenStrongestSongs(artist),
        tenStrongestDates: tenStrongestDates(artist),
        highestIndividualSongStreams: tenHighestDailyStreamsOnIndividualSongs(artist)
    }
} 

export const songInfo = (song: string, artist: string): Object => {
    return {
        topTenDates: topTenDatesForSong(song, artist),
        daysOnChart: daysSpentOnChart(song, artist),
        firstDate: firstDateOnChart(song, artist),
        lastDate: lastDateOnChart(song, artist),
        genres: getGenreOfSong(song, artist),
        highestPosition: highestPosition(song, artist)
    }
}
export const search = (query: string): Object => { // return search results for a given query
    const searchSongs = db.prepare(`SELECT DISTINCT TrackName, Artist from data WHERE TrackName LIKE '%${query}%'`) // queries must be defined within the function due to better-sqlite3s inabliity to use a parameter in a LIKE statement
    const searchArtists = db.prepare(`SELECT DISTINCT Artist from data WHERE Artist LIKE '%${query}%'`)

    const searchResults = {
        songs: searchSongs.all(),
        artists: searchArtists.all()
    }
    return searchResults
}

