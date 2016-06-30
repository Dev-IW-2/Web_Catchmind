/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var TEXT_INPUT_FONT_NAME = "Thonburi";
var TEXT_INPUT_FONT_SIZE = 15;

var TEXT_ARIAL_FONT_NAME = "Arial";
var TEXT_VERDANA_FONT_NAME = "Verdana-Bold";

var p_size = 5;

var p_black = cc.c4f(8, 8, 8, 250);
var p_red = cc.c4f(155, 0, 0, 250);
var p_blue = cc.c4f(0, 0, 155, 250);
var p_green = cc.c4f(0, 155, 0, 250);
var p_yellow = cc.c4f(155, 155, 0, 250);
var p_white = cc.c4f(244, 244, 244, 250);


var p_pink = cc.c4f(255, 0, 221, 250);
var p_purple = cc.c4f(102, 0, 88, 250);
var p_orange = cc.c4f(255, 94, 0, 250);
var p_green2 = cc.c4f(0, 87, 102, 250);
var p_wine = cc.c4f(128, 65, 217, 250);

var p_color = [p_black, p_red, p_blue, p_green, p_yellow, p_white, p_pink, p_purple, p_orange, p_green2, p_wine];
var p_now = 0;
var colorSelected;

//userLayer.js
var userList = new Array();
var userX = [175, 175, 175, 175, 945, 945, 945, 945];
var userY = [550, 440, 330, 220, 550, 440, 330, 220];

// paintLayer.js
var game_layer;
var gameDraw;
var realDraw;

//timerLayer.js
var timerLabel,pointLabel;

//questionLayer.js
var questionLabel;

//chattingLayer.js
var chatLayer;

// mainLayer
var layer; 

// turnInfo
var nowExaminer;
var nextExaminer;

// answerLayer.js
var answerLabel;

var nowRound;

var gameEnd;

var readyLabel;
var infoLabel;

// etcLayer.js

// entranceLayer.js
var entranceLabel;

// roundLayer.js
var roundLabel;

var touchLayer = cc.LayerColor.extend({
	
	name: null,
	target: null,
	
	testTouch: function(touch) {
        var tpos = touch.getLocation(), tx = tpos.x, ty = tpos.y,
        	origin = this.target.getPosition(), ox = origin.x, oy = origin.y,
           	size = this.target.getContentSize(), w = size.width, h = size.height;
        
        if(tx > ox && tx < ox+w && ty > oy && ty < oy+h)
            return true;
        else 
        	return false;
    },
    
    myTurn: function(){
    	
    	if(nickname == nowExaminer)
    		return true;
    	
    	return false;
    },
    
});



