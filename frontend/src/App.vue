<template>
  <div class="bg-decoration"></div>
  <div class="grid-bg"></div>

  <nav class="navbar">
    <div class="navbar-content">
      <div class="logo">AI导航</div>
      <ul class="nav-links">
        <li><a href="#cases">典型案例</a></li>
        <li><a href="#" @click.prevent="isFavoriteModalOpen = true">我的收藏</a></li>
        <li><a href="#">API 文档</a></li>
        <li><a href="#about">关于我们</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div class="hero-badge">
        <span>🚀 程序员专属 · 出海 AI 工具导航</span>
      </div>
      <h1>出海程序员的<br><span>AI 工具精选导航</span></h1>
      <p class="hero-subtitle">
        专为技术移民、雅思备考、海外求职、签证申请打造的 AI 工具基站
      </p>

      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            class="search-input" 
            v-model="query"
            placeholder="描述你想完成的任务，例如：剪辑一个视频并添加字幕" 
            @keypress.enter="search"
          >
          <button class="search-btn" @click="search">
            <span>智能推荐</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="quick-tags">
          <span class="quick-tag" @click="quickSearch('备考雅思')">雅思备考</span>
          <span class="quick-tag" @click="quickSearch('准备签证材料')">签证办理</span>
          <span class="quick-tag" @click="quickSearch('海外求职简历')">海外求职</span>
          <span class="quick-tag" @click="quickSearch('英文技术写作')">技术写作</span>
          <span class="quick-tag" @click="quickSearch('远程协作')">远程协作</span>
          <span class="quick-tag" @click="quickSearch('写代码')">代码生成</span>
        </div>

        <HistoryTags
          :history="history"
          @search="quickSearch"
          @clear="clearHistory"
        />

        <div class="turnstile-container">
          <div class="cf-turnstile"
               :data-sitekey="turnstileSiteKey"
               data-callback="onTurnstileSuccess"
               data-theme="dark"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ⭐ 亮点 1：明星生态工具推荐区 -->
  <section class="featured-ecosystem-section">
    <div class="container">
      <div class="section-header" style="text-align: left; margin-bottom: 20px;">
        <h2>⭐ 明星生态工具 (Featured Ecosystem)</h2>
        <p>为出海程序员量身定制的无缝工作流工具</p>
      </div>

      <div class="featured-grid">
        <!-- Card 1: Code-IELTS -->
        <div class="featured-card">
          <div class="card-top">
            <span class="card-badge">⭐ 明星项目 · 极客备考</span>
            <span class="card-tag">雅思 / 英语 / 终端 IDE</span>
          </div>
          <h3 class="card-title">
            <span>Code-IELTS</span>
          </h3>
          <p class="card-desc">
            用工程师的方式重构你的英语系统！打字练习 + FSRS 记忆算法 + 🔴 Error / 🟠 Warning / 🔵 Info Linter 级批改 + GitHub 绿点打卡。
          </p>
          <a href="https://code-ielts.vercel.app" target="_blank" class="card-btn">
            🚀 体验 Code-IELTS (Vercel 在线) →
          </a>
        </div>

        <!-- Card 2: AI.Done / visa-skills -->
        <div class="featured-card">
          <div class="card-top">
            <span class="card-badge">🛡️ 隐私安全 · 10国 Skill</span>
            <span class="card-tag">签证 / 文书 / Local-First</span>
          </div>
          <h3 class="card-title">
            <span>AI.Done & visa-skills</span>
          </h3>
          <p class="card-desc">
            浏览器本地 AES-GCM 256 位加密，填一次数据自动生成行程单、在职证明与邀请函。配套 10 国开源 Agent Skill，一键安装至 Claude/Cursor。
          </p>
          <a href="https://aidone.cc" target="_blank" class="card-btn">
            🛡️ 访问 aidone.cc (本地加密生成) →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 🧮 亮点 2：程序员出海移居 & 签证匹配算盘 -->
  <section class="calculator-section">
    <div class="container">
      <div class="calculator-card">
        <div class="section-header" style="text-align: left; margin-bottom: 10px;">
          <h2>🧮 程序员出海移居 & 签证匹配算盘</h2>
          <p>选择你的目标方向与条件，实时计算通过概率与必备 AI 工具链</p>
        </div>

        <div class="calculator-controls">
          <div class="control-group">
            <label>🎯 意向目的地与签证类型：</label>
            <select v-model="selectedCountry" class="calc-select">
              <option value="japan">🇯🇵 日本 · 高度人才 / IT 专职</option>
              <option value="spain">🇪🇸 西班牙 · Digital Nomad 数字游民</option>
              <option value="thailand">🇹🇭 泰国 · DTV 终极数字游民签证</option>
              <option value="singapore">🇸🇬 新加坡 · Tech Pass / EP 高管</option>
              <option value="canada">🇨🇦 加拿大 · Express Entry Tech</option>
            </select>
          </div>

          <div class="control-group">
            <label>💻 研发工作经验：</label>
            <select v-model="selectedExp" class="calc-select">
              <option value="junior">1 - 3 年经验</option>
              <option value="mid">3 - 5 年经验</option>
              <option value="senior">5 年以上核心架构师</option>
            </select>
          </div>

          <div class="control-group">
            <label>🗣️ 英语 / 雅思水平：</label>
            <select v-model="selectedIelts" class="calc-select">
              <option value="6.0">雅思 6.0 分 (基础交流)</option>
              <option value="7.0">雅思 7.0 分 (良好分级)</option>
              <option value="7.5">雅思 7.5 分+ (流利专家)</option>
            </select>
          </div>
        </div>

        <div class="calculator-result-box">
          <div class="score-circle">
            <div class="score-number">{{ currentCalc.totalScore }}%</div>
            <div class="score-label">匹配指数 (极高)</div>
          </div>
          <div class="result-details">
            <h4>{{ currentCalc.name }}</h4>
            <div class="result-reqs">
              <span v-for="r in currentCalc.reqs" :key="r" class="req-pill">✓ {{ r }}</span>
              <span class="req-pill" style="color: var(--accent);">⏱️ {{ currentCalc.period }}</span>
            </div>
            <div class="recommended-tools-bar">
              <span style="font-size: 13px; color: var(--text-muted);">💡 推荐配备工具：</span>
              <a 
                v-for="t in currentCalc.tools" 
                :key="t.name" 
                :href="t.url" 
                target="_blank" 
                class="tool-chip"
              >
                {{ t.name }} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="loading" :class="{ active: isLoading }">
    <div class="container">
      <div class="spinner"></div>
      <p style="color: var(--text-secondary);">正在分析你的需求...</p>
    </div>
  </div>

  <section v-if="results" class="results-section active" id="resultsSection" ref="resultsSectionRef">
    <div class="container">
      <div class="results-header">
        <h2>为你推荐</h2>
        <p>{{ resultsTitle }}</p>
      </div>
      
      <!-- Workflow View -->
      <div v-if="results.mode === 'workflow'" class="results-grid">
        <div class="workflow-container">
          <div class="workflow-header">
            <h2 class="workflow-title">{{ results.task || '工作流程' }}</h2>
            <div class="workflow-meta">
              <span v-if="results.complexity" class="meta-badge">
                📊 复杂度: {{ complexityMap[results.complexity] || results.complexity }}
              </span>
              <span v-if="results.estimatedTime" class="meta-badge">
                ⏱️ 预估时间: {{ results.estimatedTime }}
              </span>
              <span v-if="results.source" class="source-badge">
                {{ results.source === 'template' ? '📚 场景模板' : '🤖 AI生成' }}
              </span>
            </div>
            <!-- Mermaid Chart -->
            <div v-if="results.mermaid" class="flowchart-container">
              <div v-html="mermaidSvg"></div>
            </div>
          </div>

          <div class="workflow-steps">
            <StepCard 
              v-for="(step, index) in results.workflow" 
              :key="index" 
              :step="step" 
            />
          </div>
        </div>
      </div>

      <!-- Simple Recommendations View -->
      <div v-else class="results-grid">
        <ProductCard 
          v-for="product in results.recommendations" 
          :key="product.url" 
          :product="product"
          :is-favorite="isFavorite(product.url)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </div>
  </section>

  <section class="cases-section" id="cases">
    <div class="container">
      <div class="section-header">
        <h2>典型应用场景</h2>
        <p>看看其他用户是怎么使用 AI 工具提效的</p>
      </div>
      <div class="cases-grid">
        <!-- Reusing legacy logic for cases, or simplify? Let's implement manually for now or fetch -->
        <div v-for="c in cases" :key="c.title" class="case-card" @click="quickSearch(c.title)">
           <div class="case-icon">{{ caseIcons[c.id] || '📌' }}</div>
           <h3 class="case-title">{{ c.title }}</h3>
           <p class="case-pain">{{ c.desc }}</p>
           <div class="case-solution">✓ {{ c.solution }}</div>
           <div class="case-products">
             <span v-for="p in c.products" :key="p" class="case-product-tag">{{ p }}</span>
           </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer" id="about">
    <div class="container">
      <p class="footer-text">
        AI导航 - 任何事情先看看 AI 能不能做<br>
        <a href="#">GitHub</a> · <a href="#">API 文档</a> · <a href="#">反馈建议</a>
      </p>
    </div>
  </footer>

  <FavoritesModal 
    v-if="isFavoriteModalOpen" 
    :favorites="favorites"
    @close="isFavoriteModalOpen = false"
    @toggle="toggleFavorite"
  />

