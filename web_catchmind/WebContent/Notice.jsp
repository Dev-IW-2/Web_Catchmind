<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 알림</title>
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>

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
</head>
<body>
	<%
	String message = null;
	
	int room_idx = 0;
	String fromUser = null;
	int alert = 0;
	
	if(request.getParameter("room_idx") != null)
		room_idx = Integer.parseInt(request.getParameter("room_idx"));
	if(request.getParameter("fromUser") != null)
		fromUser = request.getParameter("fromUser");
		
	if(request.getParameter("alert") != null){
		alert = Integer.parseInt(request.getParameter("alert"));
		switch(alert){
		
		case 1:
			message = "최대 인원이 초과되었습니다.";
			break;
			
		case 2:
			message = "비밀번호가 틀렸습니다.";
			break;
			
		case 3:
			message = fromUser+"님이 "+room_idx+"번 방에서 초대를 하였습니다. 초대에 응하시겠습니까?";
			break;
			
		case 4:
			message = fromUser+"님이 초대를 거부하셨습니다.";
			break;
			
		default:
			break;
		
		}
	}
	
	%>
	<div>
		<div class="title">
			<h4>알&nbsp;&nbsp;&nbsp;&nbsp;림</h4>
		</div>
		<div class="main">
			<textarea rows="6" cols="30" readonly="readonly"><%=message %>
			</textarea>
		</div>
		<%if( alert != 3) {%>
		<div class="bottom">
			<img src="images/check.bmp" onclick="self.close();" style="cursor: pointer;"/>
		</div>
		<%} else{ %>
		<div class="bottom">
			<img src="images/invite_yes.bmp" onclick="" style="cursor: pointer;" id="yes"/>
			<img src="images/invite_no.bmp" onclick="" style="cursor: pointer;" id="no"/>
		</div>
		<%} %>
	
	</div>
	<input type="hidden" id="room_idx" value="<%=room_idx%>">
	<input type="hidden" id="from_user" value="<%=request.getParameter("fromUser")%>">
<script type="text/javascript">
$(function(){
	
	
	var room_idx = $('#room_idx').val();
	var fromUser = $('#from_user').val();
	
	$('#yes').click(function(){
		window.opener.acceptInvite(room_idx);
		self.close();
	});
	$('#no').click(function(){
		window.opener.rejectInvite(fromUser);
		self.close();
	});
});
</script>

</body>
</html>