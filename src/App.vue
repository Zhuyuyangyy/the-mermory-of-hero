<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const activeNav = ref('home')
const searchQuery = ref('')
const navItems = [
  { id: 'home', label: '首页' },
  { id: 'classroom', label: '红色课堂' },
  { id: 'heroes', label: '英雄烈士' },
  { id: 'tourism', label: '红色旅游' },
  { id: 'culture', label: '优秀文化' },
  { id: 'video', label: '视频科普' }
]

const scrollToSection = (id) => {
  activeNav.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div id="app-shell">
    <header class="top-nav">
      <div class="nav-container">
        <div class="brand" @click="scrollToSection('home')">
          <div class="brand-logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="#F9F3E8"/>
              <path d="M24 8L14 18H18V28H14L24 40L34 28H30V18H34L24 8Z" fill="#8B1A1A"/>
              <path d="M24 14L19 20H22V26H19L24 33L29 26H26V20H29L24 14Z" fill="#C9A96E"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">红色小课堂</span>
            <span class="brand-slogan">传承红色基因 · 赓续红色血脉</span>
          </div>
        </div>
        
        <nav class="nav-menu">
          <button 
            v-for="item in navItems" 
            :key="item.id"
            :class="['nav-item', { active: activeNav === item.id }]"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
            <span class="nav-indicator" v-if="activeNav === item.id"></span>
          </button>
        </nav>
        
        <div class="nav-actions">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="搜索内容..."
              class="search-input"
            />
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <button class="user-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--parchment);
}

.top-nav {
  background: linear-gradient(180deg, var(--red-deep) 0%, var(--red-primary) 100%);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(107, 16, 16, 0.3);
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 80px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.brand:hover {
  transform: scale(1.02);
}

.brand-logo svg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 26px;
  font-weight: 700;
  color: var(--parchment-light);
  font-family: var(--font-serif);
  letter-spacing: 4px;
}

.brand-slogan {
  font-size: 11px;
  color: var(--gold-light);
  letter-spacing: 1px;
  opacity: 0.9;
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-item {
  position: relative;
  color: rgba(249, 243, 232, 0.85);
  font-size: 17px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: var(--font-serif);
  letter-spacing: 1px;
}

.nav-item:hover {
  color: var(--parchment-light);
  background: rgba(255,255,255,0.1);
}

.nav-item.active {
  color: var(--parchment-light);
}

.nav-indicator {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: var(--gold);
  border-radius: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 180px;
  padding: 8px 36px 8px 16px;
  border: 1px solid rgba(249, 243, 232, 0.3);
  border-radius: 20px;
  background: rgba(255,255,255,0.1);
  color: var(--parchment-light);
  font-size: 14px;
  font-family: var(--font-serif);
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(249, 243, 232, 0.5);
}

.search-input:focus {
  outline: none;
  width: 220px;
  border-color: var(--gold);
  background: rgba(255,255,255,0.15);
}

.search-icon {
  position: absolute;
  right: 12px;
  width: 18px;
  height: 18px;
  color: rgba(249, 243, 232, 0.6);
}

.user-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--parchment-light);
  border: 1px solid rgba(249, 243, 232, 0.3);
  transition: all 0.3s ease;
}

.user-btn:hover {
  background: rgba(255,255,255,0.15);
  border-color: var(--gold);
}

.user-btn svg {
  width: 20px;
  height: 20px;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .nav-menu {
    display: none;
  }
}
</style>
