# MyBlog 个人博客

### 2017.03.15 Wed.

#### 跳转

实现基本按钮点击跳转，未加入hash链

### 2017.03.13 Mon.

#### 重造

使用SPA设计模式，初步完成图片分割效果

### 2017.03.09 Fri.

#### 完成图片分割效果插件

###### animate-plugin

>[背景图片来源域名好像已经失效了](http://www.5iweb.com)

添加插件方法：

    $(container).sliceImage(imgURL,index,shadow,delay,props)
    //container 图片所在容器
    // imgURL 图片路径
    // index animate-plugin.css在所有样式表中索引值
    // shadow css属性box-shadow的值
    // delay 各区域动画延时时间
    // props 各区域属性，支持数组形式
    // 区域全属性列表
    {
        "z-index":,
        "top":,
        "left":,
        "width":,
        "height":,
        "background-position":,
        "background-size":
    }

#### 修改index页浏览器版本支持

判断浏览器是否支持css3属性“transition”从而向首页或错误页的跳转。

### 2017.03.08 Wed.

#### 个人博客正式开工

###### index

通过判断浏览器是否支持document.getElementsByClassName，得出版本是否低于或等于IE8，从而进行向首页或错误页的跳转。

暂时不准备做IE低版本兼容以及移动端兼容。

###### error

>[Error两边的插座图片来源](http://588ku.com/sucai/3196661.html)
>
>虽然已经更改过，但担心存在版权问题，因此将所用图片的链接附上。

完成了error页面的设计与编写，兼容了IE8及以下版本。