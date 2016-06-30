<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.netmarble.catchmind.model.Dao" %>
<%@ page import="com.netmarble.catchmind.model.Bean" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Catchmind</title>
<!-- jquery 1.10 -->
<script type="text/javascript" src="scripts/jquery-1.10.2/jquery-1.10.2.js"></script>

<!-- modal -->
<link rel="stylesheet" type="text/css" href="styles/mymodal.css">

<!-- bootstrap -->
<link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css">
<script type="text/javascript" src="scripts/bootstrap.min.js"></script>

<!-- parsley -->
<link rel="stylesheet" type="text/css" href="styles/parsley/parsley.css">
<script type="text/javascript" src="scripts/parsley/parsley.js"></script>
<script type="text/javascript" src="scripts/parsley/i18n/ko.js"></script>

<!-- this -->
<script type="text/javascript" src="scripts/registration.js"></script>
<link rel="stylesheet" type="text/css" href="styles/index.css">

<!-- slider -->
<script type="text/javascript" src="scripts/transit.js"></script>
<script type="text/javascript" src="scripts/jquery.simpleslider.js"></script>
<link rel="stylesheet" type="text/css" href="styles/slider.css">

<style type="text/css">

</style>
<script type="text/javascript">
$(document).ready(function(){
    $(".slider").simpleSlider();
});
</script>
</head>
<body>
<%
	Dao dao = new Dao();
	List<Bean> rankList = dao.rankList();
