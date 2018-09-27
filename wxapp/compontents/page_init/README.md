# 页面常用状态封装的一套公共组件。

使用前提：
1. 采用flex 布局
2. 使用iconfont


存在状态如下：

1. 没有登录
    <template wx:if="{{true}}" is="no_login" data="{{text:'没有购物车数据',icon:'icon-nullgouwuche'}}"/>
2. 没有数据：
    <template wx:if="{{true}}" is="empty_view" data="{{text:'没有数据',icon:'icon-nulldata'}}"/>
3. 数据加载中：
    <template wx:if="{{true}}" is="loading_data_view" data="{{text:'数据加载中...'}}"/>
4. 数据加载失败：
    <template wx:if="{{true}}" is="empty_view" data="{{text:'数据加载失败',icon:'icon-nulldata'}}"/>
