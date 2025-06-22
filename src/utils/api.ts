import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

// 建立 axios 實例
const api = axios.create({
  baseURL: 'https://dev.tapgo.cc/test',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    // 可以在這裡添加認證 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 回應攔截器
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 處理全域錯誤
    if (error.response?.status === 401) {
      // 未授權，清除認證狀態並導向登入頁
      const authStore = useAuthStore()
      authStore.logout()

      // 只有在不是登入頁面時才跳轉
      if (router.currentRoute.value.name !== 'login') {
        router.push({ name: 'login' })
      }
    }
    return Promise.reject(error)
  },
)

export default api
