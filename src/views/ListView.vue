<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="list" class="q-mr-sm" />
          訂單清單
        </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="handleLogout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <!-- 篩選器區域 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">篩選器</div>
            <div class="row q-gutter-md">
              <!-- 城市篩選 -->
              <div class="col-12 col-md-3">
                <q-select
                  v-model="queryParams.city"
                  :options="cityOptions"
                  label="城市"
                  multiple
                  use-chips
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <!-- 配送日期 -->
              <div class="col-12 col-md-3">
                <q-input
                  v-model="queryParams.delivery_date"
                  label="配送日期"
                  type="date"
                  clearable
                />
              </div>

              <!-- 付款狀態 -->
              <div class="col-12 col-md-2">
                <q-select
                  v-model="queryParams.financial_status"
                  :options="financialStatusOptions"
                  label="付款狀態"
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <!-- 物流狀態 -->
              <div class="col-12 col-md-2">
                <q-select
                  v-model="queryParams.fulfillment_status"
                  :options="fulfillmentStatusOptions"
                  label="物流狀態"
                  emit-value
                  map-options
                  clearable
                />
              </div>

              <!-- 訂單狀態 -->
              <div class="col-12 col-md-2">
                <q-select
                  v-model="queryParams.order_status"
                  :options="orderStatusOptions"
                  label="訂單狀態"
                  emit-value
                  map-options
                  clearable
                />
              </div>
            </div>

            <div class="row q-gutter-md q-mt-md">
              <!-- 重置按鈕 -->
              <div class="col-12 col-md-2">
                <q-btn color="grey" outline label="重置" icon="refresh" @click="reset" />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <!-- 資料表格 -->
        <div class="q-pa-md">
          <q-table
            :rows="ordersQuery.data.value?.data?.content || []"
            :columns="columns"
            :loading="ordersQuery.isLoading.value"
            v-model:pagination="tablePagination"
            @request="onRequest"
            row-key="id"
            flat
            bordered
            binary-state-sort
            hide-pagination
          >
            <!-- 訂單狀態自定義顯示 -->
            <template #body-cell-order_status="props">
              <q-td :props="props">
                <q-chip
                  :color="getOrderStatusColor(props.value)"
                  text-color="white"
                  :label="getOrderStatusLabel(props.value)"
                  size="sm"
                />
              </q-td>
            </template>

            <!-- 付款狀態自定義顯示 -->
            <template #body-cell-financial_status="props">
              <q-td :props="props">
                <q-chip
                  :color="getFinancialStatusColor(props.value)"
                  text-color="white"
                  :label="getFinancialStatusLabel(props.value)"
                  size="sm"
                />
              </q-td>
            </template>

            <!-- 運送狀態自定義顯示 -->
            <template #body-cell-fulfillment_status="props">
              <q-td :props="props">
                <q-chip
                  :color="getFulfillmentStatusColor(props.value)"
                  text-color="white"
                  :label="getFulfillmentStatusLabel(props.value)"
                  size="sm"
                />
              </q-td>
            </template>

            <!-- 運送日期格式化顯示 -->
            <template #body-cell-delivery_date="props">
              <q-td :props="props">
                {{ formatDate(props.value) }}
              </q-td>
            </template>

            <!-- 建立時間格式化顯示 -->
            <template #body-cell-created_at="props">
              <q-td :props="props">
                {{ formatDate(props.value) }}
              </q-td>
            </template>

            <!-- 總消費金額格式化顯示 -->
            <template #body-cell-total_price="props">
              <q-td :props="props"> ${{ props.value?.toLocaleString() }} </q-td>
            </template>
          </q-table>

          <!-- 自定義分頁控制器 -->
          <div class="row justify-between items-center q-pa-md custom-pagination">
            <div class="text-grey-7">
              顯示
              {{ (queryParams.size || 20) * ((queryParams.page || 1) - 1) + 1 }} 到
              {{
                Math.min(
                  (queryParams.size || 20) * (queryParams.page || 1),
                  ordersQuery.data.value?.data?.total_elements || 0,
                )
              }}
              筆，共 {{ ordersQuery.data.value?.data?.total_elements || 0 }} 筆
            </div>

            <div class="row items-center q-gutter-sm">
              <!-- 每頁顯示筆數 -->
              <q-select
                v-model="queryParams.size"
                :options="[10, 20, 50, 100]"
                dense
                outlined
                label="每頁筆數"
                style="min-width: 100px"
                @update:model-value="handlePageSizeChange"
              />

              <!-- 分頁按鈕 -->
              <q-btn
                flat
                round
                dense
                icon="first_page"
                :disable="(queryParams.page || 1) === 1"
                @click="goToPage(1)"
              />

              <q-btn
                flat
                round
                dense
                icon="navigate_before"
                :disable="(queryParams.page || 1) === 1"
                @click="goToPage((queryParams.page || 1) - 1)"
              />

              <div class="" style="margin: 0">{{ queryParams.page || 1 }} / {{ totalPages }}</div>

              <q-btn
                flat
                round
                dense
                icon="navigate_next"
                :disable="(queryParams.page || 1) >= totalPages"
                @click="goToPage((queryParams.page || 1) + 1)"
              />

              <q-btn
                flat
                round
                dense
                icon="last_page"
                :disable="(queryParams.page || 1) >= totalPages"
                @click="goToPage(totalPages)"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from '@/composables/useApi'
