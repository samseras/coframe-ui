
## Coding Rules

### Entitle Rules
1. 所有文件夹,文件名 一律使用蛇形命名, 不允许出现大写字母
2. 模块名按层级转化为文件夹名称, 文件名要求简洁
  ex:  admin/user/list.vue

### Js Rules
1. 语句末尾不允许写 ; 号
2. 字符串统一用 单引号
3. 变量名,方法名必须使用驼峰命名
4. 编码使用 Es6 规范, 无特殊情况不允许使用 es5 语法 
```
ex: 
 for(;;)        =>    list.forEach()
 function(){}   =>    () => {}
 var            =>    let , const
 
 user.name = user1.name   =>   user = {...user1}
 user.age  = user1.age
```
### Css Rules
1. 使用 scss 语法, 有层级关系的css必须嵌套, 组件内样式 必须加上  scoped
2. 无特殊情况, 只允许使用 element 官网 定制的 颜色 ,字体
3. 无特殊情况 定位一律使用内置 class
```
 position: relative; => class="position-relative"
 position: absolute; => class="position-absolute"

 m => margin
 ml => margin-left
 mr => margin-right
 mt => margin-top
 mb => margin-bottom

 p => padding
 pl => padding-left
 pr => padding-right
 pt => padding-top
 pb => padding-bottom
 
 size: 0,5,10,20
 
 ex: 
 margin-left: 20px;  => class="ml-20"
 padding-top: 10px;  => class="pt-10"
 padding: 5px;  => class="p-5"
```

### Vue Rules
1. 模板中严禁出现逻辑代码, 只允许调用 data, computed, method, 最多允许使用三元条件表达式
2. vue文件块儿顺序
```
<template></template>
<script></script>
<style></style>
```
3. javascript 元素顺序
```
  name
  mixins
  components
  provide/inject
  props
  computed
  data
  create/mounted
  ...
  destroy
  watch
  methods
```
## Menu Icon 

1. 菜单图标存放位置 src/assets/iconfont/resources/
2. 菜单图标选择器增加图标步骤

    1. [阿里iconfont图标库](https://www.iconfont.cn/)选择图标
    2. 购物车选择下载代码
    3. 将文件中的 demo_index.html、demo.css、iconfont.js删除
    4. 将文件放入项目中 （src/assets/iconfont/resources/）
    5. 执行 npm run build:icon 命令
    6. 启动项目
