/**
 * 
 */
var webSocket; 
$(function(){
	
	var room_idx = opener.roomSelected;
	
	
	$('#chk').click(function(){
		
		var password = $('#password').val();
		var nickname = $('#nickname').val();
		
		var url = 'PasswordChk.bo';
		var data = {
				
				 'room_idx':room_idx,
				 'password':password
		  };
		
		console.log(data);
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
		        			
		        			var url = 'Go_room.bo';
		  	    			var data = {
		  	    				  'where':room_idx
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
			  	    		        			self.close();
			  	    		        			window.opener.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
			  	    		        			break;
			  	    		        			
			  	    		        		case 2:
			  	    		        			var service = "Notice.bo?alert=1";
			  	    		      	    	  	var title = "캐치마인드 - 알림";
			  	    		      	    	  
			  	    		      	    	  	alertPopUp(service, title);
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
			  	    		  var json = {
			  	    				  "subject" : '/go room',
			  	    				  "content" : room_idx,
			  	    				  "from" : nickname
			  	    		  };
			  	    		  webSocket.send(JSON.stringify(json));
		  	    		  
		        			break;

		        		case 2:
		        			var service = "Notice.bo?alert=2";
  		      	    	  	var title = "캐치마인드 - 알림";
  		      	    	  
  		      	    	  	alertPopUp(service, title);
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
	
})

function alertPopUp( service, title ){
	
	 var windowW = 400;
	 var windowH = 290;
	  
	 var left = Math.ceil((window.screen.width - windowW)/2);
     var top = Math.ceil((window.screen.height - windowH)/2);
     
     window.open(service,title,"top="+top+", left="+left+", height="+windowH+", width="+windowW);
}