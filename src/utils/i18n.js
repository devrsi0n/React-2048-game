const data = {
  lang: ['cn', 'en'],
  default: 'cn',
  text: {
    title: {
      cn: '2048 游戏',
      en: '2048 game',
    },
    score: {
      cn: '得分',
      en: 'SCORE',
    },
    best: {
      cn: '最佳',
      en: 'BEST',
    },
    tips: {
      cn: '<strong>提示</strong>： 使用键盘箭头键（或 WASD ）控制方块;<br/>不小心按错了？点回退按钮可返回到上一步的状态。',
      en: '<strong>Tips</strong>: User keyboard arrow keys (or `WASD` if you like) control blocks;<br/>Click undo button to revert to last step status if you regrets',
    },
  },
};

const lang = (() => {
  let lan = navigator.language || navigator.userLanguage;
  lan = lan === 'zh-CN' ? 'cn' : lan;
  lan = lan === 'en-US' ? 'en' : lan;
  lan = ['cn', 'en'].includes(lan) ? lan : 'en'; // Set 'en' as default language
  return lan;
})();

const text = {};
Object.keys(data.text).map(key =>
  Object.defineProperty(text, [key], {
    get: () => data.text[key][lang],
  }),
);

export default text;
