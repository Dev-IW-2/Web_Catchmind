<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 알림</title>
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<script type="text/javascript" src="scripts/reconnect.js"></script>
<style type="text/css">

.main textarea{
	width: 100%;
	border: 2px solid #6b4218;
	background-color: #ffd66b;
	border-radius: 7px;
	padding: 10px; 
    box-sizing: border-box;
}
.title{
	text-align: center;
}
.title h4{
	display:inline-block;
	background-color: #f04038;
	padding: 5px 70px;
	border-radius: 10px;
	color: #ffffff;
	/* margin-top: 0; */
}
.bottom{
	margin-top:20px;
	text-align: center;
}
</style>
<script type="text/javascript">

</script>
</head>
<body>
	<%
		String message = null;
		if( request.getParameter("room_idx") != null )
			message = "아직 "+Integer.parseInt(request.getParameter("room_idx"))+"번 방의 게임이 진행중이며 입장가능합니다. \r\n 다시 참가하시겠습니까?";
	%>

	<div>
		<div class="title">
			<h4>알&nbsp;&nbsp;&nbsp;&nbsp;림</h4>
		</div>
		<div class="main">
			<textarea rows="6" cols="30" readonly="readonly"><%=message %>
			</textarea>
		</div>
		<div class="bottom">
			<img src="images/invite_yes.bmp" onclick="" style="cursor: pointer;" id="yes"/>
			<img src="images/invite_no.bmp" onclick="" style="cursor: pointer;" id="no"/>
		</div>
	
	</div>
	<input type="hidden" value="<%=request.getParameter("room_idx")%>" id="room_idx">
	<input type="hidden" value="<%=session.getAttribute("nickname")%>" id="nickname">
</body>
</html>