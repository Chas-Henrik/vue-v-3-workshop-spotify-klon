import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// TODO: Aktivera Vue Router
// 1. Importera routern:

// 2. Använd routern i appen:
app.use(router)
//
// 3. Se till att router/index.ts exporterar routes

// TODO: Aktivera Pinia
// 1. Importera Pinia:
import { createPinia } from 'pinia'
//
// 2. Skapa och använd Pinia:
const pinia = createPinia()
app.use(pinia)



// OBS: Router och Pinia är inte aktiverade än!
// Studenterna ska lägga till dessa själva.

app.mount('#app')

