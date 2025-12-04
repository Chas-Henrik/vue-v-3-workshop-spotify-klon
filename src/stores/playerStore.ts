import { defineStore } from 'pinia'
import { computed, ref, watch } from "vue"
import type { Playlist, Song } from '../types'
import { useMusicLibraryStore } from './musicLibraryStore'

export const usePlayerStore = defineStore('player-store', () => {
  const musicLibraryStore = useMusicLibraryStore()
  const currentPlaylist = ref<Playlist | null>(null)
  const currentSong = ref<Song | null>(null)
  
  const isPlaying = ref<boolean>(false)
  const currentTime = ref<number>(0)

  const duration = computed<number>(() => {
    return currentSong.value ? currentSong.value.duration : 0
  })

  const progress = computed<number>(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  let timerInterval: number | null = null

  // Watch isPlaying and start/stop timer
  watch(isPlaying, (playing) => {
    if (playing) {
      // Start timer
      timerInterval = window.setInterval(() => {
        if (currentTime.value < duration.value) {
          currentTime.value += 1
        } else {
          // Song finished
          currentTime.value = 0
          if (hasNextSong()) {
            nextSong()
          }
          else {
            isPlaying.value = false
          }
        }
      }, 1000)
    } else {
      // Stop timer
      if (timerInterval !== null) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    }
  })

  function playSong(song : Song) {
    currentSong.value = song
    currentTime.value = 0
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
        currentTime.value = 0
      }
      else {
        const allSongs = musicLibraryStore.allSongs()
        const curSong = currentSong.value;
        if(curSong) {
          const nextIndex = allSongs.findIndex(song => song.id === (curSong.id)) + 1
          if(nextIndex < allSongs.length) {
            currentSong.value = allSongs[nextIndex];
            currentTime.value = 0
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
        currentTime.value = 0
      }
      else {
        const allSongs = musicLibraryStore.allSongs()
        const curSong = currentSong.value;
        if(curSong) {
          const prevIndex = allSongs.findIndex(song => song.id === (curSong.id)) - 1
          if(prevIndex >= 0) {
            currentSong.value = allSongs[prevIndex];
            currentTime.value = 0
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

  return {
    currentSong,
    currentPlaylist,
    isPlaying,
    currentTime,   
    duration,
    progress,
    playSong,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    hasNextSong,
    hasPreviousSong,
  }
})
