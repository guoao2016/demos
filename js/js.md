1. 事件代理

2. 请解释 JavaScript 中 this 是如何工作的

3. javascript继承

    这个不多说，十分十分重要。建议按照《高程三》的继承那里，仔细理解哦。

4. javascript模块化

    理解模块化发展过程，理解 commonJS，AMD，CMD，ES6模块化

5. IIFE 立即执行函数
    [参考](https://www.cnblogs.com/wawahaha/p/4865574.html)

6. null undefined区别

7. 闭包 与 作用域

    非常重要，书上有！

8. 匿名函数

9. 你是如何组织自己的代码？是使用模块模式，还是使用经典继承的方法？

10. 宿主对象 (host objects) 和原生对象 (native objects)

11. 请指出以下代码的区别：
    function Person(){}、var person = Person()、var person = new Person()？

12. apply call bind

    深入到源码如何实现这三个功能的。

13. new

    源码如何实现的？

14. document.write()

15. 特性检测 特性推断 UA字符串嗅探

16. Ajax工作原理

    着重理解XMLHttpRequest！！

17. 跨域

    图片ping, JSONP, CORS。

    这是面试必问的点。注意一定要完全理解，完全！

18. 变量声明提升

19. 冒泡机制

20. attribute 和 property

21. document load 和 document DOMContentLoaded

    非常重要哦

22. == 和 === 有什么不同

23. 同源策略 (same-origin policy)

    Cookie，iframe，AJAX同源

24. strict模式

25. 为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择

26. 为何你会使用 load 之类的事件 (event)？此事件有缺点吗？你是否知道其他替代品，以及为何使用它们？


27. 请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)

    相当重要

28. Promise

    怎么用？源码如何实现的？

    推荐文章：xieranmaya/blog#3

29. 使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？

30. javascript调试工具

31.对象遍历 和 数组遍历

32. 可变对象和不可变对象

33. 什么是事件循环 (event loop)

    非常重要，面试必问。

    深入原理，宏任务，微任务等等

34. let var const

35. 数组的方法
    indexOf
    concat
    slice
    splice

    filter
    evevy

36. web worker

37. 柯里化

38. 创建对象的三种方法

39. 深拷贝和浅拷贝

    可以实现手写深拷贝

    

40. 图片懒加载

    咋实现的？
    视图、 替换src

41. 网页各种高度

    这个好难记，我也没记住~

42. 实现页面加载进度条

43. 箭头函数ES5如何实现

    箭头函数和普通函数的区别
----- 继承定义时第一个外层函数的this
    
44. 一道 setTimeout/Promise 输出顺序问题的题
    console.log('one');
    setTimeout(function() {
      console.log('two');
    }, 0);
    Promise.resolve().then(function() {
      console.log('three');
    })
