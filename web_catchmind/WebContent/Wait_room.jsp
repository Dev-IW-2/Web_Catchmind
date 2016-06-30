<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 대기실</title>
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<link rel="stylesheet" type="text/css" href="styles/wait_room.css">
<link rel="stylesheet" type="text/css" href="styles/mymodal.css">
<link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css">
<script type="text/javascript" src="scripts/bootstrap.min.js"></script>

<script type="text/javascript" src="scripts/wait_room.js"></script>
</head>
<body>
	<div>
		<div class="myroom">
			<div class="button-group">
				<a href="#" id="info"><img src="images/lobby/Lobby_1_1.bmp"/></a>
				<a href="#" id="go_room"><img src="images/lobby/Lobby_2_1.bmp"/></a>
				<a href="#" id="create_room"><img src="images/lobby/Lobby_3_1.bmp"/></a>
				<a href="#" id="my_character"><img src="images/mycharacter.png"/></a>
			</div>
			<div class="matching">
				<input type="button" value="자동매칭" id="matching">
				<input type="button" value="메인으로" id="go_main">
			</div>
			<div class="room-info">
				<div class="room-label">
					<button style="width: 10%;">No</button>
					<button style="width: 37%;">제목</button>
					<button style="width: 20%;">방장</button>
					<button style="width: 10%;">인원</button>
					<button style="width: 10%;">비고</button>
					<button style="width: 9%;">상태</button>
				</div>
				<div class="room-each">
					<ul>
					
					</ul>
					
				</div>
			</div>
			<div class="chat-content">
				<textarea rows="7" cols="5" id="chatting" readonly="readonly" style="overflow-y: scroll;">## [<%=session.getAttribute("uid") %>]님의 접속을 환영합니다. ##</textarea>
							
			</div>
			<div class="chat-input">
				<input type="text" id="input-chatting"/>
			</div>
			<div class="user-info">
				<div class="user-label">
					<button style="width: 5%;">&nbsp;&nbsp;</button>
					<button style="width: 50%;">닉네임</button>
					<button style="width: 20%;">레벨</button>
					<button style="width: 20%;">위치</button>
				</div>
				<div class="user-each">
					<ul>
						<li>	<!-- idx, nickname, level, positon -->
							
						</li>
					</ul>
				
				</div>
			</div>
			<!-- <div class="find-input">
				<input type="text"/>
			</div>
			<div class="reject-invite">
				<input type="checkbox">
			</div> -->
			<div class="my-avatar">
				<img src="images/avatar/${bean.avatarLink }.gif"/>
			</div>
			<div class="my-info">
				<span class="myid">${bean.nickname }</span>
				<%-- <span class="myrank"><%=session.getAttribute("rank")%></span> --%>
				<span class="myrank"><img alt="" src="images/level/level-${bean.rank }.png"/></span>
				<span class="myexp">${bean.point }</span>
				<span class="myavatar">${bean.avatarName }</span>
			</div>
		</div>
		<input type="hidden" value="${bean.uidx }" id="uidx"/>
		<input type="hidden" value="${bean.nickname }" id="nickname"/>
	</div>

</body>

<script type="text/javascript">


</script>
</html>