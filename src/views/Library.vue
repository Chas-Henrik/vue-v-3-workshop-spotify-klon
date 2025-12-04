<script setup lang="ts">
import { ref } from 'vue'
import SongList from '../components/SongList.vue'

// TODO: Flytta songs till musicLibraryStore istället för lokalt state
// Skapa stores/musicLibraryStore.ts med:
// - state: songs, playlists
// - getters: allSongs, getSongById(id), getPlaylistById(id)
// Importera och använd sedan:
import { useMusicLibraryStore } from '../stores/musicLibraryStore.ts'
const musicStore = useMusicLibraryStore()
// Använd musicStore.songs istället för lokalt state

const songs = ref(musicStore.songsData)
</script>

<template>
  <div class="library-view">
    <header class="view-header">
      <h1>Ditt bibliotek</h1>
      <p class="subtitle">{{ songs.length }} låtar i ditt bibliotek</p>
    </header>

    <section class="song-section">
      <div class="section-header">
        <span class="column-header index">#</span>
        <span class="column-header cover"></span>
        <span class="column-header title">Titel</span>
        <span class="column-header album">Album</span>
        <span class="column-header duration">⏱</span>
        <span class="column-header play"></span>
      </div>
      <SongList :songs="songs" />
    </section>
  </div>
</template>

<style scoped>
.library-view {
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

.song-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
}

.section-header {
  display: grid;
  grid-template-columns: 40px 50px 1fr 1fr 80px 50px;
  gap: 16px;
  padding: 0 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
}

.column-header {
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.column-header.index {
  text-align: center;
}

.column-header.duration {
  text-align: right;
}

@media (max-width: 768px) {
  .section-header {
    grid-template-columns: 32px 44px 1fr 60px 40px;
  }

  .column-header.album {
    display: none;
  }
}
</style>

