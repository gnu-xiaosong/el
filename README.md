# el 语言

el 文档标签语言，独立的解析引擎，帮助文档人员快速书写自己文档。

# 特性

- 兼容大多数 makdown 语法{不是 makdown 改来的，完全独立的解析引擎}
- 独立解析引擎
- 语法模块法开发
- 原生 nodejs 开发，不依赖任何第三方库
- 语法嵌入式更强，周期渲染模式和函数式调用

# 官网文档

- 文档正在编写中...... 尽请期待
- 官网地址：建设中.......

# 克隆仓库使用

```
//安装依赖
npm i
//example command
node test.js
```

# 安装

- npm 包安装

```
npm install el-xskj
```

- script 浏览器引入----el.min.js 在 dist 目录下的 el.min.js

```
<script src="el.min.js"></script>
```

# 使用

- nodejs 使用

```
var El=require("el-xskj");

//el语言 -----支持单元语法以及文本语法（注意：每个单元语法之间用||||||分隔）
var data；

//挂载模式
var app=new El({
    data:data,
    el:"挂载元素id"
});
```

- script 浏览器引入

```
<script src="el.min.js"></script>
<script>
//挂载模式
var app=new El({
    data:data,
    el:"挂载元素id"
});

//函数调用模式
var app1=new El();

//返回解析后的html代码
var data2=app1.el(data);

</script>
```
