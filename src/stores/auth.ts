import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  username: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  // 狀態
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // 計算屬性
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 初始化 - 從 localStorage 讀取資料
  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUserId = localStorage.getItem('userId')
    const savedUsername = localStorage.getItem('username')

    if (savedToken && savedUserId && savedUsername) {
      token.value = savedToken
      user.value = {
        id: parseInt(savedUserId),
        username: savedUsername,
        token: savedToken,
      }
    }
  }

  // 登入
  const login = (userData: { id: number; username: string; token: string }) => {
    user.value = userData
    token.value = userData.token

    // 儲存到 localStorage
    localStorage.setItem('token', userData.token)
    localStorage.setItem('userId', userData.id.toString())
    localStorage.setItem('username', userData.username)
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null

    // 清除 localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
  }

  // 檢查認證狀態
  const checkAuth = () => {
    const savedToken = localStorage.getItem('token')
    return !!savedToken && isAuthenticated.value
  }

  return {
    // 狀態
    user,
    token,

    // 計算屬性
    isAuthenticated,

    // 動作
    initAuth,
    login,
    logout,
    checkAuth,
  }
})
