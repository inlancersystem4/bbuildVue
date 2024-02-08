import './assets/css/style.css'
import './assets/css/base.css'
import './assets/css/common.css'
import './assets/css/responsive.css'
import './assets/css/common-responsive.css'


import './index.css'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';
import 'v-calendar/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSimpleContextMenu from 'vue-simple-context-menu';
import VCalendar from 'v-calendar';

import App from './App.vue'
import router from './router'

import Notifications from 'notiwind'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(VCalendar, {})
app.component('vue-simple-context-menu', VueSimpleContextMenu);
app.mount('#app')