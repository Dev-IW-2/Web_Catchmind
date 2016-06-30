<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.netmarble.catchmind.model.Bean" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 참여자정보</title>

<!-- jquery 1.10 -->
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>

<link rel="stylesheet" type="text/css" href="styles/roominfo.css">
<style type="text/css">


</style>
</head>
<body>
	<%
	
		List<Bean> userList = null;
		if(request.getAttribute("userList") != null){
			//System.out.println(request.getAttribute("userList"));
			userList = (ArrayList<Bean>)request.getAttribute("userList");
		}
	%>

	<div>
		<div class="title">
			<h4>참여자 정보</h4>
		</div>
		<div class="main">
			<div class="left">
				<%
				for (int k = 0; k < 8; k++){
					boolean flag = false;
					if(k == 4){
				%>		
			</div>
			<div class="right">			
				<% }
					if(userList.size() >= k+1){
						if(userList.get(k) != null ){
							flag = true;
						}
					}
				if( flag ){
				%>
				<div class="user">
					<table>
						<tr>
							<td rowspan="5" class="avatar">
								<img alt="" src="images/avatar/<%=userList.get(k).getAvatarLink() %>.gif">
							</td>
						</tr>
						<tr>
							<td class="nickname-label">닉네임</td>
							<td class="nickname"><%=userList.get(k).getNickname()%></td>
						</tr>
						<tr>
							<td class="ranking-label">랭 킹</td>
							<td class="ranking"><%=userList.get(k).getRank() %></td>
						</tr>
						<tr>
							<td class="point-label">포인트</td>
							<td class="point"><%=userList.get(k).getPoint() %></td>
						</tr>
						<tr>
							<td class="index-label">인덱스</td>
							<td class="index"><%=k+1 %></td>
						</tr>
					</table>
				</div>
				<%} else{ %>
				<div class="user">
					<table>
						<tr>
							<td rowspan="5" class="avatar">
								<img alt="" src="">
							</td>
						</tr>
						<tr>
							<td class="nickname-label">닉네임</td>
							<td class="nickname"></td>
						</tr>
						<tr>
							<td class="ranking-label">랭 킹</td>
							<td class="ranking"></td>
						</tr>
						<tr>
							<td class="point-label">포인트</td>
							<td class="point"></td>
						</tr>
						<tr>
							<td class="index-label">인덱스</td>
							<td class="index"></td>
						</tr>
					</table>
				</div>	
				<% }
				}%>
				</div>
				
		</div>
		<div class="footer">
			<!-- <a href="#" id="join"><img src="images/join.png" style="cursor: pointer;"></a> -->
			<a href="#" id="close"><img src="images/close.png" onclick="self.close();" style="cursor: pointer;"></a>
		</div>
	
	</div>
</body>
</html>