/**
 * 
 */
var roundLayer = touchLayer.extend({
	
	round: null,
	name: null,
	
	ctor: function( ) {
		 this._super();
		 
	     this.target = cc.LayerColor.create(new cc.Color4B(),100,30);
	     this.target.setTouchEnabled(true);
	     this.setAnchorPoint(cc.p(0, 0));
	     this.target.setPosition(380,310);
	     
	     this.addChild(this.target);
	     this.setTouchEnabled(true);
	     //this.setPriority(0);
    },
    
    init:function ( round, name ) {
    	this.name = name || '';
    	this.round = cc.Sprite.create(round);
    	this.round.setAnchorPoint(cc.p(0, 0));
    	this.round.setPosition(10, 10);
        this.target.addChild(this.round);
    	
        return true;
	},
	
	changeRound: function( round, name ){
		
		this.name = name || '';
		if( this.round )
			this.round.initWithFile(round);
		
		this.round.setAnchorPoint(cc.p(0, 0));
		this.round.setPosition(10, 10);
	},
    
});