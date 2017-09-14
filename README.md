# A fancy 2048 game build with react, redux

----
There are so many 2048 implements, I build this game as learn react and redux demo.

# 填坑
----

  在写烟花动画的时候发现怎么调都没效果，仔细对比了下 webpack 编译后的 css 文件发现所有的 @keyframes
的名字都加了 hash 值（也就是当成普通的局部 css 类名），解决办法就是在 @keyframes 的名字前面添加伪类 :local，可以参考烟花的 scss 文件。
