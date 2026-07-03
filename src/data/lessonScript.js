// 占位示例数据：思政课剧本对话树。后续替换为真实课程文案与分支设计。
export const lessonTree = {
  start: {
    speaker: '英雄数字人',
    text: '同学你好，我是这座纪念馆的数字讲解员。今天我想带你重温一段英雄故事，并聊聊这段历史给我们的启示，准备好了吗？',
    options: [{ label: '我准备好了，开始上课', next: 'background' }],
  },
  background: {
    speaker: '英雄数字人',
    text: '在那个艰苦的年代，无数普通人挺身而出，用行动诠释了什么是责任与担当。你觉得，是什么样的信念支撑着他们？',
    options: [
      { label: '对家国的责任感', next: 'reason-country' },
      { label: '对身边人的守护', next: 'reason-family' },
    ],
  },
  'reason-country': {
    speaker: '英雄数字人',
    text: '没错，家国情怀是重要的精神支柱。但英雄的选择，往往也源于对身边普通人的牵挂，这两者并不矛盾。',
    options: [{ label: '原来如此，请继续', next: 'story' }],
  },
  'reason-family': {
    speaker: '英雄数字人',
    text: '你说得很对，对身边人的守护是最朴素也最真挚的情感。而这种情感，往往会升华为更大的责任与担当。',
    options: [{ label: '原来如此，请继续', next: 'story' }],
  },
  story: {
    speaker: '英雄数字人',
    text: '（示例剧情）在一次紧要关头，他毫不犹豫地选择了保护身后的战友与乡亲，用自己的行动写下了这段历史。',
    options: [{ label: '这种精神对今天有什么意义？', next: 'meaning' }],
  },
  meaning: {
    speaker: '英雄数字人',
    text: '英雄精神从未远去。今天，它体现在每一个认真做好本职工作、在关键时刻愿意站出来的普通人身上。你身边有没有这样的人？',
    options: [{ label: '想和数字人自由聊聊这个话题', next: 'free-chat' }],
  },
  'free-chat': {
    speaker: '英雄数字人',
    text: '很好，接下来你可以在下方输入框自由提问，我会尽力和你交流；如果想继续跟随课程，也可以点击“结束本节课程”。',
    options: [{ label: '结束本节课程', next: 'end' }],
  },
  end: {
    speaker: '英雄数字人',
    text: '感谢你和我一起完成了这段思政课学习，希望英雄精神能在你心中留下印记。课程到这里就结束啦。',
    options: [{ label: '重新开始', next: 'start' }],
  },
}

export const LESSON_START_NODE = 'start'
