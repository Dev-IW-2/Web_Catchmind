<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 개인 프로필 보기</title>
<script type="text/javascript" src="../../scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<link rel="stylesheet" type="text/css" href="profile.css">
<script type="text/javascript">

$(function(){
	var mySocket = window.opener.webSocket;
	var nickname = $('#nickname').val();
	
	$('#banish').click(function(){
			
		var chk = confirm('해당 사용자를 정말 강퇴하시겠습니까?');
		if( chk ){
			
			var json = {
		      		"subject" : '/banish',
		      		"content" : nickname
		    };
			mySocket.send(JSON.stringify(json));
			
			window.opener.profilePop.close();
		}
	});
	
});

</script>
</head>
<body>
	<div class="user">
		<div class="title">
			<h4>개인 프로필 보기</h4>
		</div>
		<div class="main">
			<div class="nickname">
				<label>닉네임</label>
				<input type="text" value="<%=request.getParameter("nickname") %>" readonly="readonly" id="nickname"/>
			</div>
			<div class="profile">
				<img alt="" src="res/koongya/Koongya_2490.bmp">
				<div class="info">
					<input type="text" readonly="readonly" id="uid" value="<%=request.getParameter("uid") %>"/>
					<input type="text" readonly="readonly" id="rank" value="<%=request.getParameter("rank") %>"/>
					<input type="text" readonly="readonly" id="point" value="<%=request.getParameter("point") %>"/>
				</div>
			</div>
		</div>
		<% if(request.getParameter("leader") != null){ %>
		<div class="footer">
			<img alt="" src="res/banish.png" id="banish">
		</div>
		<%} %>
	</div>

</body>
</html>