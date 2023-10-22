import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueLazyload from 'vue-lazyload' // Import Vue Lazyload
import errorimage from './assets/error.png';
// import loadimage from './assets/barcode.png';


library.add(fas)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)


app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  // loading: loadimage,
  attempt: 1
})

app.mount('#app')
