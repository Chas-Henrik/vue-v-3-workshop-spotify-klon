<script setup lang="ts">

// TODO: Denna komponent visar "Spelas nu" men vet inte vad som spelas!
// Hämta currentSong och isPlaying från playerStore:
import { usePlayerStore } from '../stores/playerStore'
import { storeToRefs } from 'pinia'

const playerStore = usePlayerStore()
const { currentSong, isPlaying } = storeToRefs(playerStore)

</script>

<template>
  <div class="now-playing">
    <h3 class="section-title">Spelas nu</h3>
    
    <div v-if="currentSong" class="now-playing-content">
      <img :src="currentSong.coverUrl" :alt="currentSong.title" class="album-art" />
      <div class="song-details">
        <span class="song-title">{{ currentSong.title }}</span>
        <span class="song-artist">{{ currentSong.artist }}</span>
        <span class="playing-status" :class="{ active: isPlaying }">
          {{ isPlaying ? '🎵 Spelar' : '⏸ Pausad' }}
        </span>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <div class="empty-icon">🎧</div>
      <p>Ingen låt spelas just nu</p>
      <span class="hint">Välj en låt från biblioteket</span>
    </div>
  </div>
</template>

<style scoped>
.now-playing {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 12px;
  padding: 20px;
  min-width: 280px;
}

.section-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.now-playing-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.album-art {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.song-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.song-title {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.song-artist {
  color: #a0a0a0;
  font-size: 14px;
}

.playing-status {
  color: #6a6a6a;
  font-size: 12px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 8px;
}

.playing-status.active {
  color: #1db954;
  background: rgba(29, 185, 84, 0.15);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  opacity: 0.5;
}

.empty-state p {
  color: #a0a0a0;
  font-size: 15px;
  margin: 0;
}

.hint {
  color: #6a6a6a;
  font-size: 13px;
}
</style>

