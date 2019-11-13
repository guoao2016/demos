[HTML参考](https://blog.csdn.net/sinat_36521655/article/details/84141896)


1. HTML
    DOCTYPE（文档类型）的作用是什么？

    参考https://witcher42.github.io/2014/05/28/doctype/

2. 浏览器标准模式 (standards mode) 、几乎标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？
    产生的历史原因是啥？ 怪异模式有哪些怪异的行为？

    标准模式是基于w3c 标准解析渲染；怪异模式是基于各个浏览器自身的标准进行解析渲染

    怪异行为： 盒子模型
    标准  box-sizing: content-box
     盒子总宽度/高度 : margin + border + padding + width/height
     内容宽度/ 高度：  margin + border + padding + width/height

    怪异 box-sizing: border-box
     盒子总宽度/高度 : margin + width/height
     

    width/height = 内容宽度/高度 + padding + border + margin







3. 使用 data- 属性的好处是什么？

    可以去实践下data-*的使用啦

4. 如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？

    研究下HTML5的所有模块


5. cookies、sessionStorage 和 localStorage 的区别  [参考](https://segmentfault.com/a/1190000017155151)
    生命周期
    大小
    存储位置


6. 请解释 <script>、<script async> 和 <script defer> 的区别。  [参考](https://blog.csdn.net/sinat_36521655/article/details/80059594)
    <script src="example.js"></script>
    没有defer或async属性，浏览器会立即加载并执行相应的脚本。也就是说在渲染script标签之后的文档之前，不等待后续加载的文档元素，读到就开始加载和执行，此举会阻塞后续文档的加载；
    <!-- 延迟脚本 -->
    <script type="text/javascript" defer="defer" src="example1.js"></script>

    <!-- 异步脚本 -->
    <script type="text/javascript" async src="example1.js"></script> 

    defer 和 async 的共同点是都是可以并行加载JS文件，不会阻塞页面的加载，不同点是 defer的加载完成之后，JS会等待整个页面全部加载完成了再执行，而async是加载完成之后，会马上执行JS，所以假如对JS的执行有严格顺序的话，那么建议用 defer加载。

    eg.  
    1. 淘宝网 <script src="https://tce.alicdn.com/api/data.htm?callback=tce_175785&amp;ids=175785" async=""></script>

7. 为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前？你知道有哪些例外吗？
    <link>放置在<head></head>是因为浏览器要先渲染页面呈现给用户，在渲染时需要构建dom树(html标签内容)和render渲染树(css样式)，这样才能完整呈现，所以推荐放在头部，优先加载。而JS脚本文件比较大，且一般是后期JS引擎运行，渲染引擎会将控制权交给JS引擎而停止渲染，如果JS文件较大，会导致长时间白屏，影响用户体验，所以才会有JS<script>放在</body>之前。或者上一个问题中提到的优化加载的方式。

    渲染引擎
    js引擎


8. 什么是渐进式渲染 (progressive rendering)？

9. HTML 和 XHTML 有什么区别？
    XHTML比HTML更加严格


10. HMTL5新标签
  header nav section footer
  calender date time 
  video audio
  canvas
  localstorage sessionstorage 