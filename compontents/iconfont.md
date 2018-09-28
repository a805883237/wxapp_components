# 小程序 iconfont 实现


http://blog.csdn.net/rosemarrytop/article/details/56480272
1. 下载字体库（iconfont.cn）
2. https://transfonter.org/ 转码 ： ( * add font * fanmily support、base64 encode 、 formats: ttf * Convert & downfile)
3. 拷贝 下载文件中的 ttf 和 stylesheet.css 代码  ， ttf 到根目录， css到 app.wxss 中
4. 设置 iconfont 类 和 指定iconfont
```css
.iconfont {
  font-family:"iconfont" !important;
  font-size:32rpx;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* 这里的 icon-kefu 是 icon 名称， \e625是 unicode 必须一一对应， \转译 不可缺少*/
.icon-kefu:before { content: "\e625"; }
```
**使用：**
```xml
<text class="iconfont icon-jiantou selected_icon"/>
```
**指定 icon 大小 颜色 以及其他值**
```css
.selected_icon{}
```