import type { OrdersQueryParams } from '@/services/api'
import {
  cityOptions,
  financialStatusOptions,
  fulfillmentStatusOptions,
  orderStatusOptions,
  columns,
  getOrderStatusColor,
  getOrderStatusLabel,
  getFinancialStatusColor,
  getFinancialStatusLabel,
  getFulfillmentStatusColor,
  getFulfillmentStatusLabel,
  formatDate,
} from './ListView.constants'
import { useQuery } from '@tanstack/vue-query'
import { ordersApi } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const $q = useQuasar()
const { logout: apiLogout } = useAuth()

const authStore = useAuthStore()

const queryParamsInit = {
  city: [],
  delivery_date: undefined,
  financial_status: undefined,
  fulfillment_status: undefined,
  order_status: undefined,
  page: 1,
  size: 20,
  sort_by: 'created_at',
  is_descending: true,
} as OrdersQueryParams

const queryParams = reactive<OrdersQueryParams>(queryParamsInit)

const ordersQuery = useQuery({
  queryKey: computed(() => ['orders', queryParams]),
  queryFn: () => ordersApi.getOrders(queryParams),
  enabled: computed(() => authStore.isAuthenticated),
})

const reset = () => {
  Object.assign(queryParams, queryParamsInit)
}

const handleSetter = (newPagination: {
  page: number
  rowsPerPage: number
  sortBy?: string
  descending: boolean
}) => {
  if (!newPagination.sortBy) return
  queryParams.sort_by = newPagination.sortBy as OrdersQueryParams['sort_by']
  queryParams.is_descending = newPagination.descending
  queryParams.page = 1
}

const tablePagination = computed({
  get: () => ({
    sortBy: queryParams.sort_by,
    descending: queryParams.is_descending,
    page: queryParams.page,
    rowsPerPage: queryParams.size,
    rowsNumber: ordersQuery.data.value?.data?.total_elements || 0,
  }),
  set: handleSetter,
})

const onRequest = (props: {
  pagination: { page: number; rowsPerPage: number; sortBy?: string; descending: boolean }
}) => {
  handleSetter(props.pagination)
}

const totalPages = computed(() => {
  const totalElements = ordersQuery.data.value?.data?.total_elements || 0
  const pageSize = queryParams.size || 20
  return Math.ceil(totalElements / pageSize)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    queryParams.page = page
  }
}

const handlePageSizeChange = (newSize: number) => {
  queryParams.size = newSize
  queryParams.page = 1
}

const handleLogout = () => {
  apiLogout()

  $q.notify({
    color: 'info',
    message: '已登出',
    icon: 'logout',
  })
  router.push('/')
}

watch(
  () => ({
    city: queryParams.city,
    delivery_date: queryParams.delivery_date,
    financial_status: queryParams.financial_status,
    fulfillment_status: queryParams.fulfillment_status,
    order_status: queryParams.order_status,
  }),
  () => {
    if (queryParams.page !== 1) {
      queryParams.page = 1
    }
  },
  { deep: true },
)
</script>

<style scoped>
.q-table th {
  font-weight: bold;
}

.q-chip {
  font-size: 0.75rem;
}

.q-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-table .q-table__top {
  padding: 12px 16px;
}

/* 自定義分頁樣式 */
.q-table .q-table__bottom {
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
}

.q-table .q-table__bottom .q-select {
  font-size: 0.875rem;
}

.q-table .q-table__bottom .q-btn {
  margin: 0 2px;
}

.q-table .q-table__bottom .text-grey-7 {
  font-size: 0.875rem;
}

.custom-pagination {
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
  margin-top: 0;
}

.custom-pagination .q-select {
  font-size: 0.875rem;
}

.custom-pagination .q-btn {
  margin: 0 2px;
}

.custom-pagination .text-grey-7 {
  font-size: 0.875rem;
}
</style>
