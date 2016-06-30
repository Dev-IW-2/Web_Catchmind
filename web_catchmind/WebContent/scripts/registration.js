/**
 * 
 */

$(function(){
	
	$('#start_game').click(function(){
		
		var uidx = $('#uidx').val();
		if(uidx == 'null'){
			alert('로그인 후 이용해 주세요.');
			return false;
		}else{
			location.href = 'Wait_room.bo';
		}
	});
	
	
	$('#create').click(function(){
		
		var $form = $('#signup');
		var validate = $form.parsley().validate();
		if( !validate )
			return false;
			
		var uid = $('#u_id').val();
		var nickname = $('#nickname').val();
		var upw = $('#upw').val();
		//var upw2 = $('#upw2').val();
		var url = 'RegisterChk.bo';
		var data = {
				'uid' : uid,
				'nickname' : nickname,
				'upw' : upw,
		};
		
		$.ajax({
			
			type : 'POST',
	        url : url,
	        data: data,
	        dataType:'json',
	        success : function (data) {
	        	if( data ){
	        		console.log(data);
	        		switch ( data ) {
					
	        		case 1:
	        			alert('이미 존재하는 아이디입니다.');
	        			$('#uid').focus();
						break;
					case 2:
						alert('이미 존재하는 닉네임입니다.');
	        			$('#nickname').focus();
						break;
						
					case 3:
						alert('회원가입이 정상적으로 완료되었습니다.');
						window.location.reload();
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
	
	$('#login').click(function(){
		
		var uid = $('#login_uid').val();
		var upw = $('#login_upw').val();
		
		var url = 'LoginChk.bo';
		var data = {
				'uid' : uid,
				'upw' : upw,
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
						window.location.reload();
						break;
					case 2:
						alert('로그인에 실패하였습니다.');
						$('#login_upw').focus();
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