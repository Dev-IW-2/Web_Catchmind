/**
 * 
 */
var profilePop;

var userLayer = touchLayer.extend({
	uidx: null,		// 입장 순서
	isMouseDown: false,
	avatar: null,
	msg: null,
	nickname: null,
	level: null,
	answer: null,
	examiner: null,
	answerer: null,
	answerCnt: null,
	leader: null,
	up: null,
	levelLabel: null,
	msgLoad: null,
	
	ctor: function(name, uidx, nickname, level, answer) {
        this._super();
        this.name = name || "";
        this.uidx = uidx || 0;
        this.nickname = nickname || "";
        this.level = level || "";
        this.answer = answer || '0';
        //this.target = cc.LayerColor.create(new cc.Color4B(150, 150, 140, 50),160,100);
        this.target = cc.LayerColor.create(new cc.Color4B(),160,100);
        this.setTouchEnabled(true);
    },
    
    init:function (posX, posY) {
        
        this.target.setPosition(posX, posY);
        this.addChild(this.target,8);
        var nickname = cc.LabelTTF.create(this.nickname, TEXT_ARIAL_FONT_NAME, 12);
        //var level = cc.LabelTTF.create(this.level, TEXT_ARIAL_FONT_NAME, 12);
        this.levelLabel = cc.LabelTTF.create(this.level, TEXT_ARIAL_FONT_NAME, 12);
        var answerLabel = cc.LabelTTF.create("정답", TEXT_ARIAL_FONT_NAME, 12);
        this.answerCnt = cc.LabelTTF.create(this.answer, TEXT_ARIAL_FONT_NAME, 12);
        
        if( this.uidx < 4 ){
        	nickname.setPosition(35,70);
        	this.levelLabel.setPosition(35,45);
        	answerLabel.setPosition(15,20);
        	this.answerCnt.setPosition(45,20);
        }
        	
        else{
        	nickname.setPosition(120,70);
        	this.levelLabel.setPosition(120,45);
        	answerLabel.setPosition(105,20);
        	this.answerCnt.setPosition(130,20);
        }
        nickname.setColor(p_blue);
        this.levelLabel.setColor(p_red);
        answerLabel.setColor(p_green);
        this.answerCnt.setColor(p_blue);
        
        this.target.addChild(nickname);
        this.target.addChild(this.levelLabel);
        this.target.addChild(answerLabel);
        this.target.addChild(this.answerCnt);
        
        return true;
	},
	setMessage:function( message ){
		
		if( this.msg != null){
			this.target.removeChild(this.msg);
			this.msg = null;
		}
		
		if( message.length > 5 && message.length < 10 ){
			message = message.substring(0, 6)+'\n'+message.substring(6, message.length);
		}
		else if( message.length > 10 ){
			message = message.substring(0, 6)+'\n'+message.substring(6, 11) + '\n' + message.substring(11, message.length);
		}
		
		if( this.uidx < 4 ){
			this.msg = cc.Sprite.create(message4);
			this.msg.setPosition(160,10);
		}else{
			this.msg = cc.Sprite.create(message4_1);
			this.msg.setPosition(-120,10);
		}
		
		if(this.uidx == 3)
			this.msg.setPosition(160,-50);
	 	this.msg.setAnchorPoint(cc.p(0,0));
	 	//this.msg.setPriority(0);
	 	
	 	var label = cc.LabelTTF.create(message, TEXT_ARIAL_FONT_NAME, 12);
	 	label.setPosition(65,60);
	 	label.setColor(p_red);
	 	this.msg.addChild(label);
	 	
	 	this.target.removeChild(this.msg);
	 
	 	if(this.msgLoad){
	 		clearTimeout(this.msgLoad);
	 	}
	 	this.target.addChild(this.msg, 1);
	 	
	 	this.msgLoad = setTimeout(function(layer){
	 		layer.target.removeChild(layer.msg);
	 		//layer.msg = null;
	 		
	 	},5000,this);
	},
	
	
	setExaminer: function(){
		if( this.uidx < 4 )
			this.examiner = cc.Sprite.create(examiner);
		else
			this.examiner = cc.Sprite.create(examiner2);
	     this.examiner.setAnchorPoint(cc.p( 0, 0 ));
	     this.examiner.setPosition(-10,-3);
	     this.target.addChild(this.examiner);
	     
	},
	removeExaminer: function(){
		this.target.removeChild(this.examiner);
	},
	setAnswerer: function(){
		if( this.uidx < 4 )
			this.answerer = cc.Sprite.create(answerer);
		else
			this.answerer = cc.Sprite.create(answerer2);
	     this.answerer.setAnchorPoint(cc.p( 0, 0 ));
	     this.answerer.setPosition(-10,-3);
	     
	     var action = new cc.Blink.create(5, 5);
	     this.answerer.runAction(cc.RepeatForever.create(action));
	     
	     this.target.addChild(this.answerer);
	     
	     this.answerCnt.setString(parseInt(this.answerCnt.getString()) + 1);
	     setTimeout(function(layer){
	    	 layer.target.removeChild(layer.answerer);
	     },5000,this);
	     //layer.sleep(5000);
	},
	
	setLeader: function(){
		if( this.uidx < 4 ){
			this.leader = cc.Sprite.create(roomleader01);
			this.leader.setAnchorPoint(cc.p( 0, 0 ));
		    this.leader.setPosition(-12,-3);
		}
		else{
			this.leader = cc.Sprite.create(roomleader02);
			this.leader.setAnchorPoint(cc.p( 0, 0 ));
		    this.leader.setPosition(-8,-3);
		}
	    
	    
	    this.target.addChild(this.leader);
	},
	
	setAvatar:function( myavatar ){
		
		 	this.avatar = cc.Sprite.create(eval(myavatar));
		 	this.avatar.setAnchorPoint(cc.p(0,0));
		 	
		 	if(this.uidx < 4)
		 		this.avatar.setPosition(80,10);
		 	else
		 		this.avatar.setPosition(0,10);
	        
	        this.target.addChild(this.avatar);
	},
	
	levelUp:function( level ){
		
		this.levelLabel.setString(level);
		
		var label = cc.LabelTTF.create(level, TEXT_ARIAL_FONT_NAME, 18);
		
		if(this.uidx < 4){
			this.up = cc.Sprite.create(levelup1);
			this.up.setPosition(160,10);
			label.setPosition(65,50);
		}
	 	else{
	 		this.up = cc.Sprite.create(levelup2);
	 		this.up.setPosition(-220,10);
	 		label.setPosition(55,50);
	 	}
		this.up.setAnchorPoint(cc.p(0, 0));
	 	
	 	label.setColor(p_red);
	 	this.up.addChild(label);
		var action = new cc.Blink.create(5, 3);
	    this.up.runAction(cc.RepeatForever.create(action));
        
        this.target.addChild(this.up);
        
        setTimeout(function(layer){
	    	 layer.target.removeChild(layer.up);
	     },5000,this);
	},
    
	onTouchesBegan: function(touches) {
		
		if(this.testTouch(touches[0])){
			
    		//var nickname = this.nickname;
			var json = {
					'subject':'/profile',
		      		"content" : room_idx + '#' + this.nickname,
		      		"from" : nickname
		    };
		    webSocket.send(JSON.stringify(json));
			
			
			
		}
    },
    
});