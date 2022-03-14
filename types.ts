export interface SongInfo {
  topTenDates: Object[]
  daysOnChart: number
  firstDate: Object
  lastDate: Object
  genres: Array<string>
  highestPosition: Object
}

export interface ArtistInfo {
  allSongs: Object[]
  timesOnChart: number
  tenStrongestSongs: Object[]
  tenStrongestDates: Object[]
  highestIndividualSongStreams: Object[]
}