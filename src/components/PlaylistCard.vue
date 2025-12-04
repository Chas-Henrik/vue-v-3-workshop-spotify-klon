<script setup lang="ts">
import type { Playlist } from '../types'
import router from '../router'

defineProps<{
  playlist: Playlist
}>()

// TODO: När användaren klickar på kortet, navigera till /playlists/:id
// Använd useRouter från vue-router:
// import { useRouter } from 'vue-router'
// const router = useRouter()
// router.push(`/playlists/${playlist.id}`)

const handleClick = (playlist: Playlist) => {
  router.push(`/playlists/${playlist.id}`)
}
</script>

<template>
  <div class="playlist-card" @click="handleClick(playlist)">
    <img :src="playlist.coverUrl" :alt="playlist.name" class="playlist-cover" />
    <div class="playlist-info">
      <h3 class="playlist-name">{{ playlist.name }}</h3>
      <p class="playlist-description">{{ playlist.description }}</p>
      <span class="playlist-count">{{ playlist.songIds.length }} låtar</span>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  background: #181818;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.playlist-card:hover {
  background: #282828;
  transform: translateY(-4px);
}

.playlist-cover {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.playlist-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.playlist-name {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-description {
  color: #a0a0a0;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.playlist-count {
  color: #6a6a6a;
  font-size: 12px;
  margin-top: 4px;
}
</style>

