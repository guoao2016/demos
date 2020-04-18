dev todo 1  dev-5.1
dev-5.1  bug
bug

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>小三角</title>
    <style>
        .angle{
            display: block;
            margin:20px auto;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-bottom-color: red;
        }
    </style>
</head>
<body>
    <p>小三角</p>
    <div class="angle"></div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>img - srcset - sizes</title>
</head>

<body>
    <img src="small.jpg " srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x" />
    <!-- <img src="small.jpg " srcset="big.jpg 800w, middle.jpg 600w, small.jpg 1x" /> -->
    <!-- 上面的例子表示浏览器宽度达到 800px 则加载 middle.jpg ，达到 1400px 则加载 big.jpg。注意：像素密度描述只对固定宽度图片有效。 -->


    <img src="big.jpg" srcset="big.jpg 1200w, middle.jpg 800w, small.jpg 320w"
        sizes="(max-width: 320px) 300w, 1200w" />

    <!-- 上面的例子表示浏览器视口为 320px 时图片宽度为 300px，其他情况为 1200px。 -->
</body>

</html>
get / http1.1
refer: 值
user-agent
etag:
cache-control

http响应
content-length: 2684长度
空行
body<html>
标签信息 都是http body
</html>

dsn预加载

1. 如何少加载文件
    1. 合理利用浏览器文件缓存

main.js 的加载来看待这个问题

1. 首次加载 http请求， server正常返回
    1. 返回响应头加上强缓存的说明(真实事件)
    2. expires: wed 11 Aug 2019 20:20:00 (过期时间)
    3. cache-control: max-age = 300000 (http1.1 精准，优先级高)
    4. 两个header都是后端告诉浏览器，这个文件， 多少时间内 不过期（比如一个小时）
    5. 浏览器接收到上面两个header 就会把文件保存起来

2. 一个小时内再请求这个文件
    1. 浏览器识别到强缓存命中，请求不发出，直接用本地的缓存文件 状态码是 200 from cache

3. 2个小时后，再次请求这个文件， 强缓存失效， 使用协商缓存
    1. 浏览器不会直接发出请求，而是问一下后端，header带上请求头
        1. if-modified-since: 日期 后端小老弟，这个文件，在这个日子之后有没有修改过
        2. 后端告诉你 没改过，请用缓存，响应式304 not modified
        3. 浏览器直接用缓存
        4. 优先级更高的，是etag 文件的指纹 (比如把a字符删掉加上，实际上文件修改了，不过etag不变)

4. 如果后端告诉你 改过了 只能重新加载了


文件缓存虽然js控制不到， 浏览器控制的， 但是我们可以通过工程化，高效利用缓存
如何高效利用缓存
如何上线前端代码

1. 缓存时间过长
    1. 发布上线了，用户端还用缓存，会有bug
2. 缓存时间过短
    1. 重复加载文件太多， 浪费带宽

模板（html）

静态资源（css js image video audio等）

1. 模板或者html不能有缓存
    1. 这个是入口，我们一旦有新代码发布上线，没法加载了
2. 文件加哈希
    1. 上线之后，要求用户强刷新 这种问题 用文件名+指纹的方式解决了
    2. a.hash.js hash是整个a.js 文件的md5值，文件内容不变，hash不变，缓存生效
        1. 文件内容变，缓存变，文件名都变了
        2. a.abcd.js => a.bdf.js
        3. 所有静态资源，缓存可以设置很长时间

历史方案
1.  加时间戳 <script src="/a.js?_t=xxx"></script>
2.  加版本号 <script src="/a.js?_v=1.6"></script>
3.  加指纹 但是不产生新文件 <script src="/a.js?_h=abcd12"></script>
4.  最终 诞生了最优的 产生新文件<script src="/a.abcd12.js"></script>

