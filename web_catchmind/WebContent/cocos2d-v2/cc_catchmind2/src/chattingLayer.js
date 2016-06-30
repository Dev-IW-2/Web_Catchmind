/**
 * 
 */

var chattingLayer = touchLayer.extend({

	textField: null,
	charLimit: 20,
	
	ctor: function( ) {
        this._super();
        
        this.target = cc.LayerColor.create(new cc.Color4B(), 210, 20);
        this.target.setAnchorPoint(cc.p(0, 0));
        this.target.setPosition(cc.p(630, 153));
        
        this.setKeyboardEnabled(true);
        this.setTouchEnabled(true);
    },
    
    init:function ( gameready ) {
    	
         this.textField = cc.TextFieldTTF.create("[chatting]",
                 TEXT_INPUT_FONT_NAME,
                 TEXT_INPUT_FONT_SIZE);
         
         this.textField.setColor(new cc.Color3B(0, 0, 255));
         this.textField.setAnchorPoint(cc.p(0, 0));
         this.textField.setPosition(cc.p(0, 0));
         this.textField.setDelegate(this);
         this.target.addChild(this.textField);
         this.addChild(this.target);
         
        return true;
	},
    
	onDraw:function (sender) {
        return false;
    },
    onTextFieldAttachWithIME:function (sender) {
        return false;
    },
    onTextFieldDetachWithIME:function (sender) {
        return false;
    },
   
    onTextFieldDeleteBackward:function (sender, delText, len) {

        return false;
    },
    
	onTouchesEnded:function (touches, event) {
		
		 if(this.testTouch(touches[0])){
			   	if(touches){
			   		this.textField.attachWithIME();
			    }
		 }else{
				if(touches){
					this.textField.detachWithIME();
				}
		 }
	 },
	 onTextFieldInsertText:function (sender, text, len) {
		 
		 
		/* if(text == 'a'){
			  layer.removeChild(readyLabel);
			  clearTimeout(layer.ready);
			  readyLabel = null;
		 }*/
		 
		 if ('\n' == text) {
	        	var subject = '/room#'+room_idx;
		    	var content = sender.getString();
		    	var from = nickname;
		    	
		    	var json = {
		    			  "subject" : subject,
		    			  "content" : content,
		    			  "from" : from,
		    			  //"point" : point,
		    	 };
		    	if( pointLabel ){
		    		var point = pointLabel.point.getString();
		    		json.point = point;
		    	}
		    	
		    	webSocket.send(JSON.stringify(json));
		    	sender.setString('');
		    	
		    	//sender.attachWithIME();
		    	//this.textField.attachWithIME();
	            return false;
	       }
		 
		 if (sender.getCharCount() >= this.charLimit) {
	            return true;
	     }
		 // create a insert text sprite and do some action
	        var label = cc.LabelTTF.create(text, TEXT_INPUT_FONT_NAME, TEXT_INPUT_FONT_SIZE);
	        label.setColor(new cc.Color3B(0, 0, 255));
	        this.addChild(label);
	        
	        var pTarget = this.target;
	        // move the sprite from top to position
	        var endPos = cc.p(pTarget.getPositionX(), pTarget.getPositionY());
	        if (sender.getCharCount()) {
	            endPos.x += sender.getContentSize().width;
	        }
	        
	        var inputTextSize = label.getContentSize();
	        var beginPos = cc.p(endPos.x, cc.Director.getInstance().getWinSize().height - inputTextSize.height * 2);

	        
	        var duration = 0.5;
	        label.setPosition(beginPos);
	        label.setScale(8);

	        var seq = cc.Sequence.create(
	            cc.Spawn.create(
	                cc.MoveTo.create(duration, endPos),
	                cc.ScaleTo.create(duration, 1),
	                cc.FadeOut.create(duration)),
	            cc.CallFunc.create(this.callbackRemoveNodeWhenDidAction, this));
	        label.runAction(seq);
	        
	        return false;
	 },
	 
	 onKeyUp:function(keyCode){
		
		 if(keyCode == 13){
			 this.textField.attachWithIME();
		 }
		 return false;
	 },
	 
	 onTextFieldDeleteBackward:function (sender, delText, len) {
	        // create a delete text sprite and do some action
	        var label = cc.LabelTTF.create(delText, TEXT_INPUT_FONT_NAME, TEXT_INPUT_FONT_SIZE);
	        this.addChild(label);

	        var pTarget = this.target;
	        // move the sprite to fly out
	        var beginPos = cc.p(pTarget.getPositionX(), pTarget.getPositionY());
	        var textfieldSize = sender.getContentSize();
	        var labelSize = label.getContentSize();
	        beginPos.x += (textfieldSize.width - labelSize.width) / 2.0;

	        var winSize = cc.Director.getInstance().getWinSize();
	        var endPos = cc.p(-winSize.width / 4.0, winSize.height * (0.5 + Math.random() / 2.0));

	        var duration = 1;
	        var rotateDuration = 0.2;
	        var repeatTime = 5;
	        label.setPosition(beginPos);

	        var seq = cc.Sequence.create(
	            cc.Spawn.create(
	                cc.MoveTo.create(duration, endPos),
	                cc.Repeat.create(
	                    cc.RotateBy.create(rotateDuration, (Math.random() % 2) ? 360 : -360),
	                    repeatTime),
	                cc.FadeOut.create(duration)),
	            cc.CallFunc.create(this.callbackRemoveNodeWhenDidAction, this));
	        label.runAction(seq);
	        return false;
	    },
	 
	 callbackRemoveNodeWhenDidAction:function (node) {
	        this.removeChild(node, true);
	 },
	 
	 keyUnable:function(){
		 this.setKeyboardEnabled(false);
	 },
	 keyAble:function(){
		 this.setKeyboardEnabled(true);
	 },
	 
	
});