<script setup>
defineProps({
  speaker: { type: String, default: '' },
  text: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  speaking: { type: Boolean, default: false },
})
const emit = defineEmits(['choose'])
</script>

<template>
  <div class="dialogue-box card">
    <div class="speaker-row">
      <span class="speaker-name">{{ speaker }}</span>
      <span v-if="speaking" class="speaking-indicator">讲解中…</span>
    </div>
    <p class="dialogue-text">{{ text }}</p>
    <div class="options">
      <button
        v-for="option in options"
        :key="option.next"
        class="btn"
        @click="emit('choose', option.next)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dialogue-box {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.speaker-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.speaker-name {
  font-weight: 600;
  color: var(--accent);
  font-size: 14px;
}

.speaking-indicator {
  font-size: 12px;
  opacity: 0.7;
}

.dialogue-text {
  line-height: 1.7;
  color: var(--text-h);
  min-height: 3em;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
