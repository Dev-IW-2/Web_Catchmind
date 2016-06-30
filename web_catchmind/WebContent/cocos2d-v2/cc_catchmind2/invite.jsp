<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>대기실 보기 / 초대</title>
<script type="text/javascript" src="../../scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<script type="text/javascript" src="require.js"></script>
<link rel="stylesheet" type="text/css" href="invite.css">

</head>
<body>
	<div>
		<div class="title">
			<h4>대기실 보기/초대</h4>
		</div>
		<div class="profile">
			<img alt="" src="res/game_profile.png" id="profile" style="cursor: pointer;">
			<img alt="" src="res/game_invite.png" id="invite" style="cursor: pointer;">
		</div>
		<div class="main">
			<div class="list">
				<fieldset>
					<legend>대기자</legend>
					<table class="wait-list">
						<col width="40%">
						<col width="20%">
						<col width="40%;">
					<tr>
						<th class="nickname">닉네임</th>
						<th class="level">레벨</th>
						<th class="position">위치</th>
					</tr>
					
				</table>
				</fieldset>
				
			</div>
		</div>
		
	</div>
<script type="text/javascript">

var throwParent = ['/go room','/room','/paint_start','/paint_end','/paint_eraser',
                   '/paint_color','/paint_clean','/turninfo','/timer_start','/examiner',
                   '/answer','/wait','/level_up','/take_part',
                   ];
var user;
var mySocket = window.opener.webSocket;
var nickname = window.opener.nickname;
var room_idx = window.opener.room_idx;

 
function containsArr( subject ){
	
	for(var i = 0; i < throwParent.length; i++){
		if(subject.indexOf(throwParent[i]) > -1)
			return true;
	}
	return false;
}

$(document).on('click','.wait-list tr',function(){
	$(this).parent().children().css('backgroundColor','');
	$(this).css('backgroundColor','#58B0D8');
	user = $(this).attr('id');
});

$(document).on('click','#invite',function(){
	if(user){
		var json = {
				'subject' : '/invite',
				'content' : user + '#' + nickname + '#' + room_idx,
		};
		mySocket.send(JSON.stringify(json));
		
	}
	else{
		return false;			
	}
});


</script>

</body>
</html>