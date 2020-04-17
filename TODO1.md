dev todo 1  dev-5.1
dev-5.1  bug
bug

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
<<<<<<< HEAD
    <title>debounce-throttle</title>
     <style>
        .wrap{
            height: 5000px;
            background-color: blueviolet;
=======
    <title>冒泡-捕获</title>
    <style>
        #outer {
            text-align: center;
            width: 400px;
            height: 400px;
            background-color: #ccc;
            margin: 0 auto;
        }

        #middle {
            width: 250px;
            height: 250px;
            background-color: #f00;
            margin: 0 auto;
        }

        #inner {
            width: 100px;
            height: 100px;
            background-color: #0f0;
            margin: 0 auto;
>>>>>>> dev-5.1
        }
    </style>
</head>

<body>
    <div id='outer'>
        <span>outer</span>
        <div id='middle'>
            <span>middle</span>
            <div id='inner'>
                <span>inner</span>
            </div>
        </div>
    </div>
    <script>
        function $(element){
            return document.getElementById(element);
        }

        function on(element,event_name,handler,use_capture){
            if(addEventListener){
                $(element).addEventListener(event_name,handler,use_capture);
                }
            else{
                $(element).attachEvent('on'+event_name,handler);
            }
        }

        on("outer","click",o_click_c,true);
        on("middle","click",m_click_c,true);
        on("inner","click",i_click_c,true);

        on("outer","click",o_click_b,false);
        on("middle","click",m_click_b,false);
        on("inner","click",i_click_b,false);



        function o_click_c(){
            console.log("outer_捕获");
        }

        function m_click_c(){
            console.log("middle_捕获");
        }

        function i_click_c(){
            console.log("inner_捕获");
        }

        function o_click_b(){
            console.log("outer_冒泡");
        }

        function m_click_b(){
            console.log("middle_冒泡");
        }

        function i_click_b(){
            console.log("inner_冒泡");
        }
    </script>
</body>

</html>







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