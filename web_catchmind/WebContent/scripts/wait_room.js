/**
 * 
 */
/*var reload = true; 
if( reload ){
	window.location.reload(true);
	reload = false;
}*/

var webSocket; 
var roomSelected;
var userSelected;

var uidx;
var nickname;

var matchingPop;
var matchedPop;
var matchRoomIdx;
$(document).ready(function(){
	
	uidx = $('#uidx').val();
	nickname = $('#nickname').val();
	
	var path = location.pathname.split("/");
	var url = location.host;
	if( path.length > 1)
		url += '/'+path[1];
		
	if(nickname && nickname != null){
		
		webSocket = new WebSocket("ws://"+url+"/websocket/"+nickname+"/0");

	    webSocket.onerror = function(event) {
	    	onError(event);
	    };

	    webSocket.onopen = function(event) {
	    	onOpen(event);
	    };

	    webSocket.onmessage = function(event) {
	    	onMessage(event);
	    };
	    
	    webSocket.onclose = function(event) {
	    	//alert('zzz');
	    	onClose(event);
	    };
	}  
	    function onMessage(event) {
	        var json = JSON.parse(event.data);
	        //console.log(json);
	        
	        if(json.waitroom){
	        	var waitroom = JSON.parse(json.waitroom);
	        	
	        	$.map(waitroom, function( value, key ){
	        		
	        		var find_id = '#'+value.nickname;
	        		
	        		if( $('.user-each ul').find(find_id).find('.position').text() != '대기실' ){
	        			$('.user-each ul').find(find_id).remove();
	        		}
	        		
	        		if(  $('.user-each ul').find(find_id).length <= 0 ){
	        			
	        			var space = '<span class="idx"></span>';
		        		var nickname = '<span class="nickname">'+value.nickname+'</span>';
		        		var rank = '<span class="level">'+value.rank+'</span>';
		        		var position = '<span class="position">대기실</span>';
		        		
		        		var one_user = $('<li id="'+value.nickname+'"></li>');
		        		one_user.append(space);
		        		one_user.append(nickname);
		        		one_user.append(rank);
		        		one_user.append(position);
		        		
		        		$('.user-each ul').append(one_user);
	        		}
	        		
	        	});
	        }
	        // 게임 방정보가 바뀌었을 때
	        if( json.gameroom ){
	        	
	        	var gameroom = JSON.parse(json.gameroom);
	        	
	        	if(gameroom.match == false){
	        		
	        		var find_id = '#'+gameroom.idx;
		        	if($('.room-each ul').find(find_id).length > 0 ){
		        		$('.room-each ul').find(find_id).remove();
		        	}
		        	
		        	var idx = '<span class="no">'+gameroom.idx+'</span>';
		        	var title = '<span class="title">' +gameroom.title + '</span>';
		        	var leaderName = '<span class="leader">' +gameroom.leaderName+'</span>';
		        	var limit = '<span class="limit">'+lengthNotNull(gameroom.userList)+"/"+gameroom.limit+'</span>';
		        	var private = '<span class="private">공개</span>';
		        	
		        	if(gameroom.private == true){
		        		private = '<span class="private">비공개</span>';
		        	}
		        	var start = '<span class="start">대기</span>';
		        	if(gameroom.start)
		        		start = '<span class="start">진행</span>';
		        	
		        	var one_room = $('<li id="'+gameroom.idx+'"></li>');
		        	one_room.append(idx);
		        	one_room.append(title);
		        	one_room.append(leaderName);
		        	one_room.append(limit);
		        	one_room.append(private);
		        	one_room.append(start);
		        	$('.room-each ul').append(one_room);
	        	
	        	}
		        	if(gameroom.userList.length > 0){
		        		
		        		$(gameroom.userList).each(function(i, j){
		        			
		        			if(j != null){
		        				var find_id = '#'+j.nickname;
			        			if(  $('.user-each ul').find(find_id).length <= 0 ){
				        		
				        			var space = '<span class="idx"></span>';
					        		var nickname = '<span class="nickname">'+j.nickname+'</span>';
					        		var rank = '<span class="level">'+j.rank+'</span>';
					        		var position = '<span class="position">'+idx+'번방</span>';
					        		
					        		var one_user = $('<li id="'+j.nickname+'"></li>');
					        		one_user.append(space);
					        		one_user.append(nickname);
					        		one_user.append(rank);
					        		one_user.append(position);
					        		$('.user-each ul').append(one_user);
			        			}
		        			}
			        	});
		        	}
		        	
		        	if(json.subject){
		        		if(json.subject.indexOf('/all') < -1){
			        		$('.room-each ul').empty();
			        	}
		        	}
	        	
	        }
	        // 신규 접속 시
	        if( json.room ){
	        	var room = JSON.parse(json.room);
		        if ( Object.keys(room).length > 0 ){
		        	$.map(room, function( value, key ){
			        	
		        		if(value.match == false){
		        			
		        			var find_id = '#'+value.idx;
				        	// 방 정보
				        	if($('.room-each ul').find(find_id).length > 0 ){
				        		$('.room-each ul').find(find_id).remove();
				        	}
				        	//console.log(value);
				        	//console.log(key);
				        	var idx = '<span class="no">'+value.idx+'</span>';
				        	var title = '<span class="title">' +value.title + '</span>';
				        	var leaderName = '<span class="leader">' +value.leaderName+'</span>';
				        	var limit = '<span class="limit">'+lengthNotNull(value.userList)+"/"+value.limit+'</span>';
				        	var private = '<span class="private">공개</span>';
				        	
				        	if(value.private == true){
				        		private = '<span class="private">비공개</span>';
				        	}
				        	var start = '<span class="start">대기</span>';
				        	if(value.start)
				        		start = '<span class="start">진행</span>';
				        	
				        	var one_room = $('<li id="'+value.idx+'"></li>');
				        	one_room.append(idx);
				        	one_room.append(title);
				        	one_room.append(leaderName);
				        	one_room.append(limit);
				        	one_room.append(private);
				        	one_room.append(start);
				        	//$('#roomlist').append('<option value="'+idx+'"><p>ddd</p>'+inner+'</option>');
				        	$('.room-each ul').append(one_room);
				        	
		        		}
				        	if(value.userList.length > 0){
				        		
				        		$(value.userList).each(function(i, j){
				        			
				        			if(j != null){
				        				var find_id = '#'+j.nickname;
					        			if(  $('.user-each ul').find(find_id).length <= 0 ){
						        		
						        			var space = '<span class="idx"></span>';
							        		var nickname = '<span class="nickname">'+j.nickname+'</span>';
							        		var rank = '<span class="level">'+j.rank+'</span>';
							        		var position = '<span class="position">'+key+'번방</span>';
							        		
							        		var one_user = $('<li id="'+j.nickname+'"></li>');
							        		one_user.append(space);
							        		one_user.append(nickname);
							        		one_user.append(rank);
							        		one_user.append(position);
							        		$('.user-each ul').append(one_user);
					        			}
				        			}
					        	});
				        	}
			        	
			        });
		        	
		        	if(json.subject){
		        		if(json.subject.indexOf('/all') < -1){
			        		$('.room-each ul').empty();
			        	}
		        	}
		        }
	        }
	        
	        if(json.subject){
	        	
	        	if( json.subject.indexOf('/all') > -1){
	        		$('#chatting').append('\n'+json.content);
	        		 $('#chatting').scrollTop($('#chatting')[0].scrollHeight);
	        	}
	        	else if( json.subject.indexOf('/go room') > -1){
	        		var find_id = '#'+json.from;
	        		$('.user-each ul').find(find_id).find('.position').html(json.content+'번방');
	        	}
	        	
	        	else if( json.subject.indexOf('/remove') > -1){
	        		var find_id = '#'+json.content;
	        		$('.room-each ul').find(find_id).remove();
	        		
	        		/*if($('.user-each ul').find(find_id+'번방').length > 0)
						$('.user-each ul').find(find_id+'번방').remove();*/
	        		
	        	}
	        	else if( json.subject.indexOf('/wait_out') > -1){
	        		
	        		var find_id = '#'+json.content;
	        		$('.user-each ul').find(find_id).remove();
	        	}
	        	else if( json.subject.indexOf('/invite') > -1){
	        		
	        		var content = json.content.split('#');
	        		
	        		var fromUser = content[1];
	        		var room_idx = parseInt(content[2]);
	        		
	        		var service = "Notice.bo?alert=3&fromUser="+fromUser+"&room_idx="+room_idx;
      	    	  	var title = "캐치마인드 - 알림";
      	    	  
      	    	  	var windowW = 400;
      	    	  	var windowH = 290;
      	    	  	
      	    	  	alertPopUp(service, title, windowW, windowH);
      	    	  	
	        	}
	        	else if( json.subject.indexOf('/leader_out') > -1){
	        		
	        		var content = json.content.split('#');
	        		
	        		var room_idx = parseInt(content[0]);
	        		var newLeader = content[1];
	        		
	        		var find_id = '#' + room_idx;
	        		
		        	if($('.room-each ul').find(find_id).length > 0 ){
		        		$(this).find('.leader').text(newLeader);
		        	}
	        		
	        	}
	        	else if (json.subject.indexOf('/matching') > -1) {
	        		console.log('matching');
	        		matchRoomIdx = parseInt(json.content);
	        	}
  	        	else if (json.subject.indexOf('/matched') > -1) {

  	        		console.log(matchingPop);
  	        		if( matchingPop ){
  	        			matchingPop.clearInterval(matchingPop.timer);
  	        		}
  	        		
  	        		matchRoomIdx = parseInt(json.content);
  	        		var service = "MatchingOk.bo?room_idx="+matchRoomIdx;
  		    	  	var title = "캐치마인드 - 방을 찾았습니다.";
  		    	  
  		    	  	var windowW = 400;
  		    	  	var windowH = 250;
  		    	  
  		    	  	matchedPop = alertPopUp(service, title, windowW, windowH);
      	    	  	return false;
					
  	        	}
	        	
  	        	else if (json.subject.indexOf('@reject') > -1) {
  	        		alert('게임 요청이 거부되었습니다.');
  	        		if( matchingPop )
  	        			matchingPop.close();
  	        		
  	        		if( matchedPop )
  	        			matchedPop.close();
  	        			
  	        	}
  	        	else if(json.subject.indexOf('@go_autoroom') > -1){
  	        		
  	        		var where = parseInt(json.content);
					var url = 'Go_room.bo';
					var data = {
						'where' : where,
						'auto' : true
					};
					
					$.ajax({
						type : 'POST',
						url : url,
						data : data,
						dataType : 'json',
						success : function(data) {
						
							if (data) {
								switch (data) {
									case 1:
									// goto room!!
									if( matchingPop )
					  	        		matchingPop.close();
					  	        	if( matchedPop )
					  	        		matchedPop.close();
									
					  	        	document.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
										break;
									default:
										break;
									}
								}
							},
							beforeSend : function() {
							},
							complete : function() {
								return false;
							}
						});
  	        		}
	        	
  	        	else if(json.subject.indexOf('/reconnect') > -1){
  	        		
  	        		var room_idx = parseInt(json.content);
  	        		
  	        		var service = "Reconnect.bo?room_idx="+room_idx;
      	    	  	var title = "캐치마인드 - 알림";
      	    	  
      	    	  	var windowW = 400;
      	    	  	var windowH = 290;
      	    	  	
      	    	  	alertPopUp(service, title, windowW, windowH);
  	        		
  	        		}
	        	
  	        	else if(json.subject.indexOf('@disconnected') > -1){
  	        		
  	        		var content = json.content.split('#');
  	        		var find_nickname = content[0];
  	        		var room_idx = parseInt(content[1]);
  	        		console.log(find_nickname);
  	        		if($('.user-each ul').find('#'+find_nickname).length > 0)
  	        			$('.user-each ul').find('#'+find_nickname).remove();
  	        	
  	        		
  	        		if($('.room-each ul').find('#'+room_idx).length > 0){
  	        			var room = $('.room-each ul').find('#'+room_idx);
  	        			var limit = $(room).find('.limit').text().split('/');
  	        			console.log(limit);
  	        			$(room).find('.limit').text(parseInt(limit[0])-1 +'/'+ parseInt(limit[1]));
	        		}
  	        	}
	        		
	        	}
	        
	    	}

	      function onOpen(event) {
	        // alert('Connection established');
	      }

	      function onError(event) {
	    	  location.href = 'http://'+url+'/';
	    	  alert('Error');
	      }
	      
	      function onClose(event){
	    	  console.log('wait-close');
	    		var uidx = $('#uidx').val();
	    		var nickname = $('#nickname').val();
				var json = {
			      		"close" : nickname,	
			    };
			    webSocket.send(JSON.stringify(json));
			    
			    location.href = 'http://'+url+'/';
			    
	      }

	      
	      $('#matching').click(function(){
	    	 
	    	  var service = "Matching.bo";
	    	  var title = "캐치마인드 - 랜덤 매칭";
	    	  
	    	  var windowW = 400;
	    	  var windowH = 160;
	    		  
	    	  matchingPop = alertPopUp(service, title, windowW, windowH);
	    	  
	    		var nickname = $('#nickname').val();
				var json = {
						'subject' : '/matching',
			      		'content' : nickname,	
			    };
			    webSocket.send(JSON.stringify(json));
	      });
	      
	      $('#matching').dblclick(function(){
		    	 
	    	  var service = "MatchingOk.bo";
	    	  var title = "캐치마인드 - 방을 찾았습니다.";
	    	  
	    	  var windowW = 400;
	    	  var windowH = 250;
	    	  
	    	  alertPopUp(service, title, windowW, windowH);
	      });
	      
	      $('#my_character').click(function(){
	    	  
	    	  var service = "Mycharacter.bo";
	    	  var title = "캐치마인드 - 참여자정보";
	    	  
	    	  var windowW = 780;
	    	  var windowH = 600;
	    	  
	    	  alertPopUp(service, title, windowW, windowH);
	    	  
	      });
	      
	      $('#info').click(function(){
	    	  
	    	  if ( roomSelected ){
	    		  
	    		  var service = "RoomInfo.bo?room_idx="+roomSelected;
		    	  var title = "캐치마인드 - 참여자정보";
		    	  
		    	  var windowW = 580;
		    	  var windowH = 600;
		    	 
		    	  alertPopUp(service, title, windowW, windowH);
	    	  }
	    	 
	      });
	      
	      $('#create_room').click(function(){
	    	  var service = "Create_room.bo";
	    	  var title = "캐치마인드 - 방만들기";
	    	  
	    	  var windowW = 400;
	    	  var windowH = 290;
	    	  
	    	  alertPopUp(service, title, windowW, windowH);
	      });
	      
	      $('#input-chatting').keyup(function(event){
	    	  if(event.keyCode == 13){
	    		  var subject = '/all';
	    		  var content = $(this).val();
	    		  
	    		  var json = {
	    				  "subject" : subject,
	    				  "content" : nickname + "> "+content
	    		  };
	    		  webSocket.send(JSON.stringify(json));
	    		  $(this).val('');
	  	          return false;
	    	  }
	      });
	      
	      $('#go_main').click(function(){
	    	 
	    	  document.location.href = 'http://'+url+'/';
	    	  return false;
	      });
	      
	      $('#go_room').click(function(){
	    	  
	    	  if ( roomSelected ){
	    		  if($('.room-each ul').find('#'+roomSelected).find('.private').text() == '비공개'){
	    			  var service = "PasswordChkForm.bo";
	      	    	  var title = "캐치마인드 - 비공개 방";
	      	    	  
	      	    	  var windowW = 400;
	      	    	  var windowH = 290;
	      	    	  
	      	    	  alertPopUp(service, title, windowW, windowH);
	    			  return false;
	    		  }
	    		  
	    		  var url = 'Go_room.bo';
	    		  var data = {
	    				  'where':roomSelected
	    		  };
	    		  $.ajax({
	    				type : 'POST',
	    		        url : url,
	    		        data: data,
	    		        dataType:'json',
	    		        success : function (data) {
	    		        	console.log(data);
	    		        	if( data ){
	    		        		switch ( data ) {
	    		        		case 1:
	    		        			// goto room!!
	    		        			document.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
	    		        			break;
	    		        			
	    		        		case 2:
	    		        			var service = "Notice.bo?alert=1";
	    		      	    	  	var title = "캐치마인드 - 알림";
	    		      	    	  
	    		      	    	  	var windowW = 400;
	    		      	    	  	var windowH = 290;
	    		      	    	  
	    		      	    	  	alertPopUp(service, title, windowW, windowH);
	    		        			break;

	    						default:
	    							break;
	    						}
	    		        	}
	    		        }
	    		        ,beforeSend:function(){
	    		        	
	    		        }
	    		        ,complete:function(){
	    		        	return false;
	    		        }
	    		    });
	    	
	    	  }
	    	  else{
	    		  alert('입장할 방을 선택해주세요!');
	    	  }
    		  return false;
	      });
	      
    
});

$(document).on('click','.room-each ul li',function(){
	
		$(this).parent().children().css('backgroundColor','');
		$(this).css('backgroundColor','#58B0D8');
		roomSelected = $(this).attr('id');
		console.log(roomSelected);
});

$(document).on('click','.user-each ul li',function(){
	
	$(this).parent().children().css('backgroundColor','');
	$(this).css('backgroundColor','#58B0D8');
	userSelected = $(this).attr('id');
});


function acceptInvite( room_idx ){

	 var url = 'Go_room.bo';
	 var data = {
			  'where':parseInt(room_idx)
	  };
	  $.ajax({
			type : 'POST',
	        url : url,
	        data: data,
	        dataType:'json',
	        success : function (data) {
	        	if( data ){
	        		switch ( data ) {
	        		case 1:
	        			// goto room!!
	        			document.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
	        			break;

					default:
						break;
					}
	        	}
	        }
	        ,beforeSend:function(){
	        	
	        }
	        ,complete:function(){
	        	//
	        	return false;
	        }
	    });
}
function rejectInvite( user ){
	
	var json = {
      		"subject" : '/reject',
      		"content" : user,
      		"from" : nickname,
      		
    };
    webSocket.send(JSON.stringify(json));
}


function lengthNotNull( arr ){
	
	var length = arr.length;
	for(var i=0; i<arr.length; i++){
		if(arr[i] == null)
			length--;
	}
	return length;
}

