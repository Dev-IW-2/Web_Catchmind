/**
 * 
 */

// invite.jsp
var waitUser;
var winPop;

var etcLayer = touchLayer.extend({
	
	size: null,
	option: null,
	
	ctor: function(name, posX, posY, ob) {
        this._super();
        this.size = cc.Director.getInstance().getWinSize();
        this.name = name || '';
        
        this.target = cc.LayerColor.create(new cc.Color4B(), 80, 40);
        this.target.setAnchorPoint(cc.p(0, 0));
        this.target.setPosition(posX, posY);
        this.addChild(this.target);
        
        this.option = cc.Sprite.create( ob );
        this.option.setAnchorPoint(cc.p(0, 0));
        this.option.setPosition(0, 0);
        this.target.addChild(this.option);
        
        this.setTouchEnabled(true);
    },
    
    onTouchesBegan:function (touches, event) {
		 if(this.testTouch(touches[0])){
			 if(this.name == 'invite'){
				 
				var windowW = 400;
				var windowH = 600;
				  
				var left = Math.ceil((window.screen.width - windowW)/2);
			    var top = Math.ceil((window.screen.height - windowH)/2);
			     
			   /* var path = location.pathname.split("/");
			 	var url = location.host;
			 	if( path.length > 1)
			 		url += '/'+path[1];*/
			     
			    winPop = window.open('invite.jsp',"inviteGame","top="+top+", left="+left+", height="+windowH+", width="+windowW);
			    $(winPop).load(function(){
			    	var json = {
			         		"subject" : "/wait_room",
			         		"content" : nickname
			    	    };
			   		webSocket.send(JSON.stringify(json));
			    });
			    winPop.focus();
			   	
			     return;
			 }
			 else if(this.name == 'option'){
				 
			 }
			 else if(this.name == 'exit'){
				 //location.href = 'http://localhost:8080/web_catchmind/Wait_room.bo';
				 var path = location.pathname.split("/");
				 var url = location.host;
					if( path.length > 1)
						url += '/'+path[1];
				 location.href = 'http://'+url+'/Wait_room.bo';
			 }
			 
			 else if(this.name == 'exit2'){
				 
				/* var subject = '/forced#' + room_idx;
				 var content = this.colorIdx+'';
				 var json = {
				      		"subject" : subject,
				      		"content" : content,
				 };*/
				    webSocket.close();
				 
			 }
		 }
		 //return;
    },
    
});