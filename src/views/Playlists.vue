<script setup lang="ts">
import { ref } from 'vue'
import PlaylistCard from '../components/PlaylistCard.vue'

// TODO: Flytta playlists till musicLibraryStore istället för lokalt state
import { useMusicLibraryStore } from '../stores/musicLibraryStore.ts'
const musicStore = useMusicLibraryStore()

const playlists = ref(musicStore.playlistsData)
</script>

<template>
  <div class="playlists-view">
    <header class="view-header">
      <h1>Dina spellistor</h1>
      <p class="subtitle">{{ playlists.length }} spellistor</p>
    </header>

    <div class="playlists-grid">
      <PlaylistCard 
        v-for="playlist in playlists" 
        :key="playlist.id" 
        :playlist="playlist"
      />
    </div>
  </div>
</template>

<style scoped>
.playlists-view {
  padding-bottom: 120px;
}

.view-header {
  margin-bottom: 32px;
}

.view-header h1 {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #a0a0a0;
  font-size: 14px;
  margin: 0;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .playlists-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
</style>

