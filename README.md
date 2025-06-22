# AlphaCore 訂單管理系統

## 🌐 線上展示

**展示網址：** [https://chechehuang.github.io/alphacore](https://chechehuang.github.io/alphacore)

> 📋 測試帳號：`actinc` / 密碼：`actinc`

---

一個基於 Vue 3 + Quasar 的現代化訂單管理系統展示專案，提供使用者認證和訂單清單管理功能。

## 🌟 功能特色

- 🔐 **使用者認證系統** - 安全的登入/登出功能
- 📋 **訂單清單管理** - 完整的訂單資料展示與篩選
- 🎨 **現代化 UI** - 使用 Quasar Framework 打造美觀介面
- 📱 **響應式設計** - 支援桌面與行動裝置
- 🔍 **進階篩選** - 多條件訂單篩選功能
- 📊 **狀態標籤** - 直觀的訂單、付款、物流狀態顯示
- 🚀 **快速載入** - 使用 Vue Query 進行資料快取優化

## 🛠️ 技術棧

### 核心技術

- **Vue 3** - 前端框架
- **TypeScript** - 型別安全
- **Quasar Framework** - UI 元件函式庫
- **Vue Router** - 路由管理
- **Pinia** - 狀態管理

### 開發工具

- **Vite** - 建構工具
- **ESLint** - 程式碼檢查
- **Prettier** - 程式碼格式化
- **Husky** - Git hooks 管理
- **Playwright** - E2E 測試
- **Vitest** - 單元測試

### 資料管理

- **TanStack Vue Query** - 伺服器狀態管理
- **Axios** - HTTP 客戶端

## 📦 專案結構

```
src/
├── assets/          # 靜態資源
├── composables/     # Vue 組合式函式
│   └── useApi.ts    # API 相關邏輯
├── router/          # 路由設定
├── services/        # API 服務層
├── stores/          # Pinia 狀態管理
├── utils/           # 工具函式
├── views/           # 頁面元件
│   ├── LoginView.vue     # 登入頁面
│   └── ListView.vue      # 訂單清單頁面
└── test/            # 測試檔案
```

## 🚀 快速開始

### 環境需求

- Node.js 18+
- pnpm (推薦) 或 npm

### 安裝依賴

```bash
pnpm install
```

### 開發環境執行

```bash
pnpm dev
```

### 建構生產版本

```bash
pnpm build
```

### 預覽生產版本

```bash
pnpm preview
```

## 🧪 測試

### 執行單元測試

```bash
pnpm test:unit
```

### 執行 E2E 測試

```bash
pnpm test:e2e
```

### 程式碼品質檢查

```bash
pnpm lint
pnpm check-all
```

## 📱 功能說明

### 登入系統

- 使用者名稱和密碼驗證
- 自動導向和路由守衛
- 記住登入狀態功能

### 訂單管理

- **多條件篩選**：

  - 城市選擇
  - 配送日期
  - 付款狀態（已付款、待付款、已退款）
  - 物流狀態（已收到、準備中）
  - 訂單狀態（開放、已取消、已關閉）

- **資料展示**：
  - 分頁表格顯示
  - 狀態標籤配色
  - 日期格式化
  - 排序功能

### 路由系統

- 自動認證檢查
- 未登入用戶重導向至登入頁
- 已登入用戶跳過登入頁

## 🔧 開發指南

### API 整合

專案使用組合式 API 模式處理資料：

```typescript
// 使用認證 API
const { loginMutation, logout } = useAuth()

// 使用訂單 API
const { getOrdersQuery } = useOrders()
```

### 狀態管理

使用 Pinia 管理全域狀態：

```typescript
// 認證狀態
const authStore = useAuthStore()
authStore.login(userData)
authStore.logout()
```

### 樣式客製化

專案使用 Quasar 變數進行主題客製化，可在 `src/quasar-variables.sass` 中調整：

```sass
$primary   : #1976D2
$secondary : #26A69A
$accent    : #9C27B0
// ... 更多顏色設定
```

## 🚢 部署

### GitHub Pages 部署

```bash
pnpm deploy
```

專案會自動建構並部署到 GitHub Pages。

### 其他平台部署

1. 執行 `pnpm build` 建構專案
2. 將 `dist/` 資料夾部署到您選擇的平台

## 📄 程式碼品質

專案包含完整的程式碼品質控制：

- **ESLint** - 程式碼風格檢查
- **Prettier** - 自動格式化
- **TypeScript** - 型別檢查
- **Husky** - Git 提交前檢查
- **Lint-staged** - 僅檢查修改的檔案
