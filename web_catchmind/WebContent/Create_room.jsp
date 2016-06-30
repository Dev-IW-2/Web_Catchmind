<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>캐치마인드 - 방만들기</title>
<!-- jquery 1.10 -->
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<!-- bootstrap -->
<link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css">

<script type="text/javascript" src="scripts/create_room.js"></script>
<style type="text/css">
.main{
	background-color: #ffd66b;
	border-radius: 7px;
	padding: 10px;
	border: 2px solid #6b4218;
	margin: 10px;
}
.title{
	text-align: center;
}
.title h4{
	display:inline-block;
	background-color: #f79c39;
	padding: 5px 70px;
	border-radius: 10px;
	color: #ffffff;
	/* margin-top: 0; */
}
.main .one{
	padding: 3px;
}
.main .main-label{
	color: #6b4218;
	font-weight: 900;
	width: 20%;
}
.footer{
	text-align: center;
}

</style>
</head>
<body>
	<div>
		<div class="title">
			<h4>방만들기</h4>
		</div>
		<div class="main">
			<div class="one">
				<label class="main-label" for="title">방제목</label>
				<input type="text" id="title" style="width: 70%;"/>
			</div>
			<div class="one">
				<label class="main-label" for="is_private">공개여부</label>
				<select id="is_private" style="width: 30%;">
					<option value="0">공개</option>	
					<option value="1">비공개</option>				
				</select>
			</div>
			<div class="one">
				<label class="main-label" for="password">비밀번호</label>
				<input type="text" id="password" style="width: 30%;" readonly="readonly">
			</div>
			<div class="one">
				<label class="main-label" for="limit">게임인원</label>
				<select id="limit" style="width: 30%;">
					<option value="8">8</option>
					<option value="7">7</option>
					<option value="6">6</option>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<!-- <option value="2">2</option> -->
				</select>
			</div>
			<div class="one">
				<label class="main-label" for="turn_limit">턴 수 설정</label>
				<select id="turn_limit" style="width: 30%;">
					
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>
		</div>
		<div class="footer">
			<a href="#" id="create"><img src="images/create_room.png"></a>
			<a href="#" id="close"><img src="images/cancel.png"></a>
		</div>
	
	</div>

</body>
</html>