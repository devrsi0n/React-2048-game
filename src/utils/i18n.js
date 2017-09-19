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
