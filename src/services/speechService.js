// 基于浏览器内置 Web Speech API 的朗读工具，无需额外音频素材。
// 后续如需更自然的配音，可将 speak() 替换为播放真实录音文件。

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speak(text, { onStart, onEnd, lang = 'zh-CN' } = {}) {
  if (!isSpeechSupported() || !text) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 1
  utterance.onstart = () => onStart?.()
  utterance.onend = () => onEnd?.()
  utterance.onerror = () => onEnd?.()

  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel()
  }
}
