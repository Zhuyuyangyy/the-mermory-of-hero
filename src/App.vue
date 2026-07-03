<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app-shell">
    <header class="top-nav">
      <RouterLink to="/" class="brand">英雄的记忆</RouterLink>
      <nav>
        <RouterLink to="/venue">场馆 VR 漫游</RouterLink>
        <RouterLink to="/hero">英雄数字人</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app-shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-elevated);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-h);
  text-decoration: none;
  letter-spacing: 0.5px;
}

.top-nav nav {
  display: flex;
  gap: 8px;
}

.top-nav nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  padding: 6px 14px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.top-nav nav a:hover {
  background: var(--accent-bg);
  color: var(--text-h);
}

.top-nav nav a.router-link-active {
  background: var(--accent-bg);
  color: var(--accent);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