</template>

<script setup>
/**
 * App - AI导航主应用组件
 *
 * @component
 * @description
 * AI 工具推荐平台的主应用组件，整合以下核心功能：
 * 1. 智能搜索 - 基于任务描述推荐 AI 工具
 * 2. 工作流展示 - 复杂任务生成详细执行步骤（支持 Mermaid 流程图）
 * 3. 搜索历史 - 自动记录最近 10 次搜索，支持快速重新搜索
 * 4. 收藏管理 - localStorage 持久化用户收藏的工具
 * 5. 典型案例 - 展示预设场景和工作流模板
 * 6. 人机验证 - Cloudflare Turnstile 集成，防止 API 滥用
 *
 * @architecture
 * 采用环境自适应 API 配置：
 * - 开发环境 (localhost): http://localhost:8787
 * - 生产环境: https://x.aimake.cc
 *
 * Turnstile 人机验证：
 * - 开发环境: 使用测试密钥（始终通过）
 * - 生产环境: 使用真实 Site Key
 *
 * @example
 * // 在 main.js 中挂载
 * import App from './App.vue'
 * createApp(App).mount('#app')
 */

import { ref, computed, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'
import ProductCard from './components/ProductCard.vue'
import StepCard from './components/StepCard.vue'
import HistoryTags from './components/HistoryTags.vue'
import FavoritesModal from './components/FavoritesModal.vue'

// --- State ---
/** 用户输入的搜索查询 */
const query = ref('')
/** API 返回的推荐结果（简单模式或工作流模式）*/
const results = ref(null)
/** 搜索加载状态 */
const isLoading = ref(false)
/** 搜索历史记录（最多 10 条）*/
const history = ref([])
/** 用户收藏列表 */
const favorites = ref([])
/** 典型案例列表 */
const cases = ref([])
/** 收藏夹弹窗显示状态 */
const isFavoriteModalOpen = ref(false)
/** Mermaid 渲染后的 SVG 内容 */
const mermaidSvg = ref('')
/** 结果区域 DOM 引用（用于滚动定位）*/
const resultsSectionRef = ref(null)

// --- 🧮 移居算盘 State & Data ---
const selectedCountry = ref('japan')
const selectedExp = ref('mid')
const selectedIelts = ref('7.0')

const countryData = {
  japan: {
    name: '🇯🇵 日本 · 高度人才 / IT 专职',
    baseScore: 82,
    reqs: ['学士及以上学历', 'IT 相关工作 3 年+', '日语 N2 或 英文流利'],
    period: '办理周期 1-3 个月',
    tools: [
      { name: 'Code-IELTS 备考', url: 'https://github.com/chicogong/code-ielts' },
      { name: 'AI.Done 在职/履历生成', url: 'https://aidone.cc' },
      { name: 'japan-visa-skill', url: 'https://github.com/chicogong/visa-skills' }
    ]
  },
  spain: {
    name: '🇪🇸 西班牙 · Digital Nomad 数字游民签证',
    baseScore: 88,
    reqs: ['远程收入 ≥ €2600/月', '可开具远程工作证明', '无犯罪记录'],
    period: '办理周期 1-2 个月',
    tools: [
      { name: 'AI.Done 本地加密证明信', url: 'https://aidone.cc' },
      { name: 'schengen-visa-skill', url: 'https://github.com/chicogong/visa-skills' }
    ]
  },
  thailand: {
    name: '🇹🇭 泰国 · DTV 终极数字游民签证',
    baseScore: 95,
    reqs: ['存款证明 ≥ 50 万泰铢', '远程工作/自由职业身份', '5 年多次往返'],
    period: '办理周期 2-4 周',
    tools: [
      { name: 'AI.Done 行程与存款模版', url: 'https://aidone.cc' },
      { name: 'thailand-visa-skill', url: 'https://github.com/chicogong/visa-skills' }
    ]
  },
  singapore: {
    name: '🇸🇬 新加坡 · Tech Pass / EP',
    baseScore: 78,
    reqs: ['固定月薪 ≥ S$22,500', 'IT 技术专家 / 架构师', '英文无障碍交流'],
    period: '办理周期 1-2 个月',
    tools: [
      { name: 'Code-IELTS 英文面试 Linter', url: 'https://github.com/chicogong/code-ielts' },
      { name: 'singapore-visa-skill', url: 'https://github.com/chicogong/visa-skills' }
    ]
  },
  canada: {
    name: '🇨🇦 加拿大 · Express Entry / Tech Stream',
    baseScore: 75,
    reqs: ['雅思 CLB 8+ (7.5/8.0/7.5/7.5)', '计算机相关学历', '综合 CRS 打分'],
    period: '办理周期 6-12 个月',
    tools: [
      { name: 'Code-IELTS 雅思高分提分', url: 'https://github.com/chicogong/code-ielts' },
      { name: 'AI.Done 证明信与简历', url: 'https://aidone.cc' }
    ]
  }
}

const currentCalc = computed(() => {
  const c = countryData[selectedCountry.value] || countryData.japan
  let scoreBonus = 0
  if (selectedExp.value === 'senior') scoreBonus += 6
  if (selectedIelts.value === '7.5') scoreBonus += 6
  const totalScore = Math.min(99, c.baseScore + scoreBonus)
  return { ...c, totalScore }
})

// --- Constants & Config ---
/**
 * 检测是否为本地开发环境
 * 用于自动选择 API Base 和 Turnstile 配置
 */
const isLocalhost = window.location.hostname === 'localhost' || window.location.protocol === 'file:'

/**
 * API 基础地址
 * - 开发环境: http://localhost:8787（本地 Cloudflare Workers）
 * - 生产环境: https://x.aimake.cc
 */
const API_BASE = isLocalhost
    ? 'http://localhost:8787'
    : 'https://x.aimake.cc'

/** 典型案例图标映射 */
const caseIcons = { 'gov-doc': '📄', 'invoice': '🧾', 'video': '🎬', 'meeting': '🎙️', 'contract': '📋' }
/** 任务复杂度中文显示映射 */
const complexityMap = { 'simple': '简单', 'moderate': '中等', 'complex': '复杂' }

// --- Computed ---
/**
 * 结果区域标题
 * @returns {string} 根据结果模式返回不同标题
 */
const resultsTitle = computed(() => {
  if (!results.value) return ''
  return results.value.mode === 'workflow'
    ? '工作流推荐'
    : `根据「${results.value.query || results.value.task}」为你推荐`
})

// --- Methods ---

// History
/**
 * 从 localStorage 加载搜索历史
 * @description 在组件挂载时调用，恢复用户的历史搜索记录
 */
function loadHistory() {
  history.value = JSON.parse(localStorage.getItem('searchHistory') || '[]')
}

/**
 * 保存搜索记录到历史
 * @param {string} q - 搜索查询文本
 * @description
 * 将新搜索添加到历史记录顶部，如果已存在则移到顶部。
 * 历史记录最多保留 10 条，超出部分自动删除。
 */
function saveHistory(q) {
  let h = history.value.filter(item => item !== q)
  h.unshift(q)
  if (h.length > 10) h = h.slice(0, 10)
  history.value = h
  localStorage.setItem('searchHistory', JSON.stringify(h))
}

/**
 * 清空所有搜索历史
 * @description 同时清除内存和 localStorage 中的历史记录
 */
function clearHistory() {
  history.value = []
  localStorage.removeItem('searchHistory')
}

// Favorites
/**
 * 从 localStorage 加载用户收藏
 * @description 在组件挂载时调用，恢复用户收藏的工具列表
 */
function loadFavorites() {
  favorites.value = JSON.parse(localStorage.getItem('userFavorites') || '[]')
}

/**
 * 检查产品是否已收藏
 * @param {string} id - 产品唯一标识（通常为 URL）
 * @returns {boolean} 是否已收藏
 */
function isFavorite(id) {
  return favorites.value.some(f => f.id === id)
}

/**
 * 切换产品收藏状态
 * @param {Object} product - 产品对象，包含 name, url, desc
 * @description
 * 如果产品已收藏则取消收藏，否则添加到收藏列表。
 * 收藏数据持久化到 localStorage。
 */
function toggleFavorite(product) {
  const index = favorites.value.findIndex(f => f.id === product.url)
  if (index >= 0) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push({
      id: product.url,
      type: 'tool',
      data: product,
      timestamp: Date.now()
    })
  }
  localStorage.setItem('userFavorites', JSON.stringify(favorites.value))
}

