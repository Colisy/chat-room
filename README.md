# chat-room

 #### 简单聊天室
## 用到的技术
#### &nbsp; &nbsp; &nbsp; &nbsp;  vue+node(express)+socket.io+vux+axios+vuex+stylus+moment
  - socket.io&nbsp; <a style='color:#2196F3'>https://socket.io/</a>&nbsp;官网介绍的很详细。大家可以去看下。
  - node express 当中间层对数据进行处理，不会的朋友可以去我的node-MiddleLayer看下。&nbsp; &nbsp; <a style='color:#2196F3'>https://github.com/Colisy/node-MiddleLayer</a>&nbsp; &nbsp;  一个简单的demo。
  - vux 一个vue的UI框架
    * 要注意安装完vux,安装vuei18n,一般会有 errMsg:$t is not defined。
    * 要在webpack.base.conf.js里面添加<br><br>
    const vueLoaderConfig =require('./vue-loader.conf')<br>
    const vuxLoader = require('vux-loader')<br><br>
    module.exports = vuxLoader.merge(webpackConfig, {<br>
      plugins: ['vux-ui']<br>
    })<br>
    将之前的 module.exports替换为 const webpackConfig;
  - axios 常见问题：发送post的请求的时候，注意不能传递object。要传递string。
  - moment.js 是一个对时间处理的插件（一般不用，自己封装）
  - 其他的就没有什么了。

## 开发过程可能会遇到的问题
  - 连接AI的时候发送get请求会提示跨域<br>
  - 发送jsonp或者别的jquery中的getJSONP请求后台都会显示 "缺少 :" 。 其实是因为后台返回的json格式的所以jsonp请求是不行的。我在项目中用的是node当一下中间层，在后台加上header的一些配置。
  - 当输入信息发送之后滚动条要滚动到卷起来的高度，设置(例如：this.$refs.content.scrollTop=100）无效。scrollTop不能加单位，content要设置高度。min-height不行。
  - 如果想用户没有输入用户名之前不能进行聊天，也不能和AI聊天。设置 beforeRouteEnter即可。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Server Setup
``` bash
# server running
node app.js
```
