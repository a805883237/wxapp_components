# 页面常用状态封装的一套公共组件。

使用前提：
1. 采用flex 布局
2. 使用iconfont

###### 效果预览
**没有数据、数据加载失败 ，都可以自定义**
![效果预览](https://github.com/a805883237/wxapp_components/blob/master/wxapp/compontents/page_init/empty_data_pic.jpg)
**加载数据，数据加载中**
![效果预览](https://github.com/a805883237/wxapp_components/blob/master/wxapp/compontents/page_init/loading_data_view_img.jpg)

存在状态如下：

1. 没有数据：
    <template wx:if="{{true}}" is="empty_view" data="{{text:'没有数据',icon:'icon-nulldata'}}"/>
2. 数据加载中：
    <template wx:if="{{true}}" is="loading_data_view" data="{{text:'数据加载中...'}}"/>
3. 数据加载失败：
    <template wx:if="{{true}}" is="empty_view" data="{{text:'数据加载失败',icon:'icon-nulldata'}}"/>
