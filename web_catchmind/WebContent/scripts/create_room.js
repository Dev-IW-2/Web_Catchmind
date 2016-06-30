/**
 * 
 */

$(function(){
	
	$('#is_private').change(function(){
		
		if($(this).val() == 1)
			$('#password').attr('readonly',false);
		else{
			$('#password').val('');
			$('#password').attr('readonly',true);
		}
	});
	
	$('#close').click(function(){
		self.close();
	});
	
	$('#create').click(function(){
		
		var title = $('#title').val();
		var is_private = $('#is_private').val();
		var password = $('#password').val();
		var limit = $('#limit').val();
		var turn_limit = $('#turn_limit').val();
		
		
		if( !title ){
			alert('제목을 입력하세요.');
			$('#title').focus();
			return false;
		}
		var url = 'Go_room.bo';
		var data = {
				'title' : title,
				'is_private' : is_private,
				'password' : password,
				'limit' : limit,
				'turn_limit' : turn_limit,
				'is_create': '1',
		};
		$.ajax({
			
			type : 'POST',
	        url : url,
	        data: data,
	        dataType:'json',
	        success : function (data) {
	        	console.log(data);
	        	if( data ){
	        		console.log(data);
	        		//console.log(result);
	        		switch ( data ) {
					
	        		case 1:
	        			// goto maked room!!
	        			window.opener.location.href = 'cocos2d-v2/cc_catchmind2/index.jsp';
	        			self.close();
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
	
});
