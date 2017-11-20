// i18n text
const data = {
  lang: ['cn', 'en'],
  default: 'cn',
  text: {
    title: { cn: 'React 构建的 2048', en: 'React 2048 game' },
    home: {
      cn: '首页',
      en: 'Home'
    },
    comments: {
      cn: '留言',
      en: 'Comments'
    },
    ranking: {
      cn: '排行榜',
      en: 'Ranking'
    },
    chartTitle: {
      cn: '2048 排行榜',
      en: '2048 Ranking list'
    },
    chartSubTitle: {
      cn: '加油冲榜吧！ (ง •̀_•́)ง',
      en: 'Come on! (ง •̀_•́)ง'
    },
    score: { cn: '得分', en: 'SCORE' },
    best: { cn: '最佳', en: 'BEST' },
    tipTitle: { cn: '提示', en: 'Tips' },
    tipContent: {
      cn:
        '使用键盘箭头键（或 WASD ）控制方块;反悔了？点回退按钮回退到上一步的状态。想要上排行榜？先去留言面板登录吧。',
      en:
        'Use keyboard arrow keys (or `WASD` if you like) control blocks;Click undo button to revert to last step status if you regrets。You score will upload to ranking list after you login at `Comments` panel'
    },
    commentTitle: {
      cn: '欢迎留 <span>tu</span> 言 <span>cao</span>',
      en: 'Welcome to leave comments'
    }
  }
};

const lang = (() => {
  let lan = navigator.language || navigator.userLanguage;
  lan = lan === 'zh-CN' ? 'cn' : lan;
  lan = lan === 'en-US' ? 'en' : lan;
  lan = ['cn', 'en'].includes(lan) ? lan : data.default; // Set default language
  return lan;
})();

const text = {};
Object.keys(data.text).map(key =>
  Object.defineProperty(text, [key], {
    get: () => data.text[key][lang]
  })
);

export default text;
