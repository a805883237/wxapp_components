# 小程序检查更新部分
只有一个js 工具类文件， 没有其他
**里面已经将原生的写法也写入进去了，使用时需要注意**


#### 使用
```js
// app.js
import {compareVersion, update} from "./utils/update_manager.js";
class ClassName {
  constructor() {

  }
  onLaunch(){
    // 小程序检查更新
    let checkVersion = compareVersion('1.9.90') == 1;
    console.log("是否可以检查更新",checkVersion ?"可以检查更新":"不可以检查更新")
    if (checkVersion){
      update();
    }
  }
}
```