import { QueryClient } from '@tanstack/vue-query'

// 建立全域 QueryClient 設定
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
      gcTime: 10 * 60 * 1000, // 10 分鐘後清除快取
      retry: 2, // 失敗時重試 2 次
      refetchOnWindowFocus: false, // 視窗重新聚焦時不自動重新整理
    },
    mutations: {
      retry: 1, // mutation 失敗時重試 1 次
    },
  },
})
