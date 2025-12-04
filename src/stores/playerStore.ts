import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import type { Playlist, Song } from '../types'
import { useMusicLibraryStore } from './musicLibraryStore'


export const usePlayerStore = defineStore('player-store', () => {
  
  const currentSong = ref<Song | null>(null)
  const currentPlaylist = ref<Playlist | null>(null)
  const isPlaying = ref<Boolean>(false)
  const currentTime = ref<number>(0)
  const duration = ref<number>(0)

  const musicLibraryStore = useMusicLibraryStore()

  function playSong(song : Song) {
    currentSong.value = song
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function nextSong() {
    if (hasNextSong() && currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const nextIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0)) + 1
      return musicLibraryStore.getSongById(songIds[nextIndex])
    }
    return null
  }

  function previousSong() {
    if (hasPreviousSong() && currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const prevIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0)) - 1
      return musicLibraryStore.getSongById(songIds[prevIndex])
    }
    return null
  }
  
  function hasNextSong() : boolean {
    if (currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const currentIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0))
      return currentIndex < songIds.length - 1
    }
    return false
  }

  function hasPreviousSong() : boolean {
    if (currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const currentIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0))
      return currentIndex > 0
    }
    return false
  }

  function progressionPercentage() : number {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  }

  return {
    currentSong,
    currentPlaylist,
    isPlaying,
    currentTime,   
    duration,
    playSong,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    hasNextSong,
    hasPreviousSong,
    progressionPercentage,
  }
})
