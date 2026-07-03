<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="home">
    <div class="intro">
      <h1>英雄的记忆</h1>
      <p class="subtitle">
        场馆 VR 场景重现与讲解 · 英雄数字人交互式思政课堂
      </p>
      <p class="note">
        当前为框架搭建阶段，页面中的模型、图片与文案均为占位示例素材，后续替换为真实场馆与人物资料即可。
      </p>
    </div>

    <div class="cards">
      <RouterLink to="/venue" class="card entry-card">
        <div class="icon">🏛️</div>
        <h2>场馆 VR 场景重现</h2>
        <p>3D 场馆漫游，点击展区触发语音讲解</p>
      </RouterLink>

      <RouterLink to="/hero" class="card entry-card">
        <div class="icon">🫡</div>
        <h2>英雄数字人 · 思政课堂</h2>
        <p>与数字人对话，跟随剧本学习，也可自由提问</p>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 48px 24px;
  text-align: center;
}

.intro {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.subtitle {
  font-size: 18px;
  color: var(--text-h);
}

.note {
  font-size: 14px;
  opacity: 0.75;
}

.cards {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.entry-card {
  width: 280px;
  padding: 32px 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.entry-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.entry-card .icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.entry-card p {
  font-size: 14px;
  color: var(--text);
}
</style>
