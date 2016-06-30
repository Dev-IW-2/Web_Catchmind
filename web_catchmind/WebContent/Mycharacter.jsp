<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.netmarble.catchmind.model.Bean" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 내 캐릭터 방</title>
<!-- jquery 1.10 -->
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<style type="text/css">
.avatar-list{
	border-radius: 7px;
	border: 3px solid #ce7308;
	margin: 10px;
	padding: 10px;
	width: 82%;
	background-color: #5a9cad;
}
.avatar-list .content{
	background-color: #ffefde;
	padding: 10px;
}
.avatar-list .one{
	display: inline-block;
	text-align: center;
	margin-bottom: 10px;
	cursor: pointer;
}
.avatar-list .one .avatar{
	border: 1px solid #7b7b7b;
	opacity: 0.6;
}
.avatar-list .one .selected{
	border: 3px solid red;
	opacity: 1;
}
.avatar-list .one label{
	border: 3px solid #ffd663;
	background-color: #ffffff;
	padding: 2px;
	color: #00319c;
	font-weight: 900;
	font-size: 13px;
	width: 90%;
	display: inline-block;
}
.title{
	text-align: center;
	color: #84a5de;
	font-size: 24px;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.mykoongya{
	margin-top: 20px;
	background-color: #efd66b;
	width: 60%;
	border-radius: 5px;
}
.mykoongya fieldset legend {
	border: 1px solid #8c5208;
	border-radius: 5px;
	padding: 5px 15px;
	background-color: #ff9c42;
	color: white;
	position: relative;
	top: -15px;
	text-shadow: -1px 0 #8c5208, 0 1px #8c5208, 1px 0 #8c5208, 0 -1px #8c5208;
}
.mykoongya .avatar{
	border: 1px solid #7b7b7b;
	display: inline-block;
	float: left;
}
.mykoongya .info{
	display: inline-block;
	width: 60%;
	margin-left: 5%;
	margin-bottom: 10px;
	overflow: auto;
	
}
.mykoongya .info label{
	font-weight: 900;
}
.mykoongya .info input{
	text-align: center;
	border-radius: 6px;
	width: 70%;
	margin-left: 10px;
	font-weight: 900;
	
}
</style>
<script type="text/javascript">
$(function(){
	
	$('.avatar-list .one').dblclick(function(){
		
		var id = $(this).attr('id');
		var nickname = $('#nickname').val();
		
		$(this).parent().find('.selected').addClass('avatar');
		$(this).parent().find('.selected').removeClass('selected');
		
		$(this).children('div').addClass('selected');
		$(this).children('div').removeClass('avatar');
		
		var url = 'ChangeChar.bo';
		var data = {
				'avatar' : id,
				'nickname' : nickname,
		};
		
		$.ajax({
			
			type : 'POST',
	        url : url,
	        data: data,
	        dataType:'json',
	        success : function (data) {
	        	if( data ){
	        		if( data == 1 ){
	        			window.opener.location.reload();
	        			self.location.reload();
	        		}
	        	}
	        }
	        ,beforeSend:function(){
	        }
	        ,complete:function(){
	        	return false;
	        }
	    });
	});
	
});

</script>
</head>
<body style="background-color: #addef7;">
	<%
		List<Bean> avatarList = null;
		if(request.getAttribute("avatarList") != null){
			avatarList = (ArrayList<Bean>) request.getAttribute("avatarList");
		}
	%>
	
	<div class="title">
		<h4>캐릭터 방</h4>
	</div>
	<div class="avatar-list">
		<div class="content">
			<div class="row">
				<% for( Bean bean : avatarList) { %>
				<div class="one" id="<%=bean.getAvatar()%>">
				<% if(session.getAttribute("avatarName") != null){
						if(session.getAttribute("avatarName").equals(bean.getAvatarName())){ %>
					<div class="selected">	
					<% }else{ %>
					<div class="avatar">		
					<%		
						}
					}
					%>
						<img alt="" src="images/avatar/<%=bean.getAvatarLink()%>.gif">
					</div>
					<label><%=bean.getAvatarName() %></label>
				</div>
				<%} %>
			</div>
		</div>
		<div class="mykoongya">
			<fieldset style="border: none;">
				<legend>나의 쿵야</legend>
				<div class="avatar">
					<img alt="" src="images/avatar/<%=session.getAttribute("avatarLink") %>.gif">
				</div>
				<div class="info">
					<label style="color: #7b5218">이 름</label> 
					<input type="text" value="<%=session.getAttribute("avatarName") %>" style="color: #00319c;" readonly="readonly"> 
				</div>
				<div class="info">
					<label style="color: #c67318">랭 크</label> 
					<input type="text" value="<%=session.getAttribute("rank") %>" readonly="readonly">
				</div>
			</fieldset>
			
		</div>
	</div>
	<input type="hidden" id="nickname" value="<%=session.getAttribute("nickname")%>"/>
</body>
</html>