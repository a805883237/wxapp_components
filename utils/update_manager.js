// 小程序检查更新部分

// todo 如果是原生的小程序 下面一行可以删除
import wx from "labrador";


// 获取 微信版本号
function getSysVersion() {
  var res = wx.getSystemInfoSync();
  return res.SDKVersion
}
/**
 * 例子： if (compareVersion('1.9.90') == 1) { update() }
 *        如果大于 "1.9.90"  就更新
 * 比较当前微信版本 是否大于指定版本
 * @param ver   指定版本号 "1.9.90"
 * @returns {number}  1 大于 2 小于
 */
export function compareVersion(ver) {
  var v1 = getSysVersion().split('.');
  var v2 = ver.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      console.log("当前版本",v1.join("."),"大于：",ver)
      return 1
    } else if (num1 < num2) {
      console.log("当前版本",v1.join("."),"小于：",ver)
      return -1
    }
  }
}

/**
 * 检查更新
 */
export function update() {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate((res)=> {
    // 请求完新版本信息的回调
    console.log("开始检查版本，是否有更新：",res.hasUpdate?"有":"没有")
  });

    /* todo 如果是原生的小程序 下面的函数 需要替换为

    updateManager.onUpdateReady(() => {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res)={
          if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
          }
      }
    })
  });
     */
  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？'
    }).then((res)=>{
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
    });
  });



  updateManager.onUpdateFailed( () => {
    // 新的版本下载失败
  });
}
