<script setup lang="ts">
import { ref, computed } from 'vue'
import SongList from '../components/SongList.vue'
import type { Song } from '../types'

// TODO: Implementera sökning med musicLibraryStore
// Importera och använd:
// import { useMusicLibraryStore } from '../stores/musicLibraryStore'
// const musicStore = useMusicLibraryStore()
// 
// Filtrera songs baserat på sökfrågan:
// const searchResults = computed(() => {
//   if (!searchQuery.value.trim()) return []
//   const query = searchQuery.value.toLowerCase()
//   return musicStore.songs.filter(song =>
//     song.title.toLowerCase().includes(query) ||
//     song.artist.toLowerCase().includes(query) ||
//     song.album.toLowerCase().includes(query)
//   )
// })

const searchQuery = ref('')

// PROBLEM: Sökresultaten är alltid tomma!
// Ingen koppling till musicLibraryStore
const searchResults = computed<Song[]>(() => {
  console.log('Söker efter:', searchQuery.value)
  console.log('Men det finns inga låtar att söka i... ingen store!')
  return [] // Alltid tomt!
})
</script>

<template>
  <div class="search-view">
    <header class="view-header">
      <h1>Sök</h1>
    </header>

    <!-- Sökfält -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Sök efter låtar, artister eller album..."
          class="search-input"
        />
        <button 
          v-if="searchQuery" 
          class="clear-btn"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Sökresultat -->
    <section v-if="searchQuery" class="results-section">
      <h2 class="results-title">
        Resultat för "{{ searchQuery }}"
      </h2>
      
      <div v-if="searchResults.length > 0" class="song-section">
        <SongList :songs="searchResults" />
      </div>

      <div v-else class="no-results">
        <div class="no-results-icon">🔎</div>
        <h3>Inga resultat hittades</h3>
        <p>Prova att söka efter något annat.</p>
        <p class="hint">Tips: Sökningen fungerar inte än - koppla till musicLibraryStore!</p>
      </div>
    </section>

    <!-- Startläge -->
    <section v-else class="empty-state">
      <div class="empty-icon">🎵</div>
      <h2>Vad vill du lyssna på?</h2>
      <p>Sök efter dina favoritlåtar, artister eller album</p>
    </section>
  </div>
</template>

<style scoped>
.search-view {
  padding-bottom: 120px;
}

.view-header {
  margin-bottom: 24px;
}

.view-header h1 {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.search-container {
  margin-bottom: 32px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  font-size: 18px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 14px 44px;
  font-size: 15px;
  background: #242424;
  border: 2px solid transparent;
  border-radius: 24px;
  color: #fff;
  transition: border-color 0.2s, background-color 0.2s;
}

.search-input::placeholder {
  color: #6a6a6a;
}

.search-input:focus {
  outline: none;
  border-color: #1db954;
  background: #282828;
}

.clear-btn {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
}

.clear-btn:hover {
  color: #fff;
}

.results-section {
  margin-top: 24px;
}

.results-title {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
}

.song-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
}

.no-results,
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.no-results-icon,
.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.no-results h3,
.empty-state h2 {
  color: #fff;
  font-size: 24px;
  margin: 0 0 12px 0;
}

.no-results p,
.empty-state p {
  color: #a0a0a0;
  font-size: 15px;
  margin: 0 0 8px 0;
}

.hint {
  color: #1db954;
  font-size: 13px;
  font-style: italic;
  margin-top: 16px !important;
}
</style>

