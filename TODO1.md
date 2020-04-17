dev todo 1  dev-5.1
dev-5.1  bug
bug
     

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>debounce-throttle</title>
     <style>
        .wrap{
            height: 5000px;
            background-color: blueviolet;
        }
    </style>
</head>
<body>
    搜索 <input id="search">
    <div class="wrap">
    </div>
    <script>
        // function debounce(func, wait = 500) {
        //     let timer = 0;
        //     return (...arg) => {
        //         if(timer){
        //             clearTimeout(timer)
        //         }

        //         timer = setTimeout(() => {
        //             func.apply(this, arg)
        //             }, wait)
        //     }
        // }


        // function test(){
        //     console.log(111)
        // }

        // window.addEventListener('scroll', debounce(test))
    </script>
    <script>
        /**
         * 节流
         * 图片懒加载
        */
        const throttle = (func, wait = 500) => {
            //  无论你调用多少次，函数都是100毫秒执行一次
          let lastTime = 0;
          return (...args) => {
              let now = new Date().getTime();
              if(now - lastTime > wait){
                //  时间差
                  func.apply(this, args)
                  lastTime = new Date().getTime();
              }
          }
            

        }
        let i = 1;
        // window.addEventListener('scroll', 
        //     throttle(() => {
        //         console.log(i)
        //         i+=1
        //     })
        // )

    /**
     * 防抖
     * 输入搜索
     * 每次出入都发送请求，容易请求过多
    */
    const debounce = (func, wait = 300) => {
        let timer = 0;
        return (...args) => {
            if(timer){
                clearTimeout(timer)
                console.log("timer: "+ timer)
            }
            timer = setTimeout(()=> {
                func.apply(this, args)
            }, wait)
        }
    }
  
    let _search = document.getElementById('search');
    _search.addEventListener('input', 
        debounce(() => {
            console.log(i +" value: "+ _search.value)
            i+=1
        })
    )

    </script>
</body>
</html>
