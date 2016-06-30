/**
 * 
 */

var explainLayer = touchLayer.extend({
	
	size: null,
	
	ctor: function( ) {
        this._super();
        this.size = cc.Director.getInstance().getWinSize();
        
    	this.target = cc.LayerColor.create(new cc.Color4B(), 505, 20);
        this.target.setAnchorPoint(cc.p(0, 0));
        this.target.setPosition(this.size.width/2 - 258, 60);
         
        this.addChild(this.target);
        this.setTouchEnabled(true);
    },
    
    init: function (  ) {
    	var send = '♡ 화면전체 칠하기 - ALT + 마우스 왼쪽버튼,  직선그리기 - Shift + 마우스로 그리기 ♡';
    	
    	var message = cc.LabelTTF.create(send, TEXT_VERDANA_FONT_NAME, 13);
    	message.setAnchorPoint(cc.p(0,0));
    	message.setPosition(0,3);
    	
    	this.target.addChild(message);
    	
       return true;
	},
	
});