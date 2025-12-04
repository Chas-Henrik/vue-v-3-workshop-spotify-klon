import { defineStore } from 'pinia'
import { ref } from "vue"
import type { Playlist, Song } from '../types'
import { useMusicLibraryStore } from './musicLibraryStore'

const currentSong = ref<Song | null>(null)
const currentPlaylist = ref<Playlist | null>(null)
const isPlaying = ref<Boolean>(false)
const currentTime = ref<number>(0)
const duration = ref<number>(0)

export const usePlayerStore = defineStore('player-store', () => {

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
    if (hasNextSong()) {
      if(currentPlaylist.value) {
        const songIds = currentPlaylist.value.songIds
        const nextIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0)) + 1
        currentSong.value = musicLibraryStore.getSongById(songIds[nextIndex]) || null;
      }
      else {
        const allSongs = musicLibraryStore.allSongs()
        const curSong = currentSong.value;
        if(curSong) {
          const nextIndex = allSongs.findIndex(song => song.id === (curSong.id)) + 1
          if(nextIndex < allSongs.length) {
            currentSong.value = allSongs[nextIndex];
          }
        }
      }
    }
  }

  function previousSong() {
    if (hasPreviousSong()) {
      if(currentPlaylist.value) {
        const songIds = currentPlaylist.value.songIds
        const prevIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0)) - 1
        currentSong.value = musicLibraryStore.getSongById(songIds[prevIndex]) || null;
      }
      else {
        const allSongs = musicLibraryStore.allSongs()
        const curSong = currentSong.value;
        if(curSong) {
          const prevIndex = allSongs.findIndex(song => song.id === (curSong.id)) - 1
          if(prevIndex >= 0) {
            currentSong.value = allSongs[prevIndex];
          }
        }
      }
    }
  }

  function hasNextSong() : boolean {
    if (currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const currentIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0))
      return currentIndex < songIds.length - 1
    }
    else {
      const allSongs = musicLibraryStore.allSongs()
      const curSong = currentSong.value;
      if(curSong) {
        const currentIndex = allSongs.findIndex(song => song.id === (curSong.id))
        return currentIndex < allSongs.length - 1
      }
    }
    return false
  }

  function hasPreviousSong() : boolean {
    if (currentPlaylist.value) {
      const songIds = currentPlaylist.value.songIds
      const currentIndex = songIds.findIndex(id => id === (currentSong.value?.id ?? 0))
      return currentIndex > 0
    }
    else {
      const allSongs = musicLibraryStore.allSongs()
      const curSong = currentSong.value;
      if(curSong) {
        const currentIndex = allSongs.findIndex(song => song.id === (curSong.id))
        return currentIndex > 0
      }
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
