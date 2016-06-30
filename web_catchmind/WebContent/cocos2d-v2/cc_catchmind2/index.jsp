<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ page import = "java.util.*" %> 
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>캐치마인드</title>
    <link rel="icon" type="image/GIF" href="res/favicon.ico"/>
    <meta name="viewport" content="user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    </style>
    <script type="text/javascript" src="../../scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
    
	<script src="cocos2d.js"></script>
    <script>
		function doNotReload(){
		    if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) 
		        || (event.keyCode == 116) )
		    {
		      event.keyCode = 0;
		      event.cancelBubble = true;
		      event.returnValue = false;
				 alert("새로고침 방지");
		    } 
		}
		document.onkeydown = doNotReload;
	</script> 
	
</head>
<body style="padding:0; margin: 0; background: #000;">
<script type="text/javascript">
var webSocket;
</script>

<canvas id="gameCanvas" width="1280px" height="800px">
</canvas>


<input type="hidden" value="<%=session.getAttribute("uidx")%>" id="uidx"/>
<input type="hidden" value="<%=session.getAttribute("nickname")%>" id="nickname"/>
<input type="hidden" value="<%=session.getAttribute("room_idx")%>" id="room_idx"/>
<!-- <script type="text/javascript" src="websocket.js"></script> -->
<script type="text/javascript" src="require.js"></script>
</body>
</html>