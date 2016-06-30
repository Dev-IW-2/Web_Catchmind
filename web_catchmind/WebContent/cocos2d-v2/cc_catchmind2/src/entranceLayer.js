/**
 * 
 */
var entranceLayer = touchLayer.extend({
	
	size: null,
	
	ctor: function() {
		this._super();
        this.size = cc.Director.getInstance().getWinSize();
       // this.target = cc.LayerColor.create(new cc.Color4B(50, 50, 50, 255), this.targetWid, 30);
        this.target = cc.LayerColor.create(new cc.Color4B(), 200, 25);
        this.target.setAnchorPoint(cc.p(0, 0));
        this.target.setPosition(this.size.width/2 - 100, 700);
        this.addChild(this.target);
        this.setTouchEnabled(true);
    },
    
    init:function ( order, user ) {
    	
    	var entrance = null;
    	
    	if(order == 'enter')
			entrance = cc.Sprite.create(enter);
			
		else if(order == 'out')
			entrance = cc.Sprite.create(out);
    	
    	if( entrance ){
    		entrance.setAnchorPoint(cc.p(0, 0));
        	entrance.setPosition(0, 0);
            this.target.addChild(entrance);
            
            var userLabel = cc.LabelTTF.create(user, TEXT_ARIAL_FONT_NAME, 13);
            userLabel.setAnchorPoint(cc.p(0, 0));
            userLabel.setPosition(20, (entrance._contentSize._height - 12)/2);
            userLabel.setColor(p_black);
            entrance.addChild(userLabel);
    	}
    	
    	
	},
	
    
});