function alertPopUp( service, title, windowW, windowH ){
	
	 //var windowW = 400;
	 //var windowH = 290;
	var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	var wTop = window.screenTop ? window.screenTop : window.screenY;
	 //var left = Math.ceil((window.screen.width - windowW)/2);
    // var top = Math.ceil((window.screen.height - windowH)/2);
	var left = wLeft + Math.ceil((getClientWidth() - windowW)/2);
	var top = wTop + Math.ceil((getClientHeight() - windowH)/2);
	
	
   return window.open(service,title,"top="+top+", left="+left+", height="+windowH+", width="+windowW);
}

function getClientWidth() {
    var ret;
    
    if (self.innerHeight) {     // IE 외 모든 브라우저
        ret = self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) { // Explorer 6 Strict
        ret = document.documentElement.clientWidth;
    } else if (document.body) {     // IE Browser
        ret = document.body.clientWidth;
    }
    return ret;
}

function getClientHeight() {
    var ret;
   // console.log(self);
    if (self.innerHeight) {     // IE 외 모든 브라우저
        ret = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict
        ret = document.documentElement.clientHeight;
    } else if (document.body) {     // IE Browser
        ret = document.body.clientHeight;
    }
    return ret;
}

/*$(window).unload(function(){
	
	if( webSocket != null ){
		webSocket.onclose();
	}
});
*/
$(window).bind('beforeunload',function(){
	
	if( webSocket != null ){
		webSocket.onclose();
	}
});


