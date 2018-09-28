// toast.js
/**
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
 */


/**
 * 显示toast 默认3000ms
 */
function showToast(page, toastText, count, isShowMask) {

    console.log("page=======", page);
    // toast时间
    count = parseInt(count) ? parseInt(count) : 3000;

    page.setState({
        //设置toast时间，toast内容
        count: count,
        toastText: toastText,
        // 显示toast
        isShowToast: true,
        isShowMask: isShowMask,
    });

    // 定时器关闭
    setTimeout(function () {
        page.setState({
            isShowToast: false,
            isShowMask: false
        });
    }, count);
}

/**
 * 显示toast 默认1500ms
 */
function showToastDefault(page, toastText) {
    this.showToast(page, toastText, 1500, false);
}

/**
 * 全屏不可点击 显示toast 默认2000ms
 */
function showToastWithMask(page, toastText) {
    this.showToast(page, toastText, 2000, true);
}

module.exports = {
    showToast: showToast,
    showToastDefault: showToastDefault,
    showToastWithMask: showToastWithMask
}
