<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>
<script type="text/javascript" src="scripts/passwordchk.js"></script>
<style type="text/css">

.content{
	padding: 20px;
}

.title{
	text-align: center;
}
.main{
	text-align: center;
}
.bottom{
	margin-top:20px;
	text-align: center;
}
</style>

</head>
<body>
	<div class="content">
		<div class="title">
			<p>비공개 방입니다</p>
			<p>비밀번호를 입력해주세요</p>
		</div>
		<div class="main">
			<input type="text" id="password"/>
		</div>
		<div class="bottom">
			<input type="button" value="확인" id="chk">
			<input type="button" value="취소" onclick="self.close();">
		</div>
	</div>
<input type="hidden" value="<%=session.getAttribute("nickname")%>" id="nickname"/>
</body>
</html>