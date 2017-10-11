# React-2048-game

[![codebeat](https://codebeat.co/badges/9b33ea0e-5cf5-44b3-9a52-438667fb2673)](https://codebeat.co/projects/github-com-devrsi0n-React-2048-game-master)
[![travis-ci](https://travis-ci.org/devrsi0n/React-2048-game.svg?branch=master)](https://travis-ci.org/devrsi0n/React-2048-game)
[![codecov](https://codecov.io/gh/devrsi0n/React-2048-game/branch/master/graph/badge.svg)](https://codecov.io/gh/devrsi0n/React-2048-game)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[react](https://github.com/facebook/react) 毫无疑问是目前最热门的前端视图库，[redux](https://github.com/reactjs/redux) 是 React 社区基于函数式编程思想也是最热门的应用状态管理容器；本项目构建的 2048 游戏通过践行社区的[最佳实践](https://www.codementor.io/faizanhaider/react-components-best-practices-9xcbq5uwe)来学习这套前端编程思想。

👉 [开始游戏](https://devrsi0n.github.io/React-2048-game/)

## 预览

### 桌面端

<a href="https://devrsi0n.github.io/React-2048-game/">
  <img
    src="http://wx1.sinaimg.cn/large/8ef543b5gy1fkbxcpxtytj21kw0wyqct.jpg"
    width="80%"
    alt="screenshot">
</a>

### 移动端

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx2.sinaimg.cn/large/8ef543b5gy1fkbxcozh9cj20fl0woju7.jpg"
      width="25%"
      alt="screenshot">
</a>

## 特性

### 响应式

自适应桌面和移动平台不同分辨率和尺寸，支持移动平台浏览器触控操作。下面的动图模拟了不同分辨率下的显示效果。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx2.sinaimg.cn/large/8ef543b5gy1fkc2fmcz2pg211r0hwkjl.gif"
      width="80%"
      alt="screenshot">
</a>

### 数据持久化

网页应用最怕断电和离线，第一个问题通过`store.subscribe`订阅 redux 状态更新，把状态序列化到`localStorage`储存，即使刷新，断电，程序奔溃再次打开仍然是最新的状态，第二个问题借助 chrome 的 [PWA](https://zhuanlan.zhihu.com/p/25167289) 技术，即使断开网络仍然可以访问缓存的资源文件。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx4.sinaimg.cn/large/8ef543b5gy1fkc2yttd75g20q20he45j.gif"
      width="80%"
      alt="screenshot">
</a>

### Redux 状态

[redux](https://github.com/reactjs/redux) 是一个可预测的 JS 状态管理容器，结合 [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension) 扩展可以很方便的进行应用状态穿梭，对辅助开发和debug大有裨益。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx1.sinaimg.cn/large/8ef543b5gy1fkc2yuvm6eg211i0he460.gif"
      width="80%"
      alt="screenshot">
</a>

### 评论系统

借助 github issue api，使用 github 账号登录之后以回复 issue 的方式留言。留言支持 markdown 格式，和 github issue 体验类似。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx3.sinaimg.cn/large/8ef543b5gy1fkc46le2z6g20u30i10vc.gif"
      width="80%"
      alt="screenshot">
</a>

### PWA

在支持 [PWA](https://zhuanlan.zhihu.com/p/25167289) 技术的浏览器上（比如较新的 chrome）打开页面会自动询问你添加到屏幕，添加过程就像原生应用的安装一样。应用添加之后就可以像原生应用一样离线操作，也可以卸载应用。下图演示了 PWA 在 chrome 上面的添加过程，添加完成之后桌面会出现添加的应用，即便关闭所有网络仍然可以像原生应用一样正常操作。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx1.sinaimg.cn/large/8ef543b5gy1fkc6aoang1g20k00zkb2b.gif"
      width="25%"
      alt="screenshot">
</a>

### i18n

应用支持多语言，且自动适配浏览器语言设置。目前检测到中文优先使用中文，否则默认使用英文显示。需要更多语言支持，编辑`src/utils/i18n.js`的 `data`对象，添加对应语言文字即可。

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="http://wx1.sinaimg.cn/large/8ef543b5gy1fkd6q1uwvij21kw113tft.jpg"
      width="80%"
      alt="screenshot">
</a>

## 技术栈

* [react](https://github.com/facebook/react)，组件式构建 UI
* [redux](https://github.com/reactjs/redux)，管理应用状态
* [babel](https://github.com/babel/babel)，把 es2017+ 语法转成 es5 兼容语法
* [webpack](https://github.com/webpack/webpack)，代码热加载，scss 样式文件处理，组件打包编译等等
* [scss](https://github.com/sass/sass)，成熟的 css 预处理器（之所以没有用 CssInJS 的方案是因为这些方案普遍不完美，也考虑到要遵循样式和结构分离的原则）
* [eslint](https://github.com/eslint/eslint)，使用流行的 airbnb 的代码规范严格约束代码风格
* [stylelint](https://github.com/stylelint/stylelint)，scss 代码风格检查
* [jest](https://github.com/facebook/jest)，fb 出品的代码测试框架，snapshot 功能对测试 react 组件 UI 十分方便
* [Prettier](https://github.com/prettier/prettier)，js 和 scss 代码格式美化工具
* [PWA](https://zhuanlan.zhihu.com/p/25167289)(Progressive Web Apps)，借助浏览器 service worker 能力，使 web 应用在移动平台有接近原生应用的能力，可离线使用，接收通知消息等等

## 运行 & 测试 & 打包

因为配置文件用了 es6+ 语法所以要求 node 的版本大于 6.10，同时建议使用 yarn 来管理依赖包。

```bash
  npm i -g yarn # 安装 yarn
  git clone git@github.com:devrsi0n/React-2048-game.git
  cd React-2048-game
  yarn # 安装依赖包
  yarn start # 开启调试模式
  yarn test # 自动测试
  yarn build # 打包代码
```

## 踩坑记录

* 在调烟花动画的时候发现没效果，仔细对比了下 webpack 编译后的 css 文件发现所有的 @keyframes 的名字都加了 hash 值（也就是当成普通的局部 css 类名），解决办法就是在 @keyframes 的名字前面和整个 scss 文件添加伪类 :global，可以参考烟花的 scss 文件，这不是完美的解决办法(css 类名不再有局部特性)，后续再深挖一下。

## License

[MIT](http://opensource.org/licenses/MIT)
