/**
 * 
 */

var timeLayer = touchLayer.extend({
	
	targetMin: null,
	targetColon: null,
	targetSec: null,
	targetMilSec: null,
	isTimerOn:false,
	timer: null,
	timeOverLayer: null,
	toAnswerLayer: null,
	size: null,
	min: null,
	sec: null,
	milSec: null,

	ctor: function(min, sec, milSec) {
        this._super();
        this.min = min || "0";
        this.sec = sec || "00";
        this.milSec = milSec || "00";
        this.target = cc.LayerColor.create(new cc.Color4B(), 110, 30);
        this.targetMin = cc.LabelTTF.create(this.min,TEXT_ARIAL_FONT_NAME,30,cc.TEXT_ALIGNMENT_LEFT);
        this.targetColon = cc.LabelTTF.create(":",TEXT_ARIAL_FONT_NAME,30,cc.TEXT_ALIGNMENT_LEFT);
        this.targetSec = cc.LabelTTF.create(this.sec,TEXT_ARIAL_FONT_NAME,30,cc.TEXT_ALIGNMENT_LEFT);
        this.targetMilSec = cc.LabelTTF.create(this.milSec,TEXT_ARIAL_FONT_NAME,19,cc.TEXT_ALIGNMENT_MIDDLE);
        
        this.size = cc.Director.getInstance().getWinSize();
        this.setTouchEnabled(true);
    },
    
    init:function () {
    	
    	this.targetMin.setAnchorPoint(cc.p(0,0));
        this.targetMin.setPosition(10,0);
        this.targetMin.setColor(p_yellow);
        this.target.addChild(this.targetMin);
        
        this.targetColon.setAnchorPoint(cc.p(0,0));
        this.targetColon.setPosition(30,0);
        this.targetColon.setColor(p_yellow);
        this.target.addChild(this.targetColon);
        
        this.targetSec.setAnchorPoint(cc.p(0,0));
        this.targetSec.setPosition(45,0);
        this.targetSec.setColor(p_yellow);
        this.target.addChild(this.targetSec);
        
        this.targetMilSec.setAnchorPoint(cc.p(0,0));
        this.targetMilSec.setPosition(80,0);
        this.targetMilSec.setColor(p_yellow);
        this.target.addChild(this.targetMilSec);
        
        this.target.setAnchorPoint(cc.p(0,0));
        this.target.setPosition(400,155);
        this.addChild(this.target);
        
        return true;
	},
	
	timeCallBack:function(){
		
	},
	timerCall: function() {
			
			if(this.isTimerOn){
				
				this.timer = setInterval(function(layer){
					
					var milsec = parseInt(layer.targetMilSec.getString());
					var sec = parseInt(layer.targetSec.getString());
					var min = parseInt(layer.targetMin.getString());
					layer.targetMilSec.setString(layer.leadingZeros(milsec - 1, 2));
					
					
					
					if(milsec < 0){
						layer.targetSec.setString(layer.leadingZeros(sec - 1, 2));
						layer.targetMilSec.setString(59);
					}
					if(sec < 0){
						layer.targetMin.setString(min-1);
						layer.targetSec.setString(59);
					}
					
					if(min == 0 && sec == 0 && milsec == 0){
						//layer.timeOver();
						clearInterval(layer.timer);
						if( !layer.isTimerOn )
							layer.timeOver();
						
						return false;
					}
				},1000/60,this);
			}
				
    },
    
    leadingZeros:function(n, digits){
    	//console.log(n);
    	var zero = '';
    	n = n.toString();
    	if (n.length < digits) {
    	   for (var i = 0; i < digits - n.length; i++)
    	      zero += '0';
    	}
      return zero + n;
 },
 
 	timeOver:function(){
 		/*this.isTimerOn = false;
		clearInterval(this.timer);*/
		
		//this.removeTimer();
 			this.removeTimer();
		
		
		 this.timeOverLayer = cc.Sprite.create(timeover);
         this.timeOverLayer.setAnchorPoint(cc.p(0.5,0.5));
         this.timeOverLayer.setPosition(this.size.width/2, this.size.height/2);
         this.addChild(this.timeOverLayer);
         
         setTimeout(function(layer){
  		   layer.removeChild(layer.timeOverLayer);
  		  // layer._parent.removeChild(layer);
  		   layer.removeTimer();
  	   	},3000,this);
         
 	},
 	
 	removeTimer:function(){
 		this.isTimerOn = false;
		clearInterval(this.timer);
 		
 		this.removeChild(this.target);
 	},
});


var pointLayer = touchLayer.extend({
	
	point: null,
	gainPoint: 10,
	
	ctor: function() {
        this._super();
       // this.name = name || "";
        this.target = cc.LayerColor.create(new cc.Color4B(), 50, 20);
        this.point = cc.LabelTTF.create(this.gainPoint,TEXT_ARIAL_FONT_NAME,20,cc.size(30, 20));
        this.setTouchEnabled(true);
    },
	    
	init:function () {
		
		this.point.setAnchorPoint(cc.p(0,0));
        this.point.setPosition(0,0);
        this.point.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.point.setColor(p_yellow);
        
        this.target.addChild(this.point);
        this.target.setPosition(540,155);
        this.addChild(this.target);
        return true;
	},
    
	onTouchesBegan: function(touches) {
		
		if(this.testTouch(touches[0])){
			this.point.setString(parseInt(this.point.getString())+5);
		}
    },

	
});
