import type { Song, Playlist } from '../types'

export const songs: Song[] = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Neon Nights',
    duration: 245,
    coverUrl: 'https://picsum.photos/seed/song1/300'
  },
  {
    id: 2,
    title: 'Electric Pulse',
    artist: 'Synth Wave',
    album: 'Digital Horizon',
    duration: 198,
    coverUrl: 'https://picsum.photos/seed/song2/300'
  },
  {
    id: 3,
    title: 'Ocean Breeze',
    artist: 'Coastal Vibes',
    album: 'Summer Escape',
    duration: 312,
    coverUrl: 'https://picsum.photos/seed/song3/300'
  },
  {
    id: 4,
    title: 'Urban Nights',
    artist: 'City Lights',
    album: 'Metropolis',
    duration: 267,
    coverUrl: 'https://picsum.photos/seed/song4/300'
  },
  {
    id: 5,
    title: 'Forest Walk',
    artist: 'Nature Sounds',
    album: 'Peaceful Mind',
    duration: 423,
    coverUrl: 'https://picsum.photos/seed/song5/300'
  },
  {
    id: 6,
    title: 'Starlight',
    artist: 'Cosmic Dreams',
    album: 'Galaxy Explorer',
    duration: 289,
    coverUrl: 'https://picsum.photos/seed/song6/300'
  },
  {
    id: 7,
    title: 'Morning Coffee',
    artist: 'Acoustic Soul',
    album: 'Sunday Sessions',
    duration: 234,
    coverUrl: 'https://picsum.photos/seed/song7/300'
  },
  {
    id: 8,
    title: 'Rainy Day',
    artist: 'Mellow Beats',
    album: 'Autumn Stories',
    duration: 356,
    coverUrl: 'https://picsum.photos/seed/song8/300'
  }
]

export const playlists: Playlist[] = [
  {
    id: 1,
    name: 'Chill Vibes',
    description: 'Avslappnade låtar för studier',
    songIds: [1, 3, 5, 7],
    coverUrl: 'https://picsum.photos/seed/playlist1/300'
  },
  {
    id: 2,
    name: 'Energi Boost',
    description: 'Peppa upp din dag med dessa låtar',
    songIds: [2, 4, 6],
    coverUrl: 'https://picsum.photos/seed/playlist2/300'
  },
  {
    id: 3,
    name: 'Kvällsmys',
    description: 'Perfekt för en lugn kväll hemma',
    songIds: [3, 5, 7, 8],
    coverUrl: 'https://picsum.photos/seed/playlist3/300'
  }
]

