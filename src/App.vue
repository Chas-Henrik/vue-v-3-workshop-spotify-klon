<script setup lang="ts">
import { ref } from 'vue'
import MusicPlayer from './components/MusicPlayer.vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

// TODO: Det finns ingen routing än! 
// Skapa routes för /, /playlists, /playlists/:id, /search
// 
// I router/index.ts, lägg till routes.

// Ersätt sedan <Library /> nedan med <RouterView />
// Importera RouterView från vue-router:


// Vilket menyval är aktivt (funkar inte utan routing)
const activeView = ref('library')

// TODO: Ersätt denna funktion med <RouterLink> eller router.push()
const navigateTo = (view: string) => {
  activeView.value = view
  router.push({name: view}) // Navigera till den valda vyn

//activeView.value = view // Gör ingenting utan riktig routing
}
</script>

<template>
  <div class="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-brand">
        <span class="logo">VM</span>
        <span class="brand-name">VueMusic</span>
      </div>
      
      <div class="nav-links">
        <!-- TODO: Byt ut @click mot <RouterLink > -->
        <button 
          class="nav-btn" 
          :class="{ active: activeView === 'library' }"
          @click="navigateTo('library')"
        >
          Bibliotek
        </button>
        
        <!-- TODO: Byt ut mot <RouterLink > -->

        <button 
          class="nav-btn"
          :class="{ active: activeView === 'playlists' }"
          @click="navigateTo('playlists')"
        >
          Spellistor
        </button>
        
        <!-- TODO: Byt ut mot <RouterLink to="/search"> -->
        <button 
          class="nav-btn"
          :class="{ active: activeView === 'search' }"
          @click="navigateTo('search')"
        >
          🔍 Sök
        </button>
      </div>
    </nav>

    <!-- Main content -->
    <main class="main-content">
      <!-- TODO: Ersätt <Library /> med <RouterView /> -->
      <!-- Just nu visas alla vyer under varandra oavsett vad man klickar på -->
      <!-- <Library />
	  <Playlists />
	  <PlaylistDetail />
	  <Search /> -->
    <RouterView />
    </main>

    <!-- Music player (fixed at bottom) -->
    <MusicPlayer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1a2e 0%, #121212 30%);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 28px;
}

.brand-name {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  color: #fff;
  background: #1db954;
}

.main-content {
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 120px;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .nav-btn {
    padding: 8px 12px;
    font-size: 13px;
  }

  .main-content {
    padding: 16px;
  }
}
</style>
