# modal 处理方案
原生的wx.showModal 没有动画，过于生硬。用 js/animation / css 实现一个圆滑的modal功能

![效果预览](https://github.com/a805883237/wxapp_components/blob/master/wxapp/compontents/modal/modal_effect_preview.gif)

### js代码
```js
constructor(props) {
    this.state = {
        animationDatas:{}
    }
}
  // 禁止滚动事件 背景图层穿透
  unScrollEnabled(){
  }
 //隐藏modal
  hideModal() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out'
    });
    that.animation = animation;
    animation.translateY(300).step();
    animation.opacity(1).step();
    that.setState({
      animationDatas: animation.export()
    });
    setTimeout(() => {
      animation.translateY(0).step();
      animation.opacity(0).step();
      that.setState({
        animationDatas: animation.export(),
        ModalShow: false
      });
    }, 200);
  }
  // 显示 modal
  showModal() {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 400,
      // 定义动画效果，当前是匀速
      timingFunction: 'ease-out'
    })
    // 将该变量赋值给当前动画
    that.animation = animation;
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200);
    animation.opacity(0).step();
    // 用setData改变当前动画
    that.setState({
      // 通过export()方法导出数据
      animationDatas: animation.export(),
      ModalShow: true
    });
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(() => {
      animation.translateY(0);
      animation.opacity(1).step();
      that.setState({
        animationDatas: animation.export()
      });
    }, 200);
  }
```

```xml
<view class="modal_box" catchtap="hideCoupons"
      catchtouchmove="unScrollEnabled"
      wx:if="{{state.ModalShow}}" animation='{{state.animationDatas}}'>
    <view class="df box" catchtap="noAction">
        <view class="rf jcc aic det_title">
          <text class="de_title">窗体标题</text>
        </view>

        <view class="modal_inner">
          <!-- 自定义内容区 -->
        </view>
    </view>
</view>
```
```css
.modal_box{
    position: fixed;
    width:100vw;
    height:100vh;
    background-color: rgba(0,0,0,0.4);
    top: 0;
    left:0;
    z-index: 11;
    .box{
      position: absolute;
      bottom: 0;
      left:0;
      width: 100vw;
      height:50vh;
      background-color: #fff;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      .det_title{
        height: 100rpx;
        border-bottom: 1rpx solid #eee;
        .de_title{
          font-size: 26rpx;
          font-weight: bold;
        }
      }
  }
}
```

##### 如果有滚动穿透现象发生，添加如下函数，在modal_box一层 添加：catchtouchmove="unScrollEnabled"
```
unScrollEnabled(){}
```
