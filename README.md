# 英雄的记忆

场馆 VR 场景重现 + 讲解，以及英雄数字人交互 + 思政课堂，两个页面的前端框架。

技术栈：Vue 3 + Vite + Three.js。

## 当前状态

框架搭建阶段，所有 3D 模型、图片、课程文案均为占位示例素材，接口预留了替换/接入真实内容的位置。

## 页面

- `/venue` 场馆 VR 场景重现：3D 场景漫游（鼠标拖拽旋转、滚轮缩放），点击展区触发文字/语音讲解。展区数据见 `src/data/venueData.js`，替换为真实场馆坐标、模型与讲解文案即可。
- `/hero` 英雄数字人 · 思政课堂：数字人按预设剧本（对话树）逐步讲述课程内容，同时支持自由提问。剧本数据见 `src/data/lessonScript.js`。

讲解/对话的语音朗读使用浏览器内置 Web Speech API（`src/services/speechService.js`），无需额外音频素材；后续如需更自然的配音，可替换为真实录音播放。

## 数字人自由问答接入大模型

自由提问默认返回占位回复（`src/services/llmService.js`）。若要接入真实大模型 API：

1. 复制 `.env.example` 为 `.env`
2. 设置 `VITE_LLM_API_URL` 为你的后端问答接口地址（该接口负责调用大模型，前端不直接持有 API Key）
3. 前端会向该地址 `POST { question, context }`，并期望返回 `{ answer: string }`

## 开发

```bash
npm install
npm run dev      # 本地开发
npm run build     # 生产构建
npm run preview   # 预览构建产物
```
