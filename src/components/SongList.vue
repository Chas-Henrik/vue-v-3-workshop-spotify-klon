<script setup lang="ts">
import type { Song } from '../types'

// TODO: När användaren klickar "Spela", uppdatera playerStore
// istället för att bara logga. Importera och använd:
// import { usePlayerStore } from '../stores/playerStore'
// const playerStore = usePlayerStore()
// Skapa playerStore med:
// - state: currentSong, isPlaying
// - actions: playSong(song), pause(), togglePlay()

defineProps<{
  songs: Song[]
}>()

// Formatera tid till MM:SS
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// TODO: Byt ut console.log mot playerStore.playSong(song)
const handlePlay = (song: Song) => {
  console.log('Försöker spela:', song.title)
  console.log('Men ingenting händer... spelaren vet inte om detta!')
  // playerStore.playSong(song)
}
</script>

<template>
  <div class="song-list">
    <div 
      v-for="(song, index) in songs" 
      :key="song.id" 
      class="song-item"
    >
      <span class="song-index">{{ index + 1 }}</span>
      <img :src="song.coverUrl" :alt="song.title" class="song-cover" />
      <div class="song-info">
        <span class="song-title">{{ song.title }}</span>
        <span class="song-artist">{{ song.artist }}</span>
      </div>
      <span class="song-album">{{ song.album }}</span>
      <span class="song-duration">{{ formatDuration(song.duration) }}</span>
      <button class="play-btn" @click="handlePlay(song)" title="Spela">
        ▶
      </button>
    </div>
  </div>
</template>

<style scoped>
.song-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.song-item {
  display: grid;
  grid-template-columns: 40px 50px 1fr 1fr 80px 50px;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.song-index {
  color: #a0a0a0;
  font-size: 14px;
  text-align: center;
}

.song-cover {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  object-fit: cover;
}

.song-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.song-title {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  color: #a0a0a0;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-album {
  color: #a0a0a0;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-duration {
  color: #a0a0a0;
  font-size: 13px;
  text-align: right;
}

.play-btn {
  background: #1db954;
  border: none;
  color: #000;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s, transform 0.1s;
}

.song-item:hover .play-btn {
  opacity: 1;
}

.play-btn:hover {
  transform: scale(1.1);
  background: #1ed760;
}

@media (max-width: 768px) {
  .song-item {
    grid-template-columns: 32px 44px 1fr 60px 40px;
  }

  .song-album {
    display: none;
  }
}
</style>

