<script setup lang="ts">
import { ref, computed } from 'vue'
import SongList from '../components/SongList.vue'
import { playlists, songs as allSongs } from '../data/mockData'
import type { Song } from '../types'

// TODO: Använd route params för att visa rätt spellista
// Just nu är playlist hårdkodat till första spellistan!
// 
// Importera och använd:
// import { useRoute } from 'vue-router'
// const route = useRoute()
// const playlistId = computed(() => Number(route.params.id))
// 
// Hämta spellista baserat på route param:
// import { useMusicLibraryStore } from '../stores/musicLibraryStore'
// const musicStore = useMusicLibraryStore()
// const playlist = computed(() => musicStore.getPlaylistById(playlistId.value))

// PROBLEM: Hårdkodat till första spellistan - oavsett vilken URL!
const playlist = ref(playlists[0])

// Hämta låtarna som tillhör spellistan
const playlistSongs = computed<Song[]>(() => {
  if (!playlist.value) return []
  return playlist.value.songIds
    .map(id => allSongs.find(song => song.id === id))
    .filter((song): song is Song => song !== undefined)
})
</script>

<template>
  <div class="playlist-detail-view">
    <div v-if="playlist" class="playlist-content">
      <!-- Header med spellistinfo -->
      <header class="playlist-header">
        <img :src="playlist.coverUrl" :alt="playlist.name" class="playlist-cover" />
        <div class="playlist-info">
          <span class="playlist-label">SPELLISTA</span>
          <h1>{{ playlist.name }}</h1>
          <p class="playlist-description">{{ playlist.description }}</p>
          <span class="playlist-meta">{{ playlistSongs.length }} låtar</span>
        </div>
      </header>

      <!-- Kontroller -->
      <div class="playlist-controls">
        <button class="play-all-btn">
          ▶ Spela alla
        </button>
      </div>

      <!-- Låtlista -->
      <section class="song-section">
        <div class="section-header">
          <span class="column-header index">#</span>
          <span class="column-header cover"></span>
          <span class="column-header title">Titel</span>
          <span class="column-header album">Album</span>
          <span class="column-header duration">⏱</span>
          <span class="column-header play"></span>
        </div>
        <SongList :songs="playlistSongs" />
      </section>
    </div>

    <div v-else class="not-found">
      <h2>Spellista hittades inte</h2>
      <p>Kontrollera att URL:en är korrekt.</p>
    </div>
  </div>
</template>

<style scoped>
.playlist-detail-view {
  padding-bottom: 120px;
}

.playlist-header {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  align-items: flex-end;
}

.playlist-cover {
  width: 232px;
  height: 232px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5);
}

.playlist-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.playlist-label {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.playlist-info h1 {
  color: #fff;
  font-size: 48px;
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
}

.playlist-description {
  color: #a0a0a0;
  font-size: 14px;
  margin: 8px 0 0 0;
}

.playlist-meta {
  color: #6a6a6a;
  font-size: 14px;
  margin-top: 8px;
}

.playlist-controls {
  margin-bottom: 24px;
}

.play-all-btn {
  background: #1db954;
  border: none;
  color: #000;
  font-size: 15px;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 32px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.play-all-btn:hover {
  background: #1ed760;
  transform: scale(1.04);
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

.not-found {
  text-align: center;
  padding: 80px 20px;
}

.not-found h2 {
  color: #fff;
  margin: 0 0 12px 0;
}

.not-found p {
  color: #a0a0a0;
  margin: 0;
}

@media (max-width: 768px) {
  .playlist-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .playlist-cover {
    width: 180px;
    height: 180px;
  }

  .playlist-info h1 {
    font-size: 28px;
  }

  .section-header {
    grid-template-columns: 32px 44px 1fr 60px 40px;
  }

  .column-header.album {
    display: none;
  }
}
</style>

