// 選項資料
export const cityOptions = [
  { label: '台北市', value: '台北市' },
  { label: '新北市', value: '新北市' },
  { label: '新竹市', value: '新竹市' },
  { label: '台南市', value: '台南市' },
  { label: '高雄市', value: '高雄市' },
]

export const financialStatusOptions = [
  { label: '已付款', value: 'paid' },
  { label: '待付款', value: 'pending' },
  { label: '已退款', value: 'refunded' },
]

export const fulfillmentStatusOptions = [
  { label: '已接收', value: 'received' },
  { label: '準備中', value: 'preparing' },
]

export const orderStatusOptions = [
  { label: '開啟', value: 'open' },
  { label: '已取消', value: 'cancelled' },
  { label: '已關閉', value: 'closed' },
]

// 表格欄位定義
export const columns = [
  {
    name: 'order_name',
    label: '訂單編號',
    field: 'order_name',
    align: 'left' as const,
    sortable: true,
  },
  {
    name: 'customer_name',
    label: '客戶姓名',
    field: 'customer_name',
    align: 'left' as const,
    // sortable: true,
  },
  {
    name: 'order_status',
    label: '訂單狀態',
    field: 'order_status',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'financial_status',
    label: '付款狀態',
    field: 'financial_status',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'fulfillment_status',
    label: '運送狀態',
    field: 'fulfillment_status',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'receiver_address',
    label: '客戶地址',
    field: 'receiver_address',
    align: 'left' as const,
  },
  {
    name: 'delivery_date',
    label: '運送日期',
    field: 'delivery_date',
    align: 'center' as const,
    sortable: true,
  },
  {
    name: 'total_price',
    label: '總消費金額',
    field: 'total_price',
    align: 'right' as const,
    sortable: true,
  },
  {
    name: 'created_at',
    label: '建立時間',
    field: 'created_at',
    align: 'center' as const,
    sortable: true,
  },
]

// 狀態顏色和標籤函式
export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'green'
    case 'cancelled':
      return 'red'
    case 'closed':
      return 'grey'
    default:
      return 'grey'
  }
}

export const getOrderStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return '開啟'
    case 'cancelled':
      return '已取消'
    case 'closed':
      return '已關閉'
    default:
      return status
  }
}

export const getFinancialStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'green'
    case 'pending':
      return 'orange'
    case 'refunded':
      return 'red'
    default:
      return 'grey'
  }
}

export const getFinancialStatusLabel = (status: string) => {
  switch (status) {
    case 'paid':
      return '已付款'
    case 'pending':
      return '待付款'
    case 'refunded':
      return '已退款'
    default:
      return status
  }
}

export const getFulfillmentStatusColor = (status: string) => {
  switch (status) {
    case 'received':
      return 'blue'
    case 'preparing':
      return 'orange'
    default:
      return 'grey'
  }
}

export const getFulfillmentStatusLabel = (status: string) => {
  switch (status) {
    case 'received':
      return '已接收'
    case 'preparing':
      return '準備中'
    default:
      return status
  }
}

// 格式化日期
export const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-TW')
}
