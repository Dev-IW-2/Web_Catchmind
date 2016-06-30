package com.netmarble.catchmind.model;

import java.util.ArrayList;
import java.util.List;

public class Bean implements Comparable<Bean> {
	
	private int xhrRes;
	
	private int uidx, avatar, point;
	private String uid, nickname, email, upw, rank;
	private String avatarLink, avatarName;
	
	private int answerCount = 0;
	
	// 한 게임에서 얻은 포인트
	private int gainPoint = 0;
	
	private int outIdx;
	private int roomCode;
	
	
	public Bean() {
		// TODO Auto-generated constructor stub
	}
	
	public Bean(String nickname, int outIdx) {
		super();
		this.nickname = nickname;
		this.outIdx = outIdx;
	}
	
	public int getXhrRes() {
		return xhrRes;
	}
	public void setXhrRes(int xhrRes) {
		this.xhrRes = xhrRes;
	}
	
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getUpw() {
		return upw;
	}
	public void setUpw(String upw) {
		this.upw = upw;
	}
	public int getUidx() {
		return uidx;
	}
	public void setUidx(int uidx) {
		this.uidx = uidx;
	}
	public int getAvatar() {
		return avatar;
	}
	public void setAvatar(int avatar) {
		this.avatar = avatar;
	}
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}
	
	public String getRank() {
		return rank;
	}
	public void setRank(String rank) {
		this.rank = rank;
	}
	public int getAnswerCount() {
		return answerCount;
	}
	public void setAnswerCount(int answerCount) {
		this.answerCount = answerCount;
	}
	public int getGainPoint() {
		return gainPoint;
	}
	public void setGainPoint(int gainPoint) {
		this.gainPoint = gainPoint;
	}
	
	
	
	public String getAvatarLink() {
		return avatarLink;
	}
	public void setAvatarLink(String avatarLink) {
		this.avatarLink = avatarLink;
	}
	public String getAvatarName() {
		return avatarName;
	}
	public void setAvatarName(String avatarName) {
		this.avatarName = avatarName;
	}
	
	public int getOutIdx() {
		return outIdx;
	}
	public void setOutIdx(int outIdx) {
		this.outIdx = outIdx;
	}
	

	public int getRoomCode() {
		return roomCode;
	}

	public void setRoomCode(int roomCode) {
		this.roomCode = roomCode;
	}

	@Override
	public String toString() {
		return "Bean [xhrRes=" + xhrRes + ", uidx=" + uidx + ", avatar="
				+ avatar + ", point=" + point + ", uid=" + uid + ", nickname="
				+ nickname + ", email=" + email + ", upw=" + upw + ", rank="
				+ rank + ", gainPoint=" + gainPoint + "]";
	}
	@Override
	public int compareTo(Bean arg0) {
		// TODO Auto-generated method stub
		return getNickname().compareTo(arg0.getNickname());
	}
	
	

}
