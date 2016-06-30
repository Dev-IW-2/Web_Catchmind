package com.netmarble.catchmind.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Message {
	
	private String subject;
	private String content;
	private String close;
	private String from;
	private String point;
	
	private RoomBean room;
	private Map<Integer, RoomBean> roomMap = new LinkedHashMap<Integer, RoomBean>();
	private Map<String, Bean> waitRoomMap = new LinkedHashMap<String, Bean>();	
	
	
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Map<Integer, RoomBean> getRoomMap() {
		return roomMap;
	}
	public void setRoomMap(Map<Integer, RoomBean> roomMap) {
		this.roomMap = roomMap;
	}
	
	public String getClose() {
		return close;
	}
	public void setClose(String close) {
		this.close = close;
	}
	
	public Map<String, Bean> getWaitRoomMap() {
		return waitRoomMap;
	}
	public void setWaitRoomMap(Map<String, Bean> waitRoomMap) {
		this.waitRoomMap = waitRoomMap;
	}
	
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	
	public RoomBean getRoom() {
		return room;
	}
	public void setRoom(RoomBean room) {
		this.room = room;
	}
	public String getPoint() {
		return point;
	}
	public void setPoint(String point) {
		this.point = point;
	}
	

	@Override
	public String toString() {
		return "Message [subject=" + subject + ", content=" + content
				+ ", close=" + close + ", from=" + from + ", point=" + point
				+ ", room=" + room + ", roomMap=" + roomMap + ", waitRoomMap="
				+ waitRoomMap + "]";
	}
	
	
	

}
