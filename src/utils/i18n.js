const data = {
  lang: ["cn", "en"],
  default: "cn",
  text: {
    title: {
      cn: "2048",
      en: "2048"
    },
    score: {
      cn: "得分",
      en: "SCORE"
    },
    best: {
      cn: "最佳",
      en: "BEST"
    },
    tipTitle: {
      cn: "提示",
      en: "Tips"
    },
    tipContent: {
      cn: "使用键盘箭头键（或 WASD ）控制方块;反悔了？点回退按钮回退到上一步的状态。",
      en:
        "User keyboard arrow keys (or `WASD` if you like) control blocks;Click undo button to revert to last step status if you regrets"
    },
    commentTitle: {
      cn: "欢迎留 <span>tu</span> 言 <span>cao</span>",
      en: "Welcome comments"
    }
  }
};

const lang = (() => {
  let lan = navigator.language || navigator.userLanguage;
  lan = lan === "zh-CN" ? "cn" : lan;
  lan = lan === "en-US" ? "en" : lan;
  lan = ["cn", "en"].includes(lan) ? lan : data.default; // Set default language
  return lan;
})();

const text = {};
Object.keys(data.text).map(key =>
  Object.defineProperty(text, [key], {
    get: () => data.text[key][lang]
  })
);

export default text;
