/**
 * 
 */
var questionLayer = touchLayer.extend({
	
	uidx: null,		
	answer: null,
	
	ctor: function( uidx, answer ) {
		this._super();
        this.uidx = uidx || 0;
        this.answer = answer || "";
        this.target = cc.Sprite.create(question);
        this.target.setAnchorPoint(cc.p(0,0));
        this.target.setPosition(380, 670);
        this.addChild(this.target);
        this.setTouchEnabled(true);
    },
    
    init:function () {
        
        var question = cc.LabelTTF.create(this.answer, TEXT_ARIAL_FONT_NAME, 12);
        question.setAnchorPoint(cc.p(0,0));
        question.setPosition(60,5);
        question.setColor(p_blue);
        this.target.addChild(question);
        
        return true;
	},
    
});