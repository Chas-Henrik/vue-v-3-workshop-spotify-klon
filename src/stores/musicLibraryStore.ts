import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import type { Playlist, Song } from '../types'
import { songs, playlists } from '../data/mockData'

const songsData = ref<Song[]>(songs)
const playlistsData = ref<Playlist[]>(playlists)

export const useMusicLibraryStore = defineStore('music-library', () => {

  function getPlaylistById(id: number) {
    return playlistsData.value.find(pl => pl.id === id)
  }

  function allSongs() {
    return songsData.value  
  }

  function getSongById(id : number) {
    return songsData.value.find(song => song.id === id)
  }

  function getPlaylistSongs(playlistId : number) {
    const playlist = getPlaylistById(playlistId)
    if (!playlist) return []
    return songsData.value.filter(song => playlist.songIds.includes(song.id))
  }

  function searchSongs(query : string) {
    const lowerQuery = query.toLowerCase()
    return songsData.value.filter(song => song.title.toLowerCase().includes(lowerQuery) || song.artist.toLowerCase().includes(lowerQuery))
  }
  
  const songsCount = computed(() => {
    return songsData.value.length
  })

  return {
    songsData,
    playlistsData,
    allSongs,
    getPlaylistById,
    getPlaylistSongs,
    getSongById,
    searchSongs,
    songsCount,
  }
})
