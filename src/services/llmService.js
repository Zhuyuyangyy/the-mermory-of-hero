// 大模型问答服务的占位实现。
// 配置环境变量 VITE_LLM_API_URL 后，会向该地址 POST { question, context } 并期望返回 { answer }。
// 未配置时返回示例回复，方便在没有后端/密钥的情况下先跑通交互框架。

export async function askHero(question, context = []) {
  const apiUrl = import.meta.env.VITE_LLM_API_URL

  if (!apiUrl) {
    return {
      text: `（示例模式）关于"${question}"，这是一个占位回答。配置 VITE_LLM_API_URL 后可接入真实大模型接口，获得更智能的回复。`,
      mocked: true,
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
    })
    if (!response.ok) throw new Error(`请求失败：${response.status}`)
    const data = await response.json()
    return { text: data.answer ?? data.text ?? '（未获取到有效回答）', mocked: false }
  } catch (error) {
    return {
      text: '抱歉，暂时无法连接到智能问答服务，请稍后再试。',
      mocked: false,
      error: true,
    }
  }
}
