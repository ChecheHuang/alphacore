import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/utils/queryClient'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// 初始化認證狀態
const authStore = useAuthStore()
authStore.initAuth()

app.use(router)
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(Quasar, {
  plugins: {
    Notify,
  },
})

app.mount('#app')
