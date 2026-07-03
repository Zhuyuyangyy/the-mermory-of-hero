<script setup>
import { ref } from 'vue'
import { askHero } from '../services/llmService.js'

const emit = defineEmits(['reply'])

const messages = ref([])
const input = ref('')
const loading = ref(false)

async function send() {
  const question = input.value.trim()
  if (!question || loading.value) return

  messages.value.push({ role: 'user', text: question })
  input.value = ''
  loading.value = true

  const result = await askHero(
    question,
    messages.value.slice(-6),
  )

  messages.value.push({ role: 'hero', text: result.text })
  emit('reply', result.text)
  loading.value = false
}
</script>

<template>
  <div class="free-chat card">
    <h3>自由提问</h3>
    <p class="hint">课程中或结束后，都可以在这里向英雄数字人自由提问</p>

    <div class="messages">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="message"
        :class="msg.role"
      >
        <span class="tag">{{ msg.role === 'user' ? '我' : '数字人' }}</span>
        <span>{{ msg.text }}</span>
      </div>
      <div v-if="loading" class="message hero">
        <span class="tag">数字人</span>
        <span>正在思考…</span>
      </div>
    </div>

    <form class="input-row" @submit.prevent="send">
      <input
        v-model="input"
        type="text"
        placeholder="输入你的问题…"
        :disabled="loading"
      />
      <button type="submit" class="btn btn-primary" :disabled="loading || !input.trim()">
        发送
      </button>
    </form>
  </div>
</template>

<style scoped>
.free-chat {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.hint {
  font-size: 12px;
  opacity: 0.7;
}

.messages {
  flex: 1;
  min-height: 120px;
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 2px;
}

.message {
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  gap: 6px;
}

.message.user {
  color: var(--text-h);
}

.message.hero {
  color: var(--text);
}

.tag {
  flex-shrink: 0;
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--accent-bg);
  color: var(--accent);
  height: fit-content;
}

.input-row {
  display: flex;
  gap: 8px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
}
</style>
