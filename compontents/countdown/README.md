## 小程序倒计时组件

![效果预览](https://raw.githubusercontent.com/a805883237/wxapp_components/master/impress_img/countdown_ok.gif)

**日期格式转换 ：end_date.replace(/-/g, "/")**
**ps : 日期中间的连接符必须是 / 。如果是别的 不支持转换**


### 使用方法: 一个页面有两个以上的 倒计时：
 开始使用：
 ```
 <text class="countdown"> {{state.other_state.clock}}</text>
 ```
 控制样式：
 ```
 .countdown{} 输入样式即可
 ```
 js 部分
 ```js
 //引入：
 var countdown = require('../../utils/countdown/countdown.js');
 // 使用，开始计时：
 countdown.countdowns(this,{
    now_micro_second: new Date("2018/03/28 18:00:00").getTime() - new Date().getTime(),
    format:"DD:HH:mm:ss"
  },"limit_discount_count");
 // 使用：
 //  xml :
 //   引入
      <import src="../../utils/countdown/countdown.wxml" />
 //   开始使用：
      <template is="countdown" data="{{clock:state.countdownData.clock}}"/>
 //     控制样式：
      .countdown{} //输入样式即可
 //   js:
 //      引入：
        var countdown = require('../../utils/countdown/countdown.js');
 //     使用，开始计时：
      countdown.countdown(this,{
        now_micro_second: new Date("2018/03/28 18:00:00").getTime() - new Date().getTime(),
        format:"DD:HH:mm:ss"
      });
 //   切记 一定要 清除
     onUnload(){
      countdown.close(this)
    }
```