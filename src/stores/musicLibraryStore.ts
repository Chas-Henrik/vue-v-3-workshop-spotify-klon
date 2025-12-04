import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import type { Playlist, Song } from '../types'
import { songs, playlists } from '../data/mockData'


export const useMusicLibraryStore = defineStore('music-library', () => {
  const songsData = ref<Song[]>(songs)
  const playlistsData = ref<Playlist[]>(playlists)

  function getPlaylistById(id: number) {
    return playlistsData.value.find(pl => pl.id === id)
  }
  
  const songsCount = computed(() => {
    return songsData.value.length
  })

  return {
    songsData,
    playlistsData,
    getPlaylistById,
    songsCount,
  }
})
