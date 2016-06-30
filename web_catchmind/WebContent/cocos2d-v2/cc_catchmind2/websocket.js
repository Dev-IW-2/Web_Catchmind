/**
 * 
 */
var uidx;
var nickname;
var room_idx;

var popupWaitroom;

var webSocket;
var beforeX;
var beforeY;

var rejectPop;

var url;
$(function(){
	
	uidx = $('#uidx').val();
	nickname = $('#nickname').val();
	room_idx = $('#room_idx').val();
	
	//console.log(room_idx);
	var path = location.pathname.split("/");
	url = location.host;
	if( path.length > 1)
		url += '/'+path[1];
		
	if(nickname && nickname != null && room_idx && room_idx != null){
		webSocket = new WebSocket("ws://"+url+"/websocket/"+nickname+"/"+room_idx);
		nowExaminer = nickname;
		
	    webSocket.onerror = function(event) {
	    	onError(event);
	    };

	    webSocket.onopen = function(event) {
	    	onOpen(event);
	    };

	    webSocket.onmessage = function(event) {
	    	//console.log(nickname+": nickn2");
	    	onMessage(event, nickname);
	    };
	    
	    webSocket.onclose = function(event) {
	    	//console.log('---close---');
	    	onClose(event);
	    };
	}  
	   	onMessage = function(event, nickname) {
	    	//console.log(event);
	        var json = JSON.parse(event.data);
	        
	        if(json.subject){
	        	
	        	if( json.subject.indexOf('/go room') > -1 ){
	        		if( json.gameroom ){
	        			
	        			var gameroom = JSON.parse(json.gameroom);
		        		$(gameroom.userList).each(function( i, j ){
	        				if( j == null || userList[i] != null )
	        					return;
	        				
	        				 if(findUserIdx(j.nickname) == null){		// 없으면 추가해라
	        					 
	        					 userList[i] = new userLayer(i, i, j.nickname, j.rank, j.answerCount);
	        					 userList[i].init(userX[i], userY[i]);
	        					 userList[i].setAvatar(j.avatarLink);
	        					 //userList[i].answerCnt.setString();
	        					 if(j.nickname == gameroom.leaderName)
	        						 userList[i].setLeader();
	        					 layer.addChild(userList[i]);
	        					 
	        					 if( entranceLabel )
	        				    	layer.removeChild( entranceLabel );
	        					 
	        					 // notice user entrance
	        					 entranceLabel = new entranceLayer();
	        				     entranceLabel.init('enter',j.nickname);
	        				     layer.addChild(entranceLabel);
	        				     
	        				     setTimeout(function( layer ){
	        					   	layer.removeChild(entranceLabel); 
	        					 },3000, layer, entranceLabel);
	        				     
	        				 }
	        			});
		        		
		        		if(gameroom.start == true){
		        			
		        			var user = json.from;
		        			if(nickname == user){
		        				//console.log('request-take-part');
			        			var room_idx = parseInt(json.content);
			            		var json = {
			        		      		"subject" : '/take_part',
			        		      		"content" : room_idx + '#' + user,
			        		    };
			        		    webSocket.send(JSON.stringify(json));
		        			}
		            	}
	        		}
	        		
	        	}
	        	
	        	if( json.subject.indexOf('/room') > -1 ){
	        		var from = json.from;
	        		var content = json.content;
	        		var idx = findUserIdx(from);
	        		userList[idx].setMessage( content );
	        	}
	        	
	        	if( json.subject.indexOf('/all') > -1){
	        		$('#chatting').append('\n'+json.content);
	        	}
	        	
	        	if( json.subject.indexOf('/paint_start') > -1 ){
	        		
	        		var content = json.content;
	        		var paint = content.split('#');
	        		var dragging = false;
	        		if(paint.length == 4)
	        			dragging = true;
	        		p_now = paint[0];
	        		var x = parseInt(paint[1]);
	        		var y = parseInt(paint[2]);
		            
	        		game_layer.reDraw(x, y, dragging);
	        		
	        	}
	        	
	        	if( json.subject.indexOf('/paint_end') > -1 ){
	        		
	        		game_layer.clickDrag = [];
	        		game_layer.clickX = [];
	        		game_layer.clickY = [];
	        		game_layer.isMouseDown = false;
	        		
	        		game_layer.drawPoint = [];
	        		
	        		game_layer.pressShift = false;
	        		game_layer.goHorizontal = false;
	        		game_layer.goVertical = false;
	        		
	        		//console.log(game_layer);
	        	}
	        	if( json.subject.indexOf('/paint_eraser') > -1 ){
	        		p_size = 9;
					p_now = 5;
	        	}
	        	if( json.subject.indexOf('/paint_color') > -1 ){
	        		p_now = parseInt(json.content);
					p_size = 5;
	        	}
	        	if( json.subject.indexOf('/paint_clean') > -1 ){
	        		if( game_layer ){
	        			
	        			layer.removeChild(game_layer);
						game_layer = new gameLayer();
					    game_layer.init();
					    layer.addChild(game_layer);
					    
					    gameDraw = cc.DrawNode.create();
						game_layer.addChild( gameDraw );
					 }
	        	}
	        	if( json.subject.indexOf('/paint_fill') > -1 ){
	        		if( game_layer )
	        			game_layer.target.init(p_color[p_now],510,330);
	        	}
	        	if( json.subject.indexOf('/paint_right') > -1 ){
	        		if( game_layer )
	        			game_layer.pressShift = true;
	        	}
	        	
	        	// 매 턴전환
	        	if( json.subject.indexOf('/turninfo') > -1 ){
	        		
	        		
	        		layer.stopEvent();
	        		
	        		// paint re-attach
	        		if( game_layer ){
	        			layer.removeChild(game_layer);
						game_layer = new gameLayer();
					    game_layer.init();
					    layer.addChild(game_layer);
					    
					    gameDraw = cc.DrawNode.create();
						game_layer.addChild( gameDraw );
					 }
	        		
	        		var content = json.content.split('#');
	        		
	        		// global variables
	        		if(content.length == 3){
	        			nowExaminer = content[0];
		        		nextExaminer = content[1];
		        		nowRound = parseInt(content[2]);
	        		}
	        		
	        		else{
	        			nowExaminer = content[0];
	        			nextExaminer = null;
	        			nowRound = parseInt(content[1]);
	        		}
	        		
	        		
	        		for(var i in userList){
	        			if(userList[i] != null)
	        				userList[i].removeExaminer();
	        		}
	        			
	        		userList[parseInt(findUserIdx(nowExaminer))].setExaminer();
	        		
	        		layer.paintRemove();
	        		layer.gameReady();
	        		
	        		if( !chatLayer ){
	        			chatLayer = new chattingLayer();
	        	        chatLayer.init();
	        	        layer.addChild(chatLayer);
	        		}
	        		if( questionLabel ){
	        			layer.removeChild(questionLabel);
	        		}
	        		
	        		var roundImg = 'round'+nowRound+'_s';
	        		
	        		if(roundLabel.round){
	        			if(roundLabel.name != nowRound)
	        				roundLabel.changeRound(eval(roundImg),nowRound);
	        		}
	        		else
	        			roundLabel.init(eval(roundImg),nowRound);
	        		
	        	}
	        	
	        	if( json.subject.indexOf('/timer_start') > -1 ){
	        		
	        		var content = json.content.split('#');
	        		var min = parseInt(content[0]);
	        		var sec = parseInt(content[1]);
	        		var milSec = parseInt(content[2]);
	        		
	        		timerLabel = new timeLayer(min, sec, milSec);
     	           	timerLabel.init();
     	           	layer.addChild(timerLabel);
     	           	timerLabel.isTimerOn = true;
     	           	timerLabel.timerCall();
	        		
	        	}
	        	
	        	if( json.subject.indexOf('/examiner') > -1 ){
	        		// paint attachmlov
	        		layer.paintAdd();
	        		var answer = json.content;
	        		questionLabel = new questionLayer(1, answer);
	                questionLabel.init();
	                layer.addChild(questionLabel);
	                
	                if( chatLayer ){
	                	layer.removeChild(chatLayer);
	                	chatLayer = null;
	                }
	        	}
	        	if( json.subject.indexOf('/answer') > -1 ){

	        		layer.stopEvent();
	        		
	        		var content = json.content.split('#');
		        	var examiner = content[0];
		        	var answerer = content[1];
		        	var message = content[2];
		        	
	        		//timer stop
	        		userList[parseInt(findUserIdx(answerer))].setMessage( message );	// 말풍선
	        		userList[parseInt(findUserIdx(answerer))].setAnswerer();	// blink
	        		
	        		// timer stop -> remove
	        		if( timerLabel ){
	        			timerLabel.removeTimer();
	        		}
	        		
	        		var point = parseInt(pointLabel.point.getString());
	        		
	        		layer.toAnswer(examiner,point + 1,answerer,point);	// 3 Sec
	        		
	        	
	        			answerLabel = new answerLayer(message);
		                answerLabel.init();
		                layer.addChild(answerLabel);

		                setTimeout(function( layer, answerLabel ){
		           		   layer.removeChild(answerLabel);
		           	   	},3000, layer, answerLabel);
	        	}
	        	
	        	if( json.subject == '/wait' ){
	        		
	        		layer.stopEvent();
	        		nowExaminer = nickname;
	        		
	        		if( timerLabel ){
	        			timerLabel.removeTimer();
	        		}
	        		// paint re-attach
	        		if( game_layer ){
	        			
	        			layer.removeChild(game_layer);
						game_layer = new gameLayer();
					    game_layer.init();
					    layer.addChild(game_layer);
					    
					    gameDraw = cc.DrawNode.create();
						game_layer.addChild( gameDraw );
					}
	        		if( questionLabel ){
	        			layer.removeChild(questionLabel);
	        		}
	        		
	        		layer.paintAdd();
	        		
	        		if( !chatLayer ){
	        			chatLayer = new chattingLayer();
	        	        chatLayer.init();
	        	        layer.addChild(chatLayer);
	        		}
	        	}
	        	
	        	if( json.subject.indexOf('/level_up') > -1 ){
	        		
	        		var content = json.content.split('#');
		        	var nickname = content[0];
		        	var rank = content[1];
		        	
	        		userList[findUserIdx(nickname)].levelUp(rank);
	        	}
	        	
	        	if( json.subject.indexOf('/take_part') > -1 ){
	        		//console.log(json);
	        		var content = json.content.split('#');
	        		
	        		if(content.length < 5){
	        			return false;
	        		}
	        		var min = parseInt(content[0]);
	        		var sec = parseInt(content[1]);
	        		var milSec = parseInt(content[2]);
	        		var point = parseInt(content[3]);
	        		nowRound = parseInt(content[4]);

	        		nowExaminer = json.from;
	        		
	        		var roundImg = 'round'+nowRound+'_s';
	        		roundLabel.init(eval(roundImg),nowRound);
	        		
	        		//console.log(nowExaminer);
	        		
	        		userList[parseInt(findUserIdx(nowExaminer))].setExaminer();
	        		if( !pointLabel ){
	        			pointLabel = new pointLayer();
	        	        pointLabel.init();
	        	        layer.addChild(pointLabel);
	        	        pointLabel.point.setString(point);
	        	   }
	        		
	        		if(!isNaN(min) && !isNaN(sec) && !isNaN(milSec)){
	        			if(!timerLabel){
		        			timerLabel = new timeLayer(min, sec, milSec);
		     	           	timerLabel.init();
		     	           	layer.addChild(timerLabel);
		     	           	timerLabel.isTimerOn = true;
		     	           	timerLabel.timerCall();
		        		}
	        			
	     	           	layer.paintRemove();
	     	           	
	     	           	if( !chatLayer ){
		        			chatLayer = new chattingLayer();
		        	        chatLayer.init();
		        	        layer.addChild(chatLayer);
		        		}
		        		if( questionLabel ){
		        			layer.removeChild(questionLabel);
		        		}
	        		}
	        		
	        		
	        	}
	        	if( json.subject.indexOf('/game_end') > -1 ){
	        		
	        		layer.stopEvent();
	        		var gameroom = JSON.parse(json.gameroom);
	        		
	        		
	        		gameEnd = new gameReady();
	                gameEnd.init(record);
	                gameEnd.setRecord(gameroom.userList);
	                layer.addChild( gameEnd );
	        		
	                setTimeout(function(json, layer, gameEnd){
	                	
	                	var winner = json.content;
		        		if( winner ){
		        			gameEnd = new gameReady();
			                gameEnd.init(gameend);
			                gameEnd.setEnd(1, winner, 10);
			                layer.addChild(gameEnd);
			                
			                setTimeout(function(){
			                	//location.href = 'http://localhost:8080/web_catchmind/Wait_room.bo';
			                	location.href = 'http://'+url+'/Wait_room.bo';
			                },3000);
		        		}else
		        			location.href = 'http://'+url+'/Wait_room.bo';
	                },5000, json, layer, gameEnd);
	                
	        		
	        		
	        	}
	        	
	        	if( json.subject.indexOf('/wait_room') > -1 ){
	        		if( winPop ){
						//console.log(win);
						var waitroom = JSON.parse(json.waitroom);
						//win.makeList(waitroom);
						$.map(waitroom, function( value, key ){
							
							var find_id = '#'+key;
							
							if( $(winPop.document.body).find('.wait-list').find(find_id).length <= 0 ){	// 없으면
								
								var list = $('<tr id="'+key+'"></tr>');
								var nickname = '<td>'+value.nickname+'</td>';
								var level = '<td>'+value.rank+'</td>';
								var location = '<td>대기실</td>';
								
								list.append(nickname);
								list.append(level);
								list.append(location);
								
								$(winPop.document.body).find('.wait-list').append(list);
							}
							
						});
	        		}
	        		
				}
				if( json.subject.indexOf('/wait_out') > -1 ){
					
					if( winPop ){
						var find_id = '#'+json.content;
						if( $(winPop.document).find('.wait-list').find(find_id).length > 0 ){
							$(winPop.document).find('.wait-list').find(find_id).remove();
						}
					}
				}
				
				if( json.subject.indexOf('/leader_out') > -1 ){
					
					var newLeader = json.content.split('#')[1];
					userList[findUserIdx(newLeader)].setLeader();
				}
				
				if( json.subject.indexOf('/profile') > -1 ){
					
					var content = json.content.split('#');
					var nickname = content[0];
					var uid = content[1];
					var rank = content[2];
					var point = parseInt(content[3]);
					
					var windowW = 400;
					var windowH = 290;
					  
					var left = Math.ceil((window.screen.width - windowW)/2);
				    var top = Math.ceil((window.screen.height - windowH)/2);
				    
				    var profileView = 'profile.jsp?nickname='+ nickname +'&uid='+ uid +'&rank='+ rank +'&point='+ point;
				    if(content.length > 4 && content[4] != nickname)
				    	profileView += '&leader=leader';
				    
				    profilePop = window.open(profileView,"profileUser","top="+top+", left="+left+", height="+windowH+", width="+windowW);
					
				}
				if( json.subject.indexOf('/banish') > -1 ){
					//location.href = 'http://localhost:8080/web_catchmind/Wait_room.bo';
					location.href = 'http://'+url+'/Wait_room.bo';
					return false;
				}
				
				
				if( json.subject.indexOf('/reject') > -1 ){
					
					var fromUser = json.from;
					
					//var service = "Notice.bo?alert=4&fromUser="+fromUser;
					var service = 'http://'+url+'/Notice.bo?alert=4&fromUser='+fromUser;
      	    	  	var title = "캐치마인드 - 알림";
      	    	  
      	    	  	var windowW = 400;
      	    	  	var windowH = 290;
      	   	  
      	    	  	var left = Math.ceil((window.screen.width - windowW)/2);
      	    	  	var top = Math.ceil((window.screen.height - windowH)/2);
      	        
      	    	  	rejectPop = window.open(service,title,"top="+top+", left="+left+", height="+windowH+", width="+windowW);
      	        
      	    	  	return;
				}
				
				if( json.subject.indexOf('/timeover') > -1 ){
					/*if(timerLabel)
						timerLabel.timeOver();*/
					if(timerLabel)
						timerLabel.isTimerOn = false;
				}
				
				if( json.subject.indexOf('/server_time') > -1 ){
					
					var content = json.content.split('#');
	        		var min = parseInt(content[0]);
	        		var sec = parseInt(content[1]);
	        		var milSec = parseInt(content[2]);
	        		var point = parseInt(content[3]);
	        		
					if( timerLabel ){
		        		timerLabel.targetMin.setString(min);
		        		timerLabel.targetSec.setString(sec);
		        		timerLabel.targetMilSec.setString(milSec);
					}
					if( pointLabel ){
        				pointLabel.point.setString(point);
        			}
						
				}
	        	
	        }
	        
	        if( json.close ){
	        	
	        	var user = json.close;
	        	
	        	var userIdx = parseInt(findUserIdx( user ));
	        	layer.removeChild(userList[userIdx]);
	        	userList[userIdx] = null;

	        	// notice out user
	        	if( entranceLabel )
			    	layer.removeChild( entranceLabel );
	        	
	        	 entranceLabel = new entranceLayer();
			     entranceLabel.init('out',user);
			     layer.addChild(entranceLabel);
			     
			     setTimeout(function( layer ){
			    	layer.removeChild(entranceLabel); 
			     },3000, layer, entranceLabel);
	        	
	        }
	  
	      };

	      function onOpen(event) {
	        //alert('Connection established');
	      }

	      function onError(event) {
	    	  location.href = 'http://'+url+'/';
	    	  alert('Error');
	      }
	      function onClose(event){
	    		var uidx = $('#uidx').val();
	    		var nickname = $('#nickname').val();
	    		//var room_idx = $('#room_idx').val();
	    		
				var json = {
			      		"close" : nickname,
			      		"content" : room_idx
			    };
			    webSocket.send(JSON.stringify(json));
			    
			    if(webSocket.CLOSED){
			    	alert('서버와의 접속이 끈어졌습니다. 다시 접속해주세요.');
			    	location.href = 'http://'+url+'/';
			    }
			   
	      }
	      
	      function findUserIdx( nickname ){
	    	  var idx = null;
	    	  for(var i=0; i<userList.length; i++){
	    		  if(userList[i] != null){
	    			  if(nickname == userList[i].nickname){
	        				idx = i;
	        				break;
	        			}
	    		  }
      			
      		}
	    	  	return idx;
	      }

	      
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
    
});


function catchEvent(event){
	if(webSocket != null){
		onMessage(event, nickname);
	}
}

	
$(window).unload(function(){
	
	if( winPop ){
		var json = {
	      		"subject" : '/popup_out',
	      		"content" : nickname
	    };
		webSocket.send(JSON.stringify(json));
		winPop.close();
	}
	if( profilePop ){
		profilePop.close();
	}
	if( rejectPop ){
		rejectPop.close();
	}
	if( webSocket != null ){
		webSocket.onclose();
	}
});

