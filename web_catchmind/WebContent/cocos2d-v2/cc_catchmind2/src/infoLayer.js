/**
 * 
 */

var infoLayer = touchLayer.extend({
	
	turn: null,
	nextturn: null,
	round: null,
	size: null,
	
	ctor: function() {
        this._super();
        this.size = cc.Director.getInstance().getWinSize();
        ///this.name = name || "";
        /*this.target = cc.Sprite.create(order);
        this.target.setAnchorPoint(cc.p(0.5,0.5));
        this.target.setPosition(this.size.width/2, this.size.height/2);
        this.addChild(this.target);*/
        this.setTouchEnabled(true);
    },
    
    init:function ( round, turn, nextturn ) {
    	
    	// targetSetting
    	this.turn = turn;
    	this.nextturn = nextturn;
    	
    	if( this.nextturn )
    		this.target = cc.Sprite.create(order);
    	else
    		this.target = cc.Sprite.create(order2);
    	
        this.target.setAnchorPoint(cc.p(0.5,0.5));
        this.target.setPosition(this.size.width/2, this.size.height/2);
        this.addChild(this.target);
        
        
    	this.round = cc.Sprite.create( round );
    	this.round.setAnchorPoint(cc.p(0.5,0.5));
        this.round.setPosition(this.size.width/2, this.size.height/2 + 70);
        this.addChild(this.round);
    	
    	
    	var turn = cc.LabelTTF.create(this.turn, TEXT_ARIAL_FONT_NAME, 12);
       	turn.setPosition(65,25);
        turn.setColor(p_red);
        

        if( this.nextturn ){
        	turn.setPosition(65,60);
        	
        	 var nextturn = cc.LabelTTF.create(this.nextturn, TEXT_ARIAL_FONT_NAME, 12);
             nextturn.setPosition(65,30);
             nextturn.setColor(p_blue);
             this.target.addChild(nextturn);
        }
        
        this.target.addChild(turn);
        
        setTimeout(function(layer){
        	
        	layer.removeChild(layer.target);
        	//layer._parent.removeChild( layer );
        	
        },3000,this);
        
        return true;
	},
});