# React-2048-game

[![codebeat](https://codebeat.co/badges/9b33ea0e-5cf5-44b3-9a52-438667fb2673)](https://codebeat.co/projects/github-com-devrsi0n-React-2048-game-master)
[![travis-ci](https://travis-ci.org/devrsi0n/React-2048-game.svg?branch=master)](https://travis-ci.org/devrsi0n/React-2048-game)
[![codecov](https://codecov.io/gh/devrsi0n/React-2048-game/branch/master/graph/badge.svg)](https://codecov.io/gh/devrsi0n/React-2048-game)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

基于 React 和 Redux 最佳实践构建的 2048 游戏。

👉 [开始游戏](https://devrsi0n.github.io/React-2048-game/)

## 预览

### 桌面端

<a href="https://devrsi0n.github.io/React-2048-game/">
  <img
    src="https://github.com/devrsi0n/React-2048-game/blob/master/screenshot.png"
    onerror='this.onerror = null; this.src="http://wx1.sinaimg.cn/large/8ef543b5gy1fkbxcpxtytj21kw0wyqct.jpg"'
    width="80%"
    alt="screenshot">
</a>

### 移动端

<a href="https://devrsi0n.github.io/React-2048-game/">
    <img
      src="https://github.com/devrsi0n/React-2048-game/blob/master/screenshot-iPhone.png"
      onerror='this.onerror = null; this.src="http://wx2.sinaimg.cn/large/8ef543b5gy1fkbxcozh9cj20fl0woju7.jpg"'
      width="25%"
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
* [Prettier](https://github.com/prettier/prettier),js 和 scss 代码格式美化工具
* [PWA](https://zhuanlan.zhihu.com/p/25167289)(Progressive Web Apps),借助浏览器 service worker 能力，使 web 应用在移动平台有接近原生应用的能力，可离线使用，接收通知消息等等

## 运行 & 测试 & 打包

建议使用 yarn 来管理依赖包。

```bash
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
