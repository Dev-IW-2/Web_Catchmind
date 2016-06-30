/**
 * 
 */

//colorSelected = 'black';
//colorSelected = layer.blackLayer;
var oneColor = touchLayer.extend({
	
	icon: null,
	colorIdx: null,
	
	ctor: function(name, posX, posY) {
        this._super();
        this.name = name || "";
        if(this.name != 'clean')
        	this.target = cc.LayerColor.create(new cc.Color4B(), 30, 30);
        else
        	this.target = cc.LayerColor.create(new cc.Color4B(), 70, 30);
        this.target.setAnchorPoint(cc.p(0,0));
        this.target.setPosition(posX, posY);
        this.addChild(this.target,4);
        this.setTouchEnabled(true);
    },
    
    init:function ( color, colorIdx ) {
       this.icon = cc.Sprite.create(color);
       this.icon.setAnchorPoint(cc.p(0,0));
       this.icon.setPosition(0, 0);
       this.target.addChild(this.icon);

       this.colorIdx = colorIdx || 0;
       
        return true;
	},
	
	    onTouchesBegan:function (touches, event) {
	    	
	    	if(this.myTurn()){
	    		
				 if(this.testTouch(touches[0])){
					 
					 if(this.name == 'clean'){
						 
						 var subject = '/paint_clean#' + room_idx;
						 var json = {
						      		"subject" : subject,
						 };
						    webSocket.send(JSON.stringify(json));
						
					 }
					 else if(this.name == 'eraser'){
	
						 var subject = '/paint_eraser#' + room_idx;
						 var json = {
						      		"subject" : subject,
						 };
						    webSocket.send(JSON.stringify(json));
					 }
					 else{
						 var subject = '/paint_color#' + room_idx;
						 var content = this.colorIdx+'';
						 var json = {
						      		"subject" : subject,
						      		"content" : content,
						 };
						    webSocket.send(JSON.stringify(json));
						 this.changeIcon(this.name+'_s');   
						
					 }
				 }
	    	}
	    },
	    
	    changeIcon:function(color_s){
	    	//console.log(this.icon);
	    	if(colorSelected){
	    		 colorSelected.icon.initWithFile(eval(colorSelected.name));
	    		 colorSelected.icon.setAnchorPoint(cc.p(0,0));
	    		 colorSelected.icon.setPosition(0, 0);
	    	}
	    	colorSelected = this;
	    	//console.log(colorSelected);
	    	this.icon.initWithFile(eval(color_s));
	    	this.icon.setAnchorPoint(cc.p(0,0));
	        this.icon.setPosition(0, 0);
	    },
});


var drawLayer = touchLayer.extend({
	
	ctor: function() {
        this._super();
        this.target = cc.LayerColor.create(new cc.Color4B(),380,310);
        this.target.setAnchorPoint(0,0);
        this.target.setPosition(0, 0);
        this.target.setTouchEnabled(true);
        this.addChild(this.target);
        this.setTouchEnabled(true);
        
    },
	
});


