package com.netmarble.catchmind.model;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MessageEncoder implements Encoder.Text<Message> {

	 @Override
	  public String encode(Message message) throws EncodeException {
		 
		 
		ObjectMapper om = new ObjectMapper();
		String roomMap = "";
		String waitRoomMap = "";
		String room = "";
		try {
			//message.setRoomMap(WebSocketTest.roomMap);
			if(message.getRoomMap() != null)
				roomMap = om.writeValueAsString(message.getRoomMap());
			if(message.getWaitRoomMap() != null)
				waitRoomMap = om.writeValueAsString(message.getWaitRoomMap());
			if(message.getRoom() != null)
				room = om.writeValueAsString(message.getRoom());
			
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JsonObjectBuilder job = Json.createObjectBuilder();
		
		if(message.getSubject() != null)
			job.add("subject", message.getSubject());
		if(message.getContent() != null)
			job.add("content", message.getContent());
		if(message.getClose() != null)
			job.add("close", message.getClose());
		if(message.getFrom() != null)
			job.add("from", message.getFrom());
		if(message.getPoint() != null)
			job.add("point", message.getPoint());
		if(! message.getRoomMap().isEmpty())
			job.add("room", roomMap);
		if(! message.getWaitRoomMap().isEmpty())
			job.add("waitroom", waitRoomMap);
		if( message.getRoom() != null )
			job.add("gameroom", room);
		
		//job.build();
		
		JsonObject jsonObject = job.build();
		/*
	    JsonObject jsonObject = Json.createObjectBuilder().build();
	    
	    
	        .add("subject", message.getSubject())
	        .add("content", message.getContent())
	        .add("close", message.getClose())
	        .add("room",roomMap)
	        .build();*/
	    
	    return jsonObject.toString();
	  }
 
	  @Override
	  public void init(EndpointConfig ec) {
	  }

	  @Override
	  public void destroy() {
	  }
	  
	  
}
