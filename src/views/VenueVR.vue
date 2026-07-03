<script setup>
import { ref, computed } from 'vue'
import ThreeVenueScene from '../components/ThreeVenueScene.vue'
import NarrationPanel from '../components/NarrationPanel.vue'
import { exhibits } from '../data/venueData.js'

const selectedId = ref(null)
const selectedExhibit = computed(() => exhibits.find((e) => e.id === selectedId.value) || null)

function onSelect(id) {
  selectedId.value = id
}

function closePanel() {
  selectedId.value = null
}
</script>

<template>
  <section class="venue-page">
    <div class="page-heading">
      <h1>场馆 VR 场景重现</h1>
      <p>拖拽鼠标旋转视角、滚轮缩放，点击展区方块查看讲解（示例场景，展区模型为占位几何体）</p>
    </div>

    <div class="scene-wrap">
      <ThreeVenueScene @select="onSelect" />

      <div class="exhibit-list card">
        <h3>展区导览</h3>
        <ul>
          <li
            v-for="exhibit in exhibits"
            :key="exhibit.id"
            :class="{ active: exhibit.id === selectedId }"
            @click="onSelect(exhibit.id)"
          >
            <span class="dot" :style="{ background: exhibit.color }"></span>
            {{ exhibit.name }}
          </li>
        </ul>
      </div>

      <transition name="fade">
        <NarrationPanel
          v-if="selectedExhibit"
          class="floating-panel"
          :title="selectedExhibit.name"
          :text="selectedExhibit.narration"
          @close="closePanel"
        />
      </transition>
    </div>
  </section>
</template>

<style scoped>
.venue-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
}

.page-heading p {
  font-size: 14px;
  opacity: 0.75;
  margin-top: 4px;
}

.scene-wrap {
  position: relative;
  flex: 1;
  min-height: 480px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.exhibit-list {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 16px;
  width: 200px;
  background: color-mix(in srgb, var(--card-bg) 85%, transparent);
  backdrop-filter: blur(6px);
}

.exhibit-list ul {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.exhibit-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-h);
  cursor: pointer;
}

.exhibit-list li:hover,
.exhibit-list li.active {
  background: var(--accent-bg);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.floating-panel {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 320px;
  max-width: calc(100% - 32px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
