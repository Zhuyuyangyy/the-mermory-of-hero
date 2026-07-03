<script setup>
import { ref, watch } from 'vue'
import { speak, stopSpeaking, isSpeechSupported } from '../services/speechService.js'

const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
})
const emit = defineEmits(['close'])

const speaking = ref(false)
const supported = isSpeechSupported()

function playNarration() {
  speak(props.text, {
    onStart: () => (speaking.value = true),
    onEnd: () => (speaking.value = false),
  })
}

function stop() {
  stopSpeaking()
  speaking.value = false
}

function close() {
  stop()
  emit('close')
}

watch(
  () => props.text,
  () => {
    stop()
  },
)
</script>

<template>
  <div class="narration-panel card">
    <div class="panel-header">
      <h3>{{ title }}</h3>
      <button class="close-btn" @click="close" aria-label="关闭">✕</button>
    </div>
    <p class="narration-text">{{ text }}</p>
    <div class="panel-actions">
      <button class="btn btn-primary" :disabled="!supported || speaking" @click="playNarration">
        ▶ 播放讲解
      </button>
      <button class="btn" :disabled="!speaking" @click="stop">■ 停止</button>
    </div>
    <p v-if="!supported" class="hint">当前浏览器不支持语音朗读，可直接阅读文字讲解。</p>
  </div>
</template>

<style scoped>
.narration-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-btn {
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 16px;
}

.narration-text {
  line-height: 1.7;
  color: var(--text-h);
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.hint {
  font-size: 12px;
  opacity: 0.7;
}
</style>
