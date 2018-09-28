# toast 轻提示

**不带遮罩效果**
![效果预览](https://raw.githubusercontent.com/a805883237/wxapp_components/master/compontents/toast/toast_style.jpg)
**带遮罩效果**
![效果预览](https://raw.githubusercontent.com/a805883237/wxapp_components/master/compontents/toast/toast_with_mask.jpg)

### js 部分
```js
* 使用方法：
 ** xml:
    <include src="../../utils/toast/toast.wxml" />
 **  js:
    var toast = require('../../utils/toast/toast.js');

 ** 使用：
     全屏可点击 默认1500ms 类似android toast
        toast.showToastDefault(page, toastText)
    全屏不可点击 默认 2000ms
        toast.showToastWithMask(page, toastText)
    可定制
        toast.showToast(page, toastText, count, isShowMask)
 ** 参数
     page:页面
     toastText:提示文字
     count:显示时间
     isShowMask:是否显示蒙层

 * 例子：
    toast.showToast(this, "您已领取过此优惠券", 2000);
```

### css 部分
```css
/* 在那个页面引用就放到哪个页面的css中 */
/* 或者放到 app.wxss 中 ，全局所有页面都可以使用
    @import "./utils/toast/toast.less";
```