<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '../stores/playerStore.ts'

// TODO: Denna komponent använder lokalt state.
// Flytta state till playerStore så att andra komponenter kan styra spelaren!
// State att flytta: currentSong, isPlaying, currentTime, duration
// Skapa stores/playerStore.ts med:
// - state: currentSong, isPlaying, currentTime
// - actions: playSong(song), pause(), resume(), togglePlay()

const playerStore = usePlayerStore()
const { currentSong, currentTime, duration, progress, isPlaying } = storeToRefs(playerStore)


// Formatera tid till MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Beräkna progress i procent

// TODO: Dessa funktioner bör anropa playerStore actions istället

</script>

<template>
  <div class="music-player">
    <div class="player-content">
      <!-- Låtinfo -->
      <div class="song-info">
        <img 
          v-if="currentSong" 
          :src="currentSong.coverUrl" 
          :alt="currentSong.title"
          class="cover-thumbnail"
        />
        <div v-else class="cover-placeholder">
          <span>🎵</span>
        </div>
        <div class="song-details">
          <span class="song-title">{{ currentSong?.title || 'Ingen låt vald' }}</span>
          <span class="song-artist">{{ currentSong?.artist || 'Välj en låt att spela' }}</span>
        </div>
      </div>

      <!-- Kontroller -->
      <div class="player-controls">
        <button class="control-btn" @click="playerStore.previousSong" title="Föregående" :disabled="!playerStore.hasPreviousSong()">
          ⏮
        </button>
        <button class="control-btn play-btn" @click="playerStore.togglePlay" :title="isPlaying ? 'Pausa' : 'Spela'">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" @click="playerStore.nextSong" title="Nästa" :disabled="!playerStore.hasNextSong()">
          ⏭
        </button>
      </div>

      <!-- Progress bar -->
      <div class="progress-section">
        <span class="time">{{ formatTime(currentTime) }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="time">{{ currentSong ? formatTime(duration) : '0:00' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: linear-gradient(to top, #0a0a0a, #1a1a1a);
  border-top: 1px solid #282828;
  padding: 0 24px;
  display: flex;
  align-items: center;
  z-index: 100;
}

.player-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 180px;
}

.cover-thumbnail {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  object-fit: cover;
}

.cover-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background: #282828;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.song-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.song-title {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.song-artist {
  color: #a0a0a0;
  font-size: 12px;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.control-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s, transform 0.1s;
  border-radius: 50%;
}

.control-btn:hover {
  color: #fff;
  transform: scale(1.1);
}

.control-btn:disabled {
  color: #4d4d4d;
  cursor: default;
  transform: none;
}

.play-btn {
  background: #1db954;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.play-btn:hover {
  background: #1ed760;
  transform: scale(1.05);
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.time {
  color: #a0a0a0;
  font-size: 11px;
  min-width: 40px;
  text-align: center;
}

.progress-bar {
  width: 200px;
  height: 4px;
  background: #4d4d4d;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  transition: width 0.1s;
}

@media (max-width: 768px) {
  .progress-section {
    display: none;
  }

  .song-info {
    flex: none;
  }
}
</style>

