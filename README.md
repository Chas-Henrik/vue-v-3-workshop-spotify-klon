# Musikspelare Workshop - Vue Router & Pinia

Idag bygger vi en fungerande musikspelare genom att lägga till **routing** och **state management** till en existerande applikation som har tydliga brister.

Projektet ni får innehåller en musikspelare-UI som ser ut som Spotify-ish men som inte riktigt fungerar. Alla komponenter och vyer finns redan, men de använder lokalt state och det finns ingen routing. Er uppgift är att identifiera problemen och fixa dem med Vue Router och Pinia.

---

## Kom igång

### 1) Installation

```bash
npm install
npm run dev
```

### 2) Utforska projektet

Öppna applikationen i webbläsaren och testa följande:

1. Klicka på "Spela" på olika låtar - vad händer?
2. Titta i konsolen - vad loggas?
3. Går det att navigera mellan Bibliotek, Spellistor och Sök? (ledande fråga :))
4. Uppdateras ljudspelaren längst ner när du klickar på låtar? (också ledande fråga :))

Varför fungerar det inte som förväntat? Kan det ha med routing och state att göra? :)

### 3) Strukturen

Projektet innehåller:

```
src/
├── components/
│   ├── MusicPlayer.vue       # Spelare (lokalt state - fungerar inte)
│   ├── SongList.vue          # Låtlista
│   ├── PlaylistCard.vue      # Presentationskomponent
│   └── NowPlaying.vue        # "Nuvarande låt"-vy
├── views/
│   ├── Library.vue           # Huvudvy med alla låtar
│   ├── Playlists.vue         # Översikt spellistor
│   ├── PlaylistDetail.vue    # Detaljer för en spellista
│   └── Search.vue            # Sökfunktion
└── data/
    └── mockData.js           # Dummy-data
```

---

## Uppgifter

### Del 1: Få en överblick över struktur och projekt

**Ta reda på vad som behöver fixas till:**

1. Öppna `MusicPlayer.vue` - vilket state används? Vad händer när någon annan komponent vill spela en låt?
2. Öppna `SongList.vue` - vad händer i `handlePlay`-funktionen?
3. Öppna `App.vue` - hur navigerar man mellan vyer? Gör man det ens?
4. Öppna `PlaylistDetail.vue` - hur vet den vilken spellista som ska visas?

**Fundera:**
- Varför är lokalt state ett problem här?
- Vilka komponenter behöver dela data?
- Vilka routes behöver vi här?

---

### Del 2: Implementera Pinia stores

Pinia är redan installerat om ni kört npm install därför kan ni direkt börja skapa stores.

#### 2.2 Skapa `playerStore.js`

Skapa filen `src/stores/playerStore.js` med följande state och actions:

**State:**
- `currentSong` (null eller song-objekt)
- `isPlaying` (boolean)
- `currentTime` (number, sekunder)
- `duration` (number, sekunder)

**Actions:**
- `playSong(song)` - Sätt currentSong och isPlaying = true
- `pause()` - Sätt isPlaying = false
- `togglePlay()` - Växla mellan play/pause
- `nextSong()` - Spela nästa låt (använd musicLibraryStore)
- `previousSong()` - Spela föregående låt

**Getters:**
- `hasNext` - Finns det en nästa låt?
- `hasPrevious` - Finns det en föregående låt?
- `progress` - Nuvarande progress i procent

#### 2.3 Skapa `musicLibraryStore.js`

Skapa filen `src/stores/musicLibraryStore.js`:

**State:**
- `songs` (importera från mockData)
- `playlists` (importera från mockData)

**Getters:**
- `allSongs` - Returnera alla låtar
- `getSongById(id)` - Hitta specifik låt
- `getPlaylistById(id)` - Hitta specifik spellista
- `getPlaylistSongs(playlistId)` - Hämta alla låtar för en spellista

**Actions (om ni hinner implementera sök):**
- `searchSongs(query)` - Filtrera låtar baserat på sökord

#### 2.4 Uppdatera komponenterna

**MusicPlayer.vue:**
- Ta bort lokalt state
- Använd `const playerStore = usePlayerStore()`
- Visa `playerStore.currentSong` istället för lokalt state
- Använd actions för play/pause/next/previous

**SongList.vue:**
- I `playSong`-funktionen: anropa `playerStore.playSong(song)` istället för console.log

**Library.vue:**
- Ta bort lokalt state
- Använd `const musicLibraryStore = useMusicLibraryStore()`
- Hämta låtar från store: `musicLibraryStore.allSongs`

**Playlists.vue:**
- Använd `musicLibraryStore.playlists` istället för lokalt state

---

### Del 3: Lägg till Vue Router

Vue Router är redan installerat, det ni behöver göra är att lägga till korrekta routes till:
- Library
- Playlists
- PlaylistDetail
- Search

#### 3.1 Skapa router-konfiguration

Skapa filen `src/router/index.js` med följande routes:

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = []

// Skapa och exportera router
```

Registrera router i `main.js`:

```javascript
import router from './router'
app.use(router)
```

#### 3.2 Uppdatera App.vue

- Ersätt `<Library />` med `<RouterView />`
- Uppdatera navbar-knapparna till `<RouterLink>` istället för vanliga knappar

#### 3.3 Använd dynamic routes (för spellistorna)

**PlaylistDetail.vue:**
- Använd `const route = useRoute()`
- Hämta playlist-ID från `route.params.id`
- Använd `musicLibraryStore.getPlaylistById(route.params.id)` för att hämta rätt spellista

**PlaylistCard.vue:**
- Gör hela kortet klickbart med `<RouterLink :to="'/playlists/' + playlist.id">`

---

### Del 4: Få allt att fungera

Testa följande scenarion:

1. Klicka på en låt i Library - spelar den i MusicPlayer?
2. Klicka på en spellista - kommer du till rätt detaljvy?
3. Kan du navigera mellan vyerna med navbar?
4. Fungerar nästa/föregående-knapparna i spelaren?
5. Uppdateras URL:en korrekt?

**Fixa eventuella buggar och förbättra UX:**
- Markera aktiv route i navigation
- Visa vilket spår som spelas just nu (highlight i låtlistan)
- Hantera edge cases (vad händer om man försöker gå till /playlists/999?)

---

## Extra utmaningar

### Navigation Guards

Lägg till en "Premium"-spellista och använd `beforeEnter` guard:

```javascript
{
  path: '/playlists/:id',
  component: PlaylistDetail,
  beforeEnter: (to, from) => {
    // Om playlist.premium === true, kräv att user.premium === true
    // Annars redirect till /premium-required
  }
}
```

### Om ni hinner hit, implementera sökfunktion.

Implementera real-time sökning i `Search.vue`:
- Input-fält med `v-model`
- Använd computed property för att filtrera låtar
- Visa resultat i `<SongList>`

### Persistence

Spara senast spelade låt till localStorage:
- När `currentSong` ändras i playerStore, spara till localStorage
- Vid app-start, återställ från localStorage om det finns

---

## Resurser

**Vue Router:**
- [Officiell dokumentation](https://router.vuejs.org/)
- [Dynamic Route Matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
- [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

**Pinia:**
- [Officiell dokumentation](https://pinia.vuejs.org/)
- [Defining a Store](https://pinia.vuejs.org/core-concepts/)
- [Getters](https://pinia.vuejs.org/core-concepts/getters.html)
- [Actions](https://pinia.vuejs.org/core-concepts/actions.html)