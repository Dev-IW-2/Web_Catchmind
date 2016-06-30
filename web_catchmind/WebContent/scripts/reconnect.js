/**
 * 
 */
$(function(){
	
	var mySocket = window.opener.webSocket;
	var nickname = $('#nickname').val();
	var room_idx = $('#room_idx').val();
	
	$('#yes').click(function(){
		
		 var url = 'Go_room.bo';
		  var data = {
				  'where':room_idx,
				  'reconnect':true,
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
		        			self.close();
		        			window.opener.document.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
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
	});
	
	$('#no').click(function(){
		
		 var json = {
				  "subject" : '/reconnect_reject',
				  "content" : nickname,
		  };
		 mySocket.send(JSON.stringify(json));
		 
		 self.close();
	});
});