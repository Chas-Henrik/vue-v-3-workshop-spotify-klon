import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// TODO: Aktivera Vue Router
// 1. Importera routern:
// import router from './router'
//
// 2. Använd routern i appen:
// app.use(router)
//
// 3. Se till att router/index.ts exporterar routes

// TODO: Aktivera Pinia
// 1. Importera Pinia:
// import { createPinia } from 'pinia'
//
// 2. Skapa och använd Pinia:
// const pinia = createPinia()
// app.use(pinia)

const app = createApp(App)

// OBS: Router och Pinia är inte aktiverade än!
// Studenterna ska lägga till dessa själva.

app.mount('#app')

