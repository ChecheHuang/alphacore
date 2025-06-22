import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'
import { authApi, ordersApi, type OrdersQueryParams } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

// 登入相關查詢
export const useAuth = () => {
  const queryClient = useQueryClient()
  const authStore = useAuthStore()

  // 登入 mutation
  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: (data) => {
      // 使用 Pinia store 來管理登入狀態
      if (data.data) {
        authStore.login(data.data)
      }
      // 清除並重新整理所有查詢快取
      queryClient.invalidateQueries()
    },
  })

  // 登出函式
  const logout = () => {
    // 使用 Pinia store 來清除登入狀態
    authStore.logout()
    // 清除所有查詢快取
    queryClient.clear()
  }

  return {
    loginMutation,
    logout,
  }
}

// 訂單相關查詢
export const useOrders = () => {
  // 取得訂單列表查詢
  const getOrdersQuery = (params?: OrdersQueryParams) => {
    return useQuery({
      queryKey: ['orders', params],
      queryFn: () => ordersApi.getOrders(params),
    })
  }

  return {
    getOrdersQuery,
  }
}
