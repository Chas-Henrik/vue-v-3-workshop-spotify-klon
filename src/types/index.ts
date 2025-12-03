// Typdefinitioner för musikspelaren

export interface Song {
  id: number
  title: string
  artist: string
  album: string
  duration: number // sekunder
  coverUrl: string
}

export interface Playlist {
  id: number
  name: string
  description: string
  songIds: number[]
  coverUrl: string
}

