<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-card q-pa-lg">
          <q-card-section class="text-center">
            <div class="text-h4 text-primary q-mb-md">歡迎登入</div>
            <div class="text-subtitle2 text-grey-7">請輸入您的帳號和密碼</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                v-model="username"
                type="text"
                label="使用者名稱"
                outlined
                :rules="[(val) => !!val || '請輸入使用者名稱']"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="密碼"
                outlined
                :rules="[(val) => !!val || '請輸入密碼']"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="row items-center justify-between">
                <q-checkbox v-model="rememberMe" label="記住我" />
                <q-btn flat color="primary" label="忘記密碼？" class="text-caption" />
              </div>

              <q-btn
                type="submit"
                color="primary"
                class="full-width q-mt-md"
                size="lg"
                :loading="loading"
                label="登入"
              />

              <div class="text-center q-mt-md">
                <q-btn flat color="grey-7" label="還沒有帳號？註冊" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from '@/composables/useApi'

const router = useRouter()
const $q = useQuasar()
const { loginMutation } = useAuth()

// 表單資料
const username = ref('actinc')
const password = ref('actinc')
const rememberMe = ref(false)
const isPwd = ref(true)
const loading = ref(false)

// 提交表單
const onSubmit = async () => {
  loading.value = true

  try {
    // 使用實際的登入 API
    await loginMutation.mutateAsync({
      username: username.value,
      password: password.value,
    })

    // 顯示成功訊息
    $q.notify({
      color: 'positive',
      message: '登入成功！',
      icon: 'check',
    })

    // 導向列表頁面
    router.push('/list')
  } catch (error) {
    console.error('登入錯誤:', error)
    $q.notify({
      color: 'negative',
      message: '登入失敗，請檢查您的帳號密碼',
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.q-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>
