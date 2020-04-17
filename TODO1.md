dev todo 1  dev-5.1
dev-5.1
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dev-5.1</title>
    <style>
        .p1{

        }
        .p2{
            height: 200px;
            background-color: blueviolet;
        }
    </style>
</head>
<body>
    <p class="p1">
        <!-- https://www.cnblogs.com/chenyanlong/p/10551080.html -->
        回流： 当我们对DOM的修改引发了DOM几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，
        浏览器需要重新计算元素的几何属性（其他元素的几个属性和位置也会受到影响），然后再将计算的结果绘制出来。
        这个过程就是回流（也叫重排）。

        重绘：当我们对DOM的修改导致了样式的变化、却并未影响其几何属性，
        （比如修改了颜色或背景色）时，浏览器不需要重新计算元素的几何属性、
        直接为该元素重新绘制新的样式（跳过了上图所示额回流环节）。这个过程叫做重绘。

        重绘不一定导致回流，回流一定会导致重绘

        回流是影响最大的
        1. 窗体，字体大小
        2. 增加样式表
        3. 内容变化
        4. class属性
        5. offsetWidth 和 offsetHeight
        6. fixed


        优化：
        1：用transform 代替 top，left ，margin-top， margin-left... 这些位移属性
        2：不要使用 js 代码对dom 元素设置多条样式，选择用一个 className 代替之。
        3：如果确实需要用 js 对 dom 设置多条样式那么可以将这个dom 先隐藏，然后再对其设置
    </p>
    <p class="p2">
        测试
    </p>
</body>
</html>