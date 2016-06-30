package com.netmarble.catchmind.model;

import java.io.StringReader;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class MessageDecoder implements Decoder.Text<Message> {

	@Override
	  public Message decode(String jsonMessage) throws DecodeException {

		
	    JsonObject jsonObject = Json
	        .createReader(new StringReader(jsonMessage)).readObject();
	    Message message = new Message();
	   
	    if(jsonObject.containsKey("subject"))
	    	message.setSubject(jsonObject.getString("subject"));
	    if(jsonObject.containsKey("content"))
	    	message.setContent(jsonObject.getString("content"));
	    if( jsonObject.containsKey("close"))
	    	message.setClose(jsonObject.getString("close"));
	    if(jsonObject.containsKey("from"))
	    	message.setFrom(jsonObject.getString("from"));
	    if(jsonObject.containsKey("point"))
	    	message.setPoint(jsonObject.getString("point"));
	    
	    
	    return message;
	  }

	  @Override
	  public boolean willDecode(String jsonMessage) {
	    try {
	      // Check if incoming message is valid JSON
	    	
	      Json.createReader(new StringReader(jsonMessage)).readObject();
	      return true;
	    } catch (Exception e) {
	    	e.printStackTrace();
	      return false;
	    }
	  }

	  @Override
	  public void init(EndpointConfig ec) {
	  }

	  @Override
	  public void destroy() {
	  }
	
}