%>

	<div class="body_wrap">
		<div style="text-align: center; width: 100%;">
			<img src="images/catchmind_main.png" />
		</div>
		<div style="margin-bottom: 15px;"></div>
		<div class="container">
		<div class="side_bar">
				<div class="starter">
					<!-- <a href="cocos2d-v2/cc_catchmind2"> 
						<img src="http://c3.img.netmarble.kr/web/cp/catchmind/v/img/common/swf_gamestart.jpg" alt="">
					</a> -->
					<a id="start_game" href="#"> 
						<img src="http://c3.img.netmarble.kr/web/cp/catchmind/v/img/common/swf_gamestart.jpg" alt="">
					</a>
				</div>
				<div class="divlogin">
					<% if( session.getAttribute("uidx") == null) {%>
					<fieldset id="BeforeLogin">
						<dl>
							<dt class="uid">
								<em>아이디</em>
							</dt>
							<dd class="uid">
								<input type="text" title="아이디" id="login_uid" name="" maxlength="12" />
							</dd>
							<dt class="upw">
								<em>비밀번호</em>
							</dt>
							<dd class="upw"> 
								<input type="password" title="비밀번호" id="login_upw" name="" maxlength="30"/>
							</dd>
						</dl>
						<button class="bt lgn" id="login"  title="로그인"></button>
						<div class="join">
							<ul>
								<li><a data-toggle="modal" data-target="#myModal" href="#">회원가입</a></li>
								<li><a>아이디찾기</a></li>
							</ul>
						</div>
					</fieldset>
					<%} else{%>
					<fieldset id="AfterLogin">
						<div class="avatar">
							<div class="img" style="width: 100%;">
								<img src="images/avatar/<%=session.getAttribute("avatarLink") %>.gif"
									id="myCharacter" width="100%" height="100%" alt="">
							</div>
						</div>
						<ul class="info1">
							<li class="f">
								<em id="nameText">캐릭터명</em>
								<strong><span id="myNickName"><%=session.getAttribute("nickname") %></span></strong>
							</li>
							<li>
								<em>캐릭터</em>
								<span id="myRank"><%=session.getAttribute("avatarName") %></span>
							</li>
							<li>
								<em>레벨</em>
								<strong id="myGrade"><%=session.getAttribute("rank") %></strong>
							</li>
						</ul>
						<div class="info2">
							<ul>
								<li class="f">경험치<strong id="myExperience"><%=session.getAttribute("point") %></strong></li>
							</ul>
						</div>
						<div class="logout">
							<ul>
								<li><a href="Logout.bo">로그아웃</a></li>
							</ul>
						</div>
						
					</fieldset>
					<%} %>

				</div>
			</div>
			<div class="slider-box">
				<div class='slider'>
					<div class='slide'>
						<div class='slidecontent'>
							<img src="http://c2.img.netmarble.kr/web/6N/2011/02/2139/개드립_제철소.jpg" alt="">
						</div>
					</div>
					<div class='slide'>
						<div class='slidecontent'>
							<img src="http://c2.img.netmarble.kr/web/6N/2011/02/2140/개드립_용의자.jpg" alt="">
						</div>
					</div>
					<div class='slide'>
						<div class='slidecontent'>
							<img src="http://c2.img.netmarble.kr/web/6N/2011/02/2140/개드립_우거지국.jpg" alt="">
						</div>
					</div>
					<div class='slide'>
						<div class='slidecontent'>
							<img src="http://c2.img.netmarble.kr/web/6N/2011/02/2140/개드립_해수면.jpg" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ranking">
			<!-- 랭킹	 -->
			<div class="title"></div>
			<div class="list">
				<table width="50%;">
					<colgroup>
						<col width="15%">
						<col width="*">
						<col width="30%;">
					</colgroup>
					<% 
					int i = 1;
					//System.out.println(rankList);
					for(Bean bean : rankList){ %> 
						<tr>
							<td class="order">
								<%if(i < 4){ %>
								<img alt="" src="http://c3.img.netmarble.kr/web/cp/catchmind/v/img/main/num<%=i %>.gif">
								<%}else { 
								out.print(i);								
								}%>
							</td>
							<td class="nickname"><%=bean.getNickname() %></td>
							<td class="point"><%=bean.getPoint() %></td>
						</tr>
					<% i ++; 
					} %>
					
				</table>
			</div>
		</div>
		<div class="footer">
			<div class="copyright">
				<img src="http://c2.img.netmarble.kr/web/netmarble/footer/img/ci/nmb_w.png" alt="nmb_w">
			</div>
		</div>
	</div>
	
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel" style="color:#9a9a9a;font-family:Mailpile-Normal;">회원가입</h4>
            </div>
            <div class="modal-body" style="text-align:left;">
                <form role="form" id="signup"  method="post">
                    <div class ="form-group">
                        <p class="text-muted">아이디</p>
                        <div class="right-inner-addon ">
                          <input size="35" id="u_id" name="" type="text" class="form-control"placeholder="사용할 아이디를 입력하세요. [ 8~12 ]" 
                          data-parsley-required="true" data-parsley-range="[8, 12]" data-parsley-trigger="change"/>
                        </div>
                    </div>
                    
                    <div class ="form-group">
                        <p class="text-muted">닉네임</p>
                        <div class="right-inner-addon ">
                          <input size="35" id="nickname" name="" type="text" class="form-control"placeholder="사용할 닉네임 입력하세요. [ 3~6 ]" 
                          data-parsley-required="true" data-parsley-range="[3, 6]" data-parsley-trigger="change"/>
                        </div>
                    </div>
  
                      <div class ="form-group">
                          <p class="text-muted">비밀번호</p>
                          <div class="right-inner-addon ">
                             <input size="35" id="upw" name="" type="password" class="form-control"placeholder="비밀번호를 입력하세요. [ 8~12 ]" 
                             data-parsley-required="true" data-parsley-range="[8, 12]" data-parsley-trigger="change"/>
                          </div>
                      </div>

                      <div class ="form-group">
                          <p class="text-muted">비밀번호 확인</p>
                          <div class="right-inner-addon ">
                              <input size="35" id="upw2" name="" type="password" class="form-control"placeholder="" data-equalto="#upw"
                              data-parsley-required="true" data-parsley-range="[8, 12]" data-parsley-trigger="change"/>
                            </div>
                      </div>
                  </form>
                   <div style="text-align: right;">
                      	<button class="btn btn-default create" id="create">계정 생성</button>
                      </div>
                </div><!--end of modal body-->
            </div><!--end of modal content-->
        </div><!--end of model dialog-->
    </div><!--end of moal-->
	<input type="hidden" value="<%=session.getAttribute("uidx")%>" id="uidx"/>
</body>
</html>