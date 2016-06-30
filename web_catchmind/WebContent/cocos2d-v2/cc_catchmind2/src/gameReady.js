/**
 * 
 */
var gameReady = touchLayer.extend({

	size: null,
	ready: null,
	start: null,
	
	ctor: function( ) {
        this._super();
        this.size = cc.Director.getInstance().getWinSize();
        ///this.name = name || "";
        this.setTouchEnabled(true);
    },
    
    init: function ( gameready ) {
    	
    	 this.target = cc.Sprite.create(gameready);
         this.target.setAnchorPoint(cc.p(0.5,0.5));
         this.target.setPosition(this.size.width/2, this.size.height/2);
         
        this.addChild(this.target);
         
        return true;
	},
	
	setRecord: function( userList ){
		
		var height = 248;
		for(var i = 0; i < userList.length; i++){
			
			j = userList[i];
			
			var nickname = cc.LabelTTF.create(j.nickname, TEXT_ARIAL_FONT_NAME, 14);
			var answerCnt = cc.LabelTTF.create(j.answerCount, TEXT_ARIAL_FONT_NAME, 14);		 
			var point = cc.LabelTTF.create(j.gainPoint, TEXT_ARIAL_FONT_NAME, 14);
			var exp = cc.LabelTTF.create('-', TEXT_ARIAL_FONT_NAME, 14);
			
			nickname.setAnchorPoint(cc.p(0,0));
			nickname.setPosition(70,height);
			answerCnt.setAnchorPoint(cc.p(0,0));
			answerCnt.setPosition(190,height);
			point.setAnchorPoint(cc.p(0,0));
			point.setPosition(280,height);
			exp.setAnchorPoint(cc.p(0,0));
			exp.setPosition(370,height);
			
			if( i == 0){
				
				nickname.setColor(p_red);
				answerCnt.setColor(p_red);
				point.setColor(p_red);
				exp.setColor(p_red);
			}
			
			this.target.addChild(nickname);
		    this.target.addChild(answerCnt);
		    this.target.addChild(point);
		    this.target.addChild(exp);
		    
		    height -= 30;
		}
		
		
	},
	
	setEnd: function( rank, nickname, point ){
		
		var rankLabel = cc.LabelTTF.create(rank, TEXT_ARIAL_FONT_NAME, 16);		 
		var nicknameLabel = cc.LabelTTF.create(nickname, TEXT_ARIAL_FONT_NAME, 14);
		var pointLabel = cc.LabelTTF.create(point, TEXT_ARIAL_FONT_NAME, 14);
		
		
		nicknameLabel.setAnchorPoint(cc.p(0,0));
		nicknameLabel.setPosition(80,248);
		rankLabel.setAnchorPoint(cc.p(0,0));
		rankLabel.setPosition(80,193);
		pointLabel.setAnchorPoint(cc.p(0,0));
		pointLabel.setPosition(60,145);
		
		rankLabel.setColor(p_blue);
		nicknameLabel.setColor(p_red);
		pointLabel.setColor(p_red);
		
		this.target.addChild(rankLabel);
	    this.target.addChild(nicknameLabel);
	    this.target.addChild(pointLabel);
	    
	    
	    var rotateToA = cc.RotateTo.create(2, 10);
        var scaleToA = cc.ScaleTo.create(2, 1.5, 1.5);

        this.target.runAction(cc.Sequence.create(rotateToA, scaleToA));
        
        
	//    this.target.runAction(actionTo);
	},
	
});