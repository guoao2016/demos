1. 清除浮动
overflow:hidden;


clear:both;


:after{
    content: ' '
    display:block;
    visiblity:;
    clear:both;


}
`
<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
`

2. [bfc](https://blog.csdn.net/sinat_36422236/article/details/88763187)