var mainLayer = cc.Layer.extend({
	
    isMouseDown: false,
    helloLabel: null,
    sprite: null,
    colorLayerW: 390,
    colorLayerH: 230,
    
    blackLayer: null,
    redLayer: null,
    blueLayer: null,
    greenLayer: null,
    yellowLayer: null,
    whiteLayer: null,
    pinkLayer: null,
    purpleLayer: null,
    orangeLayer: null,
    green2Layer: null,
    wineLayer: null,
    eraserLayer: null,
    cleanLayer: null,
    toAnswerLayer: null,
    ready: null,
    ready2: null,
    timer: null,
    
    readyL:false,
    startL:false,
    title: function () {
        return "";
    },
    
    init:function () {
        // 1. super init first
        this._super();
        

        var size = cc.Director.getInstance().getWinSize();
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            function () {
            	location.href = 'http://localhost:8080/web_catchmind/Wait_room.bo';
               // history.go(-1);
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(0,0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width - 20, 20);
        
        


        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        this.sprite = cc.Sprite.create(s_game15);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        
        //this.sprite.setScale(0.5);
        //this.sprite.setRotation(180);
        lazyLayer.addChild(this.sprite, 0);
        game_layer = new gameLayer();
        game_layer.init();
        gameDraw = cc.DrawNode.create();
		game_layer.addChild( gameDraw );
        //realDraw = cc.DrawNode.create();
        //game_layer.target.addChild( realDraw );
       // gameDraw = cc.DrawNode.create();
       // gameDraw = cc.DrawNode.create();
		//game_layer.target.addChild( gameDraw );
        this.addChild(game_layer);
        
        this.paintAdd();
        
       /* pointLabel = new pointLayer();
        pointLabel.init();
        this.addChild(pointLabel);*/
       
        chatLayer = new chattingLayer();
        chatLayer.init();
        this.addChild(chatLayer);
        
        var inviteLabel = new etcLayer('invite',size.width/2 - 100, size.height - 80, invite);
        this.addChild(inviteLabel);
        
        /*var optionLabel = new etcLayer('option',size.width/2, size.height - 80, option);
        this.addChild(optionLabel);*/
        
        var exitLabel = new etcLayer('exit',size.width/2, size.height - 80, exit);
        this.addChild(exitLabel);
        
        /*gameEnd = new gameReady();
        gameEnd.init(record);
        gameEnd.setRecord();
        //gameEnd.setEnd(1, winner, 10);
        this.addChild(gameEnd);*/
        
       /* roundLabel = new roundLayer();
        roundLabel.init(round1_s);
        this.addChild(roundLabel);*/
        
        roundLabel = new roundLayer();
        this.addChild(roundLabel);
        
        var explainLabel = new explainLayer();
        explainLabel.init();
        this.addChild(explainLabel);
        	
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        return true;
    },
    
    addOne: function( target ){
    	this.addChild( target );
    },
    
    paintAdd: function(){
    	
    	this.blackLayer = new oneColor("black",this.colorLayerW+8, this.colorLayerH+40);
       	this.blackLayer.init(black_s, 0);
       	this.addChild(this.blackLayer);
       	colorSelected = this.blackLayer;
       	
       	this.redLayer = new oneColor("red",this.colorLayerW+40, this.colorLayerH+40);
       	this.redLayer.init(red, 1);
       	this.addChild(this.redLayer);
       	
       	this.blueLayer = new oneColor("blue",this.colorLayerW+72, this.colorLayerH+40);
       	this.blueLayer.init(blue, 2);
       	this.addChild(this.blueLayer);
       	
       	this.greenLayer = new oneColor("green",this.colorLayerW+104, this.colorLayerH+40);
       	this.greenLayer.init(green, 3);
       	this.addChild(this.greenLayer);
       	
       	this.yellowLayer = new oneColor("yellow",this.colorLayerW+136, this.colorLayerH+40);
       	this.yellowLayer.init(yellow, 4);
       	this.addChild(this.yellowLayer);
       	
       	this.whiteLayer = new oneColor("white",this.colorLayerW+168, this.colorLayerH+40);
       	this.whiteLayer.init(white, 5);
       	this.addChild(this.whiteLayer);
       	
       	this.pinkLayer = new oneColor("pink",this.colorLayerW+23, this.colorLayerH+10);
       	this.pinkLayer.init(pink, 6);
       	this.addChild(this.pinkLayer);
       	
       	this.purpleLayer = new oneColor("purple",this.colorLayerW+55, this.colorLayerH+10);
       	this.purpleLayer.init(purple, 7);
       	this.addChild(this.purpleLayer);
       	
       	this.orangeLayer = new oneColor("orange",this.colorLayerW+87, this.colorLayerH+10);
       	this.orangeLayer.init(orange, 8);
       	this.addChild(this.orangeLayer);
       	
       	this.green2Layer = new oneColor("green2",this.colorLayerW+119, this.colorLayerH+10);
       	this.green2Layer.init(green2, 9);
       	this.addChild(this.green2Layer);
       	
       	this.wineLayer = new oneColor("wine",this.colorLayerW+151, this.colorLayerH+10);
       	this.wineLayer.init(wine, 10);
       	this.addChild(this.wineLayer);
       	
       	this.eraserLayer = new oneColor("eraser",this.colorLayerW+240, this.colorLayerH+40);
       	this.eraserLayer.init(eraser);
       	this.addChild(this.eraserLayer);
       	
       	this.cleanLayer = new oneColor("clean",this.colorLayerW+340, this.colorLayerH+40);
       	this.cleanLayer.init(allclean);
       	this.addChild(this.cleanLayer);
       	
    },
    
   paintRemove: function(){
	   
	   this.removeChild(this.blackLayer);
	   this.removeChild(this.redLayer);
	   this.removeChild(this.blueLayer);
	   this.removeChild(this.greenLayer);
	   this.removeChild(this.yellowLayer);
	   this.removeChild(this.whiteLayer);
	   this.removeChild(this.pinkLayer);
	   this.removeChild(this.purpleLayer);
	   this.removeChild(this.orangeLayer);
	   this.removeChild(this.green2Layer);
	   this.removeChild(this.wineLayer);
	   
	   this.removeChild(this.eraserLayer);
	   this.removeChild(this.cleanLayer);
	   
	   this.blackLayer = null;
	   this.redLayer = null;
	   this.blueLayer = null;
	   this.greenLayer = null;
	   this.yellowLayer = null;
	   this.whiteLayer = null;
	   this.pinkLayer = null;
	   this.purpleLayer = null;
	   this.orangeLayer = null;
	   this.green2Layer = null;
	   this.wineLayer = null;
	   
	   this.eraserLayer = null;
	   this.cleanLayer = null;
   },
   
   gameReady: function(){
	   
	   if( pointLabel ){
		   this.removeChild(pointLabel);
		   pointLabel = null;
	   }
	   if(infoLabel){
		 this.removeChild(infoLabel);
		   //return false;
	   }
	  
	   if(readyLabel)
		   this.removeChild(readyLabel);
	  //console.log(this);
	   
		   readyLabel = new gameReady();
		   readyLabel.init( gameready );
		   this.readyL = true;
	       this.addChild(readyLabel);
	  
       if(this.ready){
    	   clearTimeout(this.ready);
       }
       if(this.ready2){
    	   clearTimeout(this.ready2);
       }
       if(this.timer){
    	   clearTimeout(this.timer);
       }
   
      this.ready = setTimeout(function(layer,readyLabel){
    	  
    	   //layer.removeChild(readyLabel);
    		
    	   if(readyLabel){
        	   readyLabel.target.initWithFile( gameplay );
    	   }
    	   
       layer.ready2 = setTimeout(function(layer, readyLabel){
    		   layer.removeChild(readyLabel);
    		   layer.turnInfo( nowExaminer, nextExaminer);
    		   
    	   },3000,layer,readyLabel);
    	   
       },2000,this,readyLabel);
       
     
       	
   },
   
   turnInfo: function( nowExaminer, nextExaminer ){
	   
	   this.removeChild(readyLabel);
	   
	   infoLabel = new infoLayer();
	   var round = eval('round'+parseInt(nowRound));
	   
       infoLabel.init( round, nowExaminer, nextExaminer );
       this.addChild(infoLabel); 
       
       this.timer = setTimeout(function(layer, infoLabel){
    	   layer.removeChild(infoLabel);
    	   //infoLabel = null;
    	   layer.timerInfo();
       },3000, this, infoLabel);
       
   },
   
   timerInfo: function(){
	   //console.log(nickname);
	   //console.log(nowExaminer);
	   
	   if( !pointLabel ){
			pointLabel = new pointLayer();
	        pointLabel.init();
	        layer.addChild(pointLabel);
	   }
	   
	   if(nickname == nowExaminer){
		   
			var min = 2;
		   	var sec = 00;
		   	var milSec = 00;
		   	var point = pointLabel.gainPoint;
		   	var subject = '/timer_start#'+room_idx;
		   	var content = min + '#' + sec + '#' + milSec + '#' + point;
		   	var json = {
		   			  "subject" : subject,
		   			  "content" : content,
		   };
		   webSocket.send(JSON.stringify(json));
	   }
	   
   },
   
   pointInfo: function(){
	 
	   pointLabel = new pointLayer();
       pointLabel.init();
       this.addChild(pointLabel);
	   
   },
   
   toAnswer:function(examiner, ePoint, answerer, aPoint){
		
	   var size = cc.Director.getInstance().getWinSize();
	   
		this.toAnswerLayer = cc.Sprite.create(gain);
		this.toAnswerLayer.setAnchorPoint(cc.p(0.5,0.5));
		this.toAnswerLayer.setPosition(size.width/2, size.height/2);
       
       var examinerLabel = cc.LabelTTF.create(examiner, TEXT_ARIAL_FONT_NAME, 12);
       var answererLabel = cc.LabelTTF.create(answerer, TEXT_ARIAL_FONT_NAME, 12);
       var ePointLabel = cc.LabelTTF.create(parseInt(ePoint), TEXT_ARIAL_FONT_NAME, 12);
       var aPointLabel = cc.LabelTTF.create(parseInt(aPoint), TEXT_ARIAL_FONT_NAME, 12);
       	
       examinerLabel.setPosition(140,80);
       answererLabel.setPosition(140,50);
       ePointLabel.setPosition(230,80);
       aPointLabel.setPosition(230,50);
       
       examinerLabel.setColor(p_blue);
       answererLabel.setColor(p_blue);
       ePointLabel.setColor(p_blue);
       aPointLabel.setColor(p_blue);
       
       this.toAnswerLayer.addChild(examinerLabel);
       this.toAnswerLayer.addChild(answererLabel);
       this.toAnswerLayer.addChild(ePointLabel);
       this.toAnswerLayer.addChild(aPointLabel);
       
       
       this.addChild(this.toAnswerLayer);
       
       setTimeout(function(layer){
		   layer.removeChild(layer.toAnswerLayer);
	   	},3000,this);
		
	},
	
	stopEvent:function(){
    	
		 if(this.ready)
	    	clearTimeout(this.ready);
	     if(this.ready2)
	    	 clearTimeout(this.ready2);
	     if(this.timer)
	    	 clearTimeout(this.timer);
	     if(infoLabel)
	    	 this.removeChild(infoLabel);
	     if(readyLabel)
	    	 this.removeChild(readyLabel);
	     if(timerLabel){
 			timerLabel.removeTimer();
 		}
	     
    },
    onEnter:function () {
        this._super();
    },
    
    
    
});


var CatchMindScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        layer = new mainLayer();
        layer.init();
        this.addChild(layer);
        
        
        require(["websocket.js"]);
    }
});

