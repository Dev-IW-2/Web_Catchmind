/**
 * 
 */
var answerLayer = touchLayer.extend({
	
	answer: null,
	size: null,
	answerLen: null,
	targetWid: null,
	
	ctor: function( answer ) {
		this._super();
        this.answer = answer || "";
        this.answerLen = this.answer.length;
        this.targetWid = this.answerLen * 30;
        this.size = cc.Director.getInstance().getWinSize();
       // this.target = cc.LayerColor.create(new cc.Color4B(50, 50, 50, 255), this.targetWid, 30);
        this.target = cc.LayerColor.create(new cc.Color4B(), this.targetWid, 30);
        this.target.setAnchorPoint(cc.p(0, 0));
        this.target.setPosition(this.size.width/2-this.targetWid/2, 670);
        
        this.addChild(this.target);
        this.setTouchEnabled(true);
    },
    
    init:function () {
    	
    	for( var i = 0; i < this.answerLen; i++ ){
    		var answerImg = cc.Sprite.create(answer);
    		answerImg.setAnchorPoint(cc.p(0, 0));
    		answerImg.setPosition(i*30, 0);
            this.target.addChild(answerImg);
    		
    		var word = this.answer.charAt(i);
    		var wordLabel = cc.LabelTTF.create(word, TEXT_VERDANA_FONT_NAME, 16);
    		wordLabel.setAnchorPoint(cc.p(0, 0));
    		wordLabel.setPosition(6, 2);
    		wordLabel.setColor(p_blue);
    		answerImg.addChild(wordLabel);
    	}
    	
        
        return true;
	},
	
    
});