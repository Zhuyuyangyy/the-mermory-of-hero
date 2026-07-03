<script setup>
import { ref, computed } from 'vue'
import HeroAvatarScene from '../components/HeroAvatarScene.vue'
import DialogueBox from '../components/DialogueBox.vue'
import FreeChatPanel from '../components/FreeChatPanel.vue'
import { lessonTree, LESSON_START_NODE } from '../data/lessonScript.js'
import { speak, stopSpeaking, isSpeechSupported } from '../services/speechService.js'

const currentNodeId = ref(LESSON_START_NODE)
const currentNode = computed(() => lessonTree[currentNodeId.value])
const speaking = ref(false)
const supported = isSpeechSupported()

function speakCurrent() {
  speak(currentNode.value.text, {
    onStart: () => (speaking.value = true),
    onEnd: () => (speaking.value = false),
  })
}

function choose(nextId) {
  stopSpeaking()
  speaking.value = false
  currentNodeId.value = nextId
}

function onFreeChatReply(text) {
  speak(text, {
    onStart: () => (speaking.value = true),
    onEnd: () => (speaking.value = false),
  })
}
</script>

<template>
  <section class="hero-page">
    <div class="page-heading">
      <h1>英雄数字人 · 思政课堂</h1>
      <p>跟随数字人完成剧本式思政课，也可以随时自由提问（示例数字人形象与课程内容为占位素材）</p>
    </div>

    <div class="content-grid">
      <div class="avatar-panel card">
        <HeroAvatarScene :speaking="speaking" />
      </div>

      <div class="interaction-panel">
        <DialogueBox
          :speaker="currentNode.speaker"
          :text="currentNode.text"
          :options="currentNode.options"
          :speaking="speaking"
          @choose="choose"
        />
        <div class="dialogue-actions">
          <button class="btn" :disabled="!supported || speaking" @click="speakCurrent">
            ▶ 朗读本段
          </button>
        </div>

        <FreeChatPanel @reply="onFreeChatReply" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-page {
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

.content-grid {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(360px, 1.2fr);
  gap: 20px;
  min-height: 480px;
}

.avatar-panel {
  overflow: hidden;
  min-height: 360px;
}

.interaction-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dialogue-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 860px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
