<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 랜덤 매칭 중...</title>
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
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
.matching .timer #wait_time{
	margin-left: 15px;
}
.matching .timer #wait_time p{
	display: inline-block;
}
.matching .timer div{
	display: inline-block;
	margin-left: 10px;
}

</style>
<script type="text/javascript">
var timer;

var mySocket = window.opener.webSocket;
var room_idx = window.opener.matchRoomIdx;
var nickname = window.opener.nickname;

 	$(function(){
 		timer = setInterval(function(){
 	 		
 	 		var min = parseInt($('#min').text());
 	 	 	var sec = parseInt($('#sec').text());
 	 	 	
 	 	 	$('#sec').text(leadingZeros( sec+1, 2 ));
 	 	 	
 	 	 	if( sec > 58 ){
 	 	 		$('#min').text( leadingZeros( min+1, 2 ));
 	 	 		$('#sec').text( leadingZeros( 0, 2 ));
 	 	 	}
 	 	 	
 	 	 	if( min == 1){
 	 	 		
 	 	 		var json = {
 						'subject' : '@cancel',
 			      		'content' : room_idx+'#'+nickname,	
 			    };
 	 	 		
 	 	 		mySocket.send(JSON.stringify(json));
 	 	 		alert('게임 방을 찾는데 실패하였습니다.');
 	 	 		clearInterval(this);
 	 			self.close();
 	 	 	}
 	 		
 	 	}, 1000);
 		
 		
 		$('#close').click(function(){
 			
 			var json = {
					'subject' : '@cancel',
		      		'content' : room_idx+'#'+nickname,	
		    };
 			
        	mySocket.send(JSON.stringify(json));
        	clearInterval(timer);
 			self.close();
 		});
 	});
 
 
 	function leadingZeros(n, digits){
    	var zero = '';
    	n = n.toString();
    	if (n.length < digits) {
    	   for (var i = 0; i < digits - n.length; i++)
    	      zero += '0';
    	}
      return zero + n;
 	}
 	
 	function stopTimer(timer){
 		clearInterval(timer);
 	}
 	


</script>
</head>
<body>
	<div class="matching">
		<div class="title">
			<h4>상대방 검색 중</h4>
		</div>
		<div class="timer">
			<label>대기 시간 :</label>
			<div id="wait_time">
				<p id="min">00</p> : 
				<p id="sec">01</p>
			</div>
			<div>
				<img alt="" src="images/lolclose.png" style="vertical-align: middle; cursor: pointer;" id="close">
			</div>
		</div>
	</div>
</body>
</html>