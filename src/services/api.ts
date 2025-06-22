import api from '@/utils/api'

// 定義登入請求資料類型
export interface LoginRequest {
  username: string
  password: string
}

// 定義登入回應資料類型
export interface LoginResponse {
  token: string
  id: number
  username: string
}

// 定義訂單查詢參數類型
export interface OrdersQueryParams {
  city?: string[]
  delivery_date?: string
  financial_status?: 'paid' | 'pending' | 'refunded'
  fulfillment_status?: 'received' | 'preparing'
  is_descending?: boolean
  order_status?: 'open' | 'cancelled' | 'closed'
  page?: number
  size?: number
  sort_by?:
    | 'created_at'
    | 'order_name'
    | 'order_status'
    | 'financial_status'
    | 'fulfillment_status'
    | 'receiver_address'
    | 'delivery_date'
    | 'total_price'
}

// 登入相關 API
export const authApi = {
  // 登入
  login: (username: string, password: string) => {
    return api.post<LoginResponse>('/auth/login', { username, password })
  },
}

interface Order {
  content: Content[]
  pageable: Pageable
  total_pages: number
  total_elements: number
  last: boolean
  size: number
  number: number
  sort: Sort
  number_of_elements: number
  first: boolean
  empty: boolean
}
interface Pageable {
  sort: Sort
  offset: number
  page_number: number
  page_size: number
  paged: boolean
  unpaged: boolean
}
interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
interface Content {
  id: number
  order_name: string
  customer_name: string
  order_status: string
  financial_status: string
  fulfillment_status: string
  created_at: string
  total_price: number
  receiver_address: string
  delivery_date: string
  note: string
  delivery_time: string
  shipping_name?: null
  city: string
  district: string
  internal_note: string
}
// 訂單相關 API
export const ordersApi = {
  // 取得訂單列表
  getOrders: (params?: OrdersQueryParams) => {
    return api.get<Order>('/orders', { params })
  },
}
