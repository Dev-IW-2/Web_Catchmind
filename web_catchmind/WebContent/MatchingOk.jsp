<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 게임을 찾았습니다!</title>
<link rel="stylesheet" type="text/css" href="styles/progress.css">
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<script type="text/javascript" src="scripts/jquery-asPieProgress.js"></script>
<style type="text/css">
.matching{
	background-color: #06101b;
	color: #deeaf3;
	padding: 15px;
}
.matching .title{
	text-align: center;
}
.matching .timer{
	text-align: center;
}
.matching .timer span{
	margin-left: 15px;
}
.matching .timer div{
	display: inline-block;
	margin-left: 10px;
}
.matching .button-grp{
	text-align: center;
}
.matching .button-grp img{
	vertical-align: middle;
	cursor: pointer;
	margin: 10px 20px;
}
.loader{
	text-align: center;
	margin: 0 auto;
}
#progress{
	width: 80px;
	display: inline-block;
}
</style>
<script type="text/javascript">
$(function(){
	
	var nickname = window.opener.nickname;
	var mySocket = window.opener.webSocket;
	var room_idx = $('#room_idx').val();
	if(window.opener.matchingPop)
		window.opener.matchingPop.clearInterval(window.opener.matchingPop.timer);

        $('.progress').asPieProgress({
            'namespace': 'progress',
            speed: 100,
        });
	
		$('.progress').asPieProgress('start');
		
        $('#accept').click(function(){
        	
        	 var json = {
					'subject' : '@accept',
		      		'content' : room_idx+'#'+nickname,		
		    };
        	mySocket.send(JSON.stringify(json)); 
        	$(this).hide();
        	$('.wait-user').show();
        	
        });
        
        $('#reject').click(function(){
        
        	var json = {
					'subject' : '@reject',
		      		'content' : room_idx+'#'+nickname,	
		    };
        	mySocket.send(JSON.stringify(json));
        	
        });
    
});

</script>
</head>
<body>
	<div class="matching">
		<div class="title">
			<h4>게임을 찾았습니다!</h4>
		</div>
		<div class="loader">
			<div id="progress" role="progressbar" data-goal="100" class="progress">
			</div>
		</div>
		<div class="button-grp">
			<img alt="" src="images/accept.png" id="accept">
			<img alt="" src="images/reject.png" id="reject">
		</div>
		<div class="wait-user" style="display: none;">
			<p>다른 참가자들의 수락을 기다리고 있습니다...</p>
		</div>
	
	</div>
	<input type="hidden" id="room_idx" value="<%=request.getParameter("room_idx")%>">
</body>
</html>