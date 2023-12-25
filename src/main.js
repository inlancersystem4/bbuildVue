import './assets/css/style.css'
import './assets/css/base.css'
import './assets/css/common.css'
import './assets/css/responsive.css'
import './assets/css/common-responsive.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'
import Notifications from 'notiwind'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.mount('#app')
