import { createRouter, createWebHistory } from 'vue-router'

// TODO: Importera view-komponenter
// import Library from '../views/Library.vue'
// import Playlists from '../views/Playlists.vue'
// import PlaylistDetail from '../views/PlaylistDetail.vue'
// import Search from '../views/Search.vue'

// TODO: Definiera routes för appen
// const routes = [
//   { 
//     path: '/', 
//     name: 'library',
//     component: Library 
//   },
//   { 
//     path: '/playlists', 
//     name: 'playlists',
//     component: Playlists 
//   },
//   { 
//     path: '/playlists/:id', 
//     name: 'playlist-detail',
//     component: PlaylistDetail 
//   },
//   { 
//     path: '/search', 
//     name: 'search',
//     component: Search 
//   }
// ]

// TODO: Skapa och exportera routern
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })
// 
// export default router

// Temporär tom export så att filen inte ger felmeddelanden
const router = createRouter({
  history: createWebHistory(),
  routes: []
})

export default router