var gameLayer = touchLayer.extend({
	
	isMouseDown:false,
	clickX: null,
	clickY: null,
	clickDrag: null,
	touchStart: 1,
	before: 0,
	targetArr: null,
	
	pressAlt: null,
	pressShift: null,
	
	goHorizontal: null,
	goVertical: null,
	
	drawPoint: null,
	
	ctor: function() {
		
		 this._super();
	     this.target = cc.LayerColor.create(new cc.Color4B(),510,330);
	     this.target.setTouchEnabled(true);
	     this.target.setPosition(380,310);
	     
	     this.addChild(this.target, 2);
	     this.setTouchEnabled(true);
	     this.setKeyboardEnabled(true);
	     
    },

	init:function () {
        
		 this.clickX = new Array();
	     this.clickY = new Array();
	     this.clickDrag = new Array();
	     
	     
	     this.drawPoint = new Array();
	     return true;
	},
	
	onKeyDown:function(keyCode){
		
		//console.log(keyCode);
		 if(keyCode == 18)
			 this.pressAlt = true;
		 else if(keyCode == 16)
			 this.pressShift = true;
		 
		 else{
			 this.pressShift = false;
			 this.pressAlt = false;
		 }
		 
		 return false;
	 },
	 onKeyUp:function(keyCode){
		//console.log('released');
		this.pressAlt = false; 
		this.pressShift = false;
	 },
	 
	 onTouchesBegan:function (touches, event) {
		 
		 if(this.myTurn()){
			 if(this.testTouch(touches[0])){
				 this.isMouseDown = true;
			     if(touches){
			    	 if(this.pressAlt){
			    		 var subject = '/paint_fill#' + room_idx;
			    		 var json = {
						   		"subject" : subject,
						  	};
			    		 webSocket.send(JSON.stringify(json));
			    	 }
			    	 else if(this.pressShift){
			    		 var subject = '/paint_right#' + room_idx;
			    		 var json = {
						   		"subject" : subject,
						  	};
			    		 webSocket.send(JSON.stringify(json));
			    		 
			    		 this.addClick(touches[0].getLocation().x, touches[0].getLocation().y);
			    	 }
			    	 else
			    	   this.addClick(touches[0].getLocation().x, touches[0].getLocation().y);
			    	//   this.reDraw();
			     }
			 }
		 }
	  },
	    onTouchesMoved:function (touches, event) {
	    	//console.log(touches[0].getLocation().x);
        	//console.log(touches[0].getLocation().y);
        	
	    	if(this.myTurn()){
		        if (this.isMouseDown && this.testTouch(touches[0])) {
		            if (touches) {
		            	if(!this.pressAlt)
		            		this.addClick(touches[0].getLocation().x, touches[0].getLocation().y, true);
		            }
		        }else{
		        	this.drawPoint = [];
		        }
	    	}
	    },
	    onTouchesEnded:function (touches, event) {
	    	if(this.myTurn()){
	    		 if(this.testTouch(touches[0])){
	    			 
			    	var subject = '/paint_end#' + room_idx;
			    	var json = {
				      		"subject" : subject,
				    };
				    webSocket.send(JSON.stringify(json));
				    
	    		 }
	    	}
	    },
	    onTouchesCancelled:function (touches, event) {
	    },
	    onDraw:function (sender) {
	        return false;
	    },
	    addClick:function(x, y, dragging){
	    	
	    	
	    	var subject = '/paint_start#' + room_idx;
	    	
	    	var content = p_now+'#'+x+'#'+y;
	    	if( dragging )
	    		content = p_now+'#'+x+'#'+y+'#'+dragging;
    		
			var json = {
		      		"subject" : subject,
		      		"content" : content,
		    };
		    webSocket.send(JSON.stringify(json));
	    	  
	    },
	    reDraw:function(pointX, pointY, dragging){
	    
	    	if( dragging ){
	    		
	    		if(this.pressShift){

	    			if(this.drawPoint.length >= 1){
	    				// 가로방향으로 움직임
	    				if(this.goHorizontal){
	    					this.drawPoint.push(cc.p(pointX, this.drawPoint[0].y));
	    				}
	    				else if(this.goVertical){
	    					this.drawPoint.push(cc.p(this.drawPoint[0].x, pointY));
	    				}
	    				else{
	    					if(Math.abs(this.drawPoint[0].x - pointX) >= Math.abs(this.drawPoint[0].y - pointY))
		    					this.goHorizontal = true;
		    				else	// 세로방향으로 움직임
		    					this.goVertical = true;
	    					
	    					this.drawPoint.push(cc.p(pointX, pointY));
	    				}
	    			}
	    			gameDraw.drawCatmullRom(this.drawPoint, p_size, p_color[p_now]);
			    	
			    	if(this.drawPoint.length >= 3)
			    		this.drawPoint.shift();
	    			
	    		}else{
	    			this.drawPoint.push(cc.p(pointX, pointY));
		    		//var point = [cc.p(this.beforeX_1, this.beforeY_1), cc.p(pointX, pointY)];
			    	gameDraw.drawCatmullRom(this.drawPoint, p_size, p_color[p_now]);
			    	
			    	if(this.drawPoint.length >= 3)
			    		this.drawPoint.shift();
	    		}
	    		
	    	}
	    	else{
	    		var point = [cc.p(pointX-1, pointY), cc.p(pointX, pointY)];
		    	gameDraw.drawCatmullRom(point, p_size, p_color[p_now]);
	    		
		    	this.drawPoint.push(cc.p(pointX, pointY));
	    	}
	    	
	    	//gameDraw.drawQuadBezier(cc.p( startX_1, startY_1 ),cc.p(  startX, startY  ),cc.p(this.clickX[i], this.clickY[i]), 5, p_size, p_color[p_now] );
	    	
	    	
	    },
	 
});