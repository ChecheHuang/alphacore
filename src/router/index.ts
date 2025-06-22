import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true, // 已登入用戶不應該看到登入頁面
      },
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
      meta: {
        requiresAuth: true, // 需要認證
      },
    },
  ],
})

// 路由守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 初始化認證狀態（從 localStorage 讀取）
  authStore.initAuth()

  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !isAuthenticated) {
    // 需要認證但未登入，導向登入頁面
    next({ name: 'login' })
  } else if (requiresGuest && isAuthenticated) {
    // 已登入用戶訪問登入頁面，導向列表頁面
    next({ name: 'list' })
  } else {
    // 允許訪問
    next()
  }
})

export default router