// Search
/**
 * 执行智能搜索
 * @async
 * @description
 * 核心搜索功能，执行以下步骤：
 * 1. 验证搜索查询非空
 * 2. 保存到搜索历史
 * 3. 携带 Turnstile token 调用后端 API
 * 4. 处理两种结果模式：
 *    - 简单模式：直接显示推荐工具列表
 *    - 工作流模式：渲染 Mermaid 流程图并显示步骤
 * 5. 滚动到结果区域
 * 6. 重置 Turnstile（为下次搜索做准备）
 *
 * @throws {Error} API 请求失败或 Turnstile 验证失败
 */
async function search() {
  if (!query.value.trim()) return

  saveHistory(query.value.trim())

  isLoading.value = true
  results.value = null
  mermaidSvg.value = ''

  try {
    const response = await fetch(`${API_BASE}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query.value.trim() })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '请求失败')
    }

    const data = await response.json()
    results.value = data

    // Render logic for mermaid
    if (data.mermaid) {
       renderMermaid(data.mermaid)
    }

    // Scroll to results
    nextTick(() => {
      // resultsSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // A bit hacky but ensuring DOM is updated
      setTimeout(() => {
          document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    })

  } catch (error) {
    console.error('Search error:', error)
    alert(error.message || '请求失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

/**
 * 快速搜索（点击标签或历史记录）
 * @param {string} q - 搜索查询文本
 * @description 设置查询内容并立即触发搜索
 */
function quickSearch(q) {
  query.value = q
  search()
}

// Mermaid
/**
 * 渲染 Mermaid 流程图
 * @async
 * @param {string} graphDefinition - Mermaid 图表定义语法
 * @description
 * 使用 Mermaid.js 将图表定义渲染为 SVG。
 * 渲染失败时静默处理，不影响页面其他功能。
 */
async function renderMermaid(graphDefinition) {
   try {
     const { svg } = await mermaid.render('mermaid-graph-' + Date.now(), graphDefinition)
     mermaidSvg.value = svg
   } catch (error) {
     console.error('Mermaid render failed:', error)
   }
}

// Data Loading
/**
 * 加载典型案例列表
 * @async
 * @description
 * 从后端 API 获取预设的典型案例（如政府文档处理、发票识别等）。
 * 案例数据在组件挂载时自动加载。
 */
async function loadCases() {
  try {
    const response = await fetch(`${API_BASE}/api/cases`)
    const data = await response.json()
    cases.value = data.cases || []
  } catch (error) {
    console.error('Failed to load cases:', error)
  }
}

// --- Lifecycle ---

/**
 * 组件挂载生命周期
 * @description
 * 执行初始化操作：
 * 1. 加载搜索历史和收藏列表
 * 2. 加载典型案例
 * 3. 初始化 Mermaid 配置（深色主题 + 自定义配色）
 * 4. 注册 Turnstile 成功回调（设置 turnstileToken）
 */
onMounted(() => {
  loadHistory()
  loadFavorites()
  loadCases()

  // Initialize Mermaid
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#0066FF',
        primaryTextColor: '#F9FAFB',
        primaryBorderColor: '#0066FF',
        lineColor: '#3385FF',
        secondaryColor: '#00D9FF',
        tertiaryColor: '#111827'
    }
  })
})
</script>
