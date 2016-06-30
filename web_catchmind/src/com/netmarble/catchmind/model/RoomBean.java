package com.netmarble.catchmind.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.netmarble.catchmind.action.GamePlay;
import com.netmarble.catchmind.action.GameTimer;

//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.)
@JsonIgnoreProperties({"gp"})
public class RoomBean implements Serializable{
	
	private int idx;
	private String title;
	//private int leader;
	private String leaderName;
	private boolean isPrivate;
	private String password;
	// 인원 제한
	private int limit;
	// 턴 횟수
	private int turnLimit;
	// 현재 턴
	private int nowTurn = 1;
	
	private int examinerIdx = 0;		// 현재 출제자 index
	private int answerIdx = 0;		// 현재 정답 index
	
	// client에 보여질 userList
	private List<Bean> userList = new ArrayList<>();
	private List<String> orderList = new ArrayList<>();
	
	private boolean start = false;
	
	private List<String> answerList = new ArrayList<>();

	private volatile boolean isAnswer = false;
	
	private int avrPoint;
	private boolean isMatch = false;
	private int acceptUser;
	private int allowUser = 3;
	
	
	private transient GamePlay gp = GamePlay.getInstance();
	
	public RoomBean() {
		// TODO Auto-generated constructor stub
	}
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public boolean isStart() {
		return start;
	}
	public void setStart(boolean start) {
		this.start = start;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isPrivate() {
		return isPrivate;
	}
	public void setPrivate(boolean isPrivate) {
		this.isPrivate = isPrivate;
	}
	public int getTurnLimit() {
		return turnLimit;
	}
	public void setTurnLimit(int turnLimit) {
		this.turnLimit = turnLimit;
	}
	
	public String getLeaderName() {
		return leaderName;
	}
	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}
	
	public List<Bean> getUserList() {
		return userList;
	}
	public void setUserList(List<Bean> userList) {
		this.userList = userList;
	}
	public int getExaminerIdx() {
		return examinerIdx;
	}
	public void setExaminerIdx(int examinerIdx) {
		this.examinerIdx = examinerIdx;
	}
	public int getAnswerIdx() {
		return answerIdx;
	}
	public void setAnswerIdx(int answerIdx) {
		this.answerIdx = answerIdx;
	}
	public int getNowTurn() {
		return nowTurn;
	}
	public void setNowTurn(int nowTurn) {
		this.nowTurn = nowTurn;
	}

	public List<String> getOrderList() {
		return orderList;
	}
	public void setOrderList(List<String> orderList) {
		this.orderList = orderList;
	}

	public List<String> getAnswerList() {
		return answerList;
	}

	public void setAnswerList(List<String> answerList) {
		this.answerList = answerList;
	}

	public int getAvrPoint() {
		return avrPoint;
	}

	public void setAvrPoint(int avrPoint) {
		this.avrPoint = avrPoint;
	}

	public boolean isMatch() {
		return isMatch;
	}

	public void setMatch(boolean isMatch) {
		this.isMatch = isMatch;
	}
	

	public int getAcceptUser() {
		return acceptUser;
	}

	public void setAcceptUser(int acceptUser) {
		this.acceptUser = acceptUser;
	}
	
	public int getAllowUser() {
		return allowUser;
	}

	public void setAllowUser(int allowUser) {
		this.allowUser = allowUser;
	}
	

	public GamePlay getGp() {
		return gp;
	}

	public void setGp(GamePlay gp) {
		this.gp = gp;
	}

	public boolean isAnswer() {
		return isAnswer;
	}

	synchronized
	public void setAnswer(boolean isAnswer) {
		this.isAnswer = isAnswer;
	}

	@Override
	public String toString() {
		return "RoomBean [idx=" + idx + ", title=" + title + ", leaderName="
				+ leaderName + ", isPrivate=" + isPrivate + ", password="
				+ password + ", limit=" + limit + ", turnLimit=" + turnLimit
				+ ", nowTurn=" + nowTurn + ", examinerIdx=" + examinerIdx
				+ ", answerIdx=" + answerIdx + ", userList=" + userList
				+ ", orderList=" + orderList + ", start=" + start + "]";
	}

	

	
}
