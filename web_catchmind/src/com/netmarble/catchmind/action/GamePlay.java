package com.netmarble.catchmind.action;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.websocket.EncodeException;
import javax.websocket.Session;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;
import com.netmarble.catchmind.model.Message;
import com.netmarble.catchmind.model.RoomBean;

public class GamePlay{

	private volatile static GamePlay uniqueInstance;
	private Message mg;
	Dao dao = new Dao();
	
	private GamePlay(){
	
	}
	
	public static GamePlay getInstance(){
		
		if(uniqueInstance == null){
			synchronized (GamePlay.class) {
				if(uniqueInstance == null)
					uniqueInstance = new GamePlay();
			}
		}
		
		return uniqueInstance;
	}
	
	synchronized 
	public void makeAnswerList(int room_idx){
		
		List<String> roomAnswerList = myRoom(room_idx).getAnswerList();
		if(roomAnswerList.isEmpty()){
			
			Random ra = new Random();
			int size = WebSocketTest.getAnswerlist().size();
			while(roomAnswerList.size() < size){
			
				int rn = ra.nextInt(size);
				String answer = WebSocketTest.getAnswerlist().get(rn);
				if(roomAnswerList.contains(answer))
					continue;
				roomAnswerList.add(answer);
			}
		}
		
	}
	
	public void removeUser( int room_idx, String user ){
		
		// ## remove User ##
		int i = 0;
		int setIdx = 0;
		for(Iterator<Bean> it = myRoom(room_idx).getUserList().iterator(); it.hasNext();){
			Bean bb = it.next();
			if(bb != null){
				if(bb.getNickname().equals(user)){
					setIdx = i;
					break;
    			}
			}	
				i++;
		}
			myRoom(room_idx).getUserList().set(setIdx, null);
			myRoom(room_idx).getOrderList().remove(user);
			
			if(myRoom(room_idx).getOrderList().isEmpty())
				WebSocketTest.getGameRoomMap().remove(room_idx);
	}
	
	public RoomBean myRoom(int where){

		
		return WebSocketTest.getGameRoomMap().get(where);
	}

	
	public void waitRoomOutUser(String user) throws IOException, EncodeException{
		
		/*if(WebSocketTest.getWaitRoomMap().containsKey(user)){	// 대기방 접속을 끈을때
			WebSocketTest.getWaitRoomMap().remove(user);
    		// 대기방 접속을 끈었을 때도 알려줘야 한다.
    	}*/
		mg = new Message();
		mg.setSubject("/wait_out");
		mg.setContent(user);
		
		if( !WebSocketTest.getPopUpList().isEmpty() )
			popUpMessage(mg);
		if( !WebSocketTest.getWaitRoomMap().isEmpty() )
			waitRoomMessage(mg);
		
	}
	public void gameRoomOutUser(int room_idx, Message message) throws IOException, EncodeException{
		
		String user = message.getClose();
		boolean isExaminer = false;
		//  나온 사람이 현재 출제자이면
		int nowExaminerIdx = myRoom(room_idx).getExaminerIdx();
		
		
		if(nowExaminerIdx == 1 && remainUserChk(room_idx) == 1)
			nowExaminerIdx = 0; myRoom(room_idx).setExaminerIdx(0);
		
		if(myRoom(room_idx).getOrderList().get(nowExaminerIdx) != null){
			if(myRoom(room_idx).getOrderList().get(nowExaminerIdx).equals(user)){
				isExaminer = true;
    			if(myRoom(room_idx) != null)
	    			roomTimerStop(room_idx);
			}
		}
		// ## remove User ##
		removeUser(room_idx, user);
		
		// change roomLeader
		if(remainUserChk(room_idx) > 0){
			if(myRoom(room_idx).getLeaderName().equals(user)){
				String newLeader = myRoom(room_idx).getOrderList().get(0);
				myRoom(room_idx).setLeaderName(newLeader);
				
				mg = new Message();
				mg.setSubject("/leader_out");
				mg.setContent(room_idx + "#" + newLeader);
				waitRoomMessage(mg);
				gameRoomMessage(mg, room_idx);
				
			}
		}
		
		// 1명만 남게 됬을 때 -> 모든 기능 살린다.
		if(remainUserChk(room_idx) == 1){
			roomTimerStop(room_idx);
			myRoom(room_idx).setStart(false);
			
			mg = new Message();
			mg.setSubject("/wait");
			gameRoomMessage(mg, room_idx);
		}
		
		if(remainUserChk(room_idx) == 0){
			WebSocketTest.getGameRoomMap().remove(room_idx);
			
			WebSocketTest.getOutRoomNum().add(room_idx);
			
			if(WebSocketTest.getErrorUser().containsKey(room_idx))
				WebSocketTest.getErrorUser().remove(room_idx);
			
			mg = new Message();
			mg.setSubject("/remove");
			mg.setContent(String.valueOf(room_idx));
			waitRoomMessage(mg);
			
		}
		gameRoomMessage(message, room_idx);
		
		if(myRoom(room_idx) != null){
			if (isExaminer) {
    			if(remainUserChk(room_idx) > 1){
    				sendTurn(room_idx);
    			}
			}
		}
	}
	
	public void timeOut(int room_idx) throws IOException, EncodeException, InterruptedException{
		
		mg = new Message();
		mg.setSubject("/timeover");
		gameRoomMessage(mg, room_idx);
		
		Thread.sleep(3000);
		
		nextTurn(room_idx);
	}
	
	
	public void gameRoomChat(int room_idx, Message message) throws IOException, EncodeException, InterruptedException{
		
		String answer =	roomAnswerList(room_idx).get(myRoom(room_idx).getAnswerIdx());
		
		
		// correct answer!!
		if(message.getContent().equals(answer) && message.getPoint() != null){
			
			if(!myRoom(room_idx).isAnswer()){
				myRoom(room_idx).setAnswer(true);
				// db insert point answerer
				roomTimerStop(room_idx);
				
				int roomExaminerIdx = myRoom(room_idx).getExaminerIdx();
				
				String roomExaminer = 
						myRoom(room_idx).getOrderList().get(roomExaminerIdx);
				String answerer = message.getFrom();
				int point = Integer.parseInt(message.getPoint());	
				
				mg = new Message();
				mg.setSubject("/answer");
				mg.setContent(roomExaminer+"#"+answerer+"#"+message.getContent());
				gameRoomMessage(mg, room_idx);
				
				// Memory, DB point update
				for(Bean bean : myRoom(room_idx).getUserList()){
					if(bean != null){
						
						Map<String, Message> sendTo = new LinkedHashMap<>();
						// examiner
						if(bean.getNickname().equals(roomExaminer)){
							if(dao.updatePoint(roomExaminer, point+1, bean)){
								mg = new Message();
								mg.setSubject("/level_up");
								mg.setContent(roomExaminer+"#"+bean.getRank());
								sendTo.put(roomExaminer, mg);
							}
						}
						
						// answerer
						if(bean.getNickname().equals(answerer)){
							bean.setAnswerCount(bean.getAnswerCount() + 1);
							if(dao.updatePoint(answerer, point, bean)){
								mg = new Message();
								mg.setSubject("/level_up");
								mg.setContent(answerer+"#"+bean.getRank());
								sendTo.put(answerer, mg);
							}
						}
						if( !sendTo.isEmpty() ){
							Thread.sleep(2000);
							for(String to : sendTo.keySet())
								gameRoomMessage(sendTo.get(to), room_idx);
								//WebSocketTest.getUserMap().get(to).getBasicRemote().sendObject(sendTo.get(to));
						}
					}
				}
				Thread.sleep(5000);
				nextTurn(room_idx);
				myRoom(room_idx).setAnswer(false);
			}
			
			
		}
		else
			gameRoomMessage(message, room_idx);
	}
	
	public void newWaitRoomUser(String user) throws IOException, EncodeException{
		
		WebSocketTest.getWaitRoomMap().put(user, dao.getUser(user));
		mg = new Message();
		
		// 대기실 사용자들에게 전송
		if( !WebSocketTest.getWaitRoomMap().isEmpty() ){
			mg.setWaitRoomMap(WebSocketTest.getWaitRoomMap());
			if( !WebSocketTest.getGameRoomMap().isEmpty() ){
				mg.setRoomMap(WebSocketTest.getGameRoomMap());
			}
			waitRoomMessage(mg);
		  
		  	if( !WebSocketTest.getPopUpList().isEmpty() ){
		  		mg.setSubject("/wait_room");
		  		popUpMessage(mg);
			}
		}
	}
	
	public void sendProfile(int room_idx, String user, String from) throws IOException, EncodeException{
		
		mg = new Message();
		mg.setSubject("/profile");
		String content = null;
		for(Bean bean : myRoom(room_idx).getUserList()){
			if(bean!=null){
				if(bean.getNickname().equals(user)){
					content = bean.getNickname()+"#"+bean.getUid()+"#"+bean.getRank()+"#"+bean.getPoint();
				}
			}
		}
		
		if(content != null){
			if(myRoom(room_idx).getLeaderName().equals(from)){
				content += "#"+myRoom(room_idx).getLeaderName();
			}
			mg.setContent(content);
			WebSocketTest.getUserMap().get(from).getBasicRemote().sendObject(mg);
		}
	}

	public void newGameRoomUser(int room_idx, String user) throws IOException, EncodeException, InterruptedException{
		
		makeAnswerList(room_idx);

		mg = new Message();
  		  mg.setSubject("/go room");
  		  mg.setFrom(user);
  		  mg.setContent(String.valueOf(room_idx));
		  //mg.setRoomMap(WebSocketTest.getGameRoomMap());
		  mg.setRoom(WebSocketTest.getGameRoomMap().get(room_idx));
  		  
		  waitRoomMessage(mg);
		  gameRoomMessage(mg, room_idx);
		  
		  // ## gamestart ##
		  if ( !isTimerOn(room_idx) ){
			  if(remainUserChk(room_idx) >= 3){
				  int room_size = myRoom(room_idx).getOrderList().size();
				  if(myRoom(room_idx).getOrderList().get(room_size-1).equals(user)){
					  	myRoom(room_idx).setStart(true);
						 Thread.sleep(500);
						 sendTurn(room_idx);
				  }
				 /* myRoom(room_idx).setStart(true);
					// Thread.sleep(1500);
					 sendTurn(room_idx);*/
			  }
		  }
		
	}
	
	public void gameTakePart(int room_idx, String user) throws IOException, EncodeException{
		
		if(myRoom(room_idx).isStart()){
			  GameTimer gt = WebSocketTest.getRoomTimer().get(room_idx);
			  if(gt != null){
				  int min = gt.getMin();
				  int sec = gt.getSec()-1;
				  int millisec = gt.getMilliSec();
				  int point = gt.getPoint();
				  
				  int nowTurn = myRoom(room_idx).getNowTurn();
				  
				  mg = new Message();
				  mg.setSubject("/take_part");
				  mg.setContent(min+"#"+sec+"#"+millisec+"#"+point+"#"+nowTurn);
				  mg.setFrom(myRoom(room_idx).getOrderList().get(myRoom(room_idx).getExaminerIdx()));
				  if(WebSocketTest.getUserMap().get(user).isOpen())
					  WebSocketTest.getUserMap().get(user).getBasicRemote().sendObject(mg);
			  }
			
		  }
	}
	
	public void roomTimerStart(int room_idx, Message message) throws IOException, EncodeException{
		
		if( myRoom(room_idx).isStart() ){
			
			gameRoomMessage(message, room_idx);
			
			String[] time = message.getContent().split("#");
    		int min = Integer.parseInt(time[0]);
    		int sec = Integer.parseInt(time[1]);
    		int milliSec = Integer.parseInt(time[2]);
    		int point = Integer.parseInt(time[3]);
			
			if( !WebSocketTest.getRoomTimer().containsKey(room_idx)){
	    		sec++;
    			
	    		GameTimer gt = new GameTimer(min, sec, milliSec, room_idx, point);
    			//gt.start();
    			gt.timerStart();
    			WebSocketTest.getRoomTimer().put(room_idx, gt);
    			
    		}else{
	    		
	    		WebSocketTest.getRoomTimer().get(room_idx).setMin(min);
	    		WebSocketTest.getRoomTimer().get(room_idx).setSec(sec);
	    		WebSocketTest.getRoomTimer().get(room_idx).setMilliSec(milliSec);
	    		
	    		WebSocketTest.getRoomTimer().get(room_idx).timerStart();
	    		
    		}
		}
	}
	
	public void matching(String user) throws IOException, EncodeException{
		
		Bean bean = WebSocketTest.getWaitRoomMap().get(user);
		int point = bean.getPoint();
		
		if(WebSocketTest.getGameRoomMap().isEmpty()){
			makeAutoRoom(user);
		}
		
		else{
			boolean isMatch = false;
			
			for( int key :WebSocketTest.getGameRoomMap().keySet() ){
				
				RoomBean rb = WebSocketTest.getGameRoomMap().get(key);
				
				if(rb.isMatch()){
					if( !rb.isStart() ){
						if( isMatching(point, rb.getAvrPoint()) ){
							
							isMatch = true;
							rb.getUserList().add(bean);
							rb.getOrderList().add(user);
							rb.setAvrPoint((rb.getAvrPoint()+point)/2);
							
							
							if(rb.getOrderList().size() >= rb.getAllowUser()){
								// start
								mg = new Message();
								mg.setSubject("/matched");
								mg.setContent(String.valueOf(key));
								
								for ( String sendTo : rb.getOrderList() ){
									WebSocketTest.getUserMap().get(sendTo).getBasicRemote().sendObject(mg);
								}
							}
							else{
								mg = new Message();
								mg.setSubject("/matching");
								mg.setContent(String.valueOf(key));
								
								WebSocketTest.getUserMap().get(user).getBasicRemote().sendObject(mg);
							}
							break;
						}
						else{
							continue;
						}
					}
				}
				
			}
			
			if( !isMatch ){
				makeAutoRoom(user);
			}
			
		}
		
	}
	
	public void makeAutoRoom(String user) throws IOException, EncodeException{
		
		Bean bean = WebSocketTest.getWaitRoomMap().get(user);
		int point = bean.getPoint();
		RoomBean rb = new RoomBean();
		
		
		rb.getUserList().add(bean);
		rb.getOrderList().add(user);
		rb.setLeaderName(user);
		rb.setAvrPoint(point);
		rb.setTurnLimit(8);
		rb.setLimit(8);
		rb.setMatch(true);
		
		int room_idx = WebSocketTest.getMaxRoomNum();
		rb.setIdx(room_idx);
		
		WebSocketTest.getGameRoomMap().put(room_idx, rb);
		WebSocketTest.setMaxRoomNum(room_idx+1);
		
		makeAnswerList(room_idx);
		
		mg = new Message();
		mg.setSubject("/matching");
		mg.setContent(String.valueOf(room_idx));
		
		WebSocketTest.getUserMap().get(user).getBasicRemote().sendObject(mg);
	}
	
	public boolean isMatching(int point, int avrPoint){
		
		if(avrPoint - 20 <= point && point <= avrPoint + 20)
			return true;
		
		return false;
	}
	
	public void rejectMatching(int room_idx, Message message) throws IOException, EncodeException{
		
		if(myRoom(room_idx) != null)
			gameRoomMessage(message, room_idx);
		
		WebSocketTest.getGameRoomMap().remove(room_idx);
	}
	
	public void acceptMatching(int room_idx, String user) throws IOException, EncodeException{
		
		if(myRoom(room_idx) != null){
			myRoom(room_idx).setAcceptUser(myRoom(room_idx).getAcceptUser() + 1);
		}
		
		if(myRoom(room_idx).getOrderList().size() == myRoom(room_idx).getAcceptUser()){
			mg = new Message();
			mg.setSubject("@go_autoroom");
			mg.setContent(String.valueOf(room_idx));
			
			gameRoomMessage(mg, room_idx);
		}
	}
	
	public void reConnectMessage(String user) throws IOException, EncodeException{
		
		if( !WebSocketTest.getErrorUser().isEmpty() ){
			int room_idx = WebSocketTest.getErrorUser().get(user).getOutIdx();
			
			if( WebSocketTest.getGameRoomMap().containsKey(room_idx) ){
				if(WebSocketTest.getGameRoomMap().get(room_idx).hashCode() == WebSocketTest.getErrorUser().get(user).getRoomCode()){
					if(myRoom(room_idx).getLimit() > myRoom(room_idx).getOrderList().size()){
						
						
						
						mg = new Message();
						mg.setSubject("/reconnect");
						mg.setContent(String.valueOf(room_idx));
						
						if(WebSocketTest.getUserMap().get(user).isOpen())
							WebSocketTest.getUserMap().get(user).getBasicRemote().sendObject(mg);
					}
				}
			}
		}
	}

	synchronized public void waitRoomMessage(Message message) throws IOException, EncodeException {
		if (!WebSocketTest.getWaitRoomMap().isEmpty()) {
			for (String nickname : WebSocketTest.getWaitRoomMap().keySet()) {
				if (WebSocketTest.getUserMap().get(nickname) != null) {
					if (WebSocketTest.getUserMap().get(nickname).isOpen())
						WebSocketTest.getUserMap().get(nickname)
								.getBasicRemote().sendObject(message);
				}
			}
		}
	}
	 
	synchronized public void gameRoomMessage(Message message, int room_idx) throws IOException, EncodeException {
		RoomBean rb = null;
		// isAutoRoom?
		if (!WebSocketTest.getGameRoomMap().isEmpty())
			rb = WebSocketTest.getGameRoomMap().get(room_idx);

		if (rb != null) {
			if (!rb.getUserList().isEmpty()) {
				for (Bean bean : rb.getUserList()) {
					if (bean != null) {
						Session nickName = WebSocketTest.getUserMap().get(bean.getNickname());
						if (nickName != null) {
							if (nickName.isOpen()) {
								nickName.getBasicRemote().sendObject(message);
							}

						}
					}
				}
			}
		}

	}
	
	 synchronized public void popUpMessage(Message message) throws IOException, EncodeException{
		  //Message response = new Message();
		  if( !WebSocketTest.getPopUpList().isEmpty()){
			  for(String nickname : WebSocketTest.getPopUpList()){
				  WebSocketTest.getUserMap().get(nickname).getBasicRemote().sendObject(message);
			  }
		  }
	  }
	 
	
	 public int userListSize( List<Bean> userList ){
		  int length = userList.size();
		  for(Bean bb : userList){
			  if(bb == null)
				  length--;
		  }
		  return length;
	  }
	 
	public int remainUserChk(int room_idx){
		
		if(myRoom(room_idx) != null)
			return myRoom(room_idx).getOrderList().size();
		
		return 0;
	}
	
	public void roomTimerStop(int room_idx){
		
		if(WebSocketTest.getRoomTimer().containsKey(room_idx)){
			WebSocketTest.getRoomTimer().get(room_idx).getTimer().cancel();
			WebSocketTest.getRoomTimer().remove(room_idx);
		}
	}
	
	public boolean isTimerOn(int room_idx){
		
		if( WebSocketTest.getRoomTimer().get(room_idx) == null){
			return false;
		}
			
		else{
			if( !WebSocketTest.getRoomTimer().get(room_idx).isTimerOn() ){
				return false;
			}
				
		}
		return true;
	}
	
	public List<String> roomAnswerList(int room_idx){
		return myRoom(room_idx).getAnswerList();
	}
	
	public void bubbleSort(List<Bean> list){
		
		int i,j;
		Bean temp;

		for(i = list.size()-1; i > 0; i--){
			for(j = 1; j <= i; j++){
				if(list.get(j-1) != null && list.get(j) != null){
					if(list.get(j-1).getGainPoint() < list.get(j).getGainPoint()){
						temp = list.get(j-1);
						list.set(j-1, list.get(j));
						list.set(j, temp);
					}
					else if(list.get(j-1).getGainPoint() == list.get(j).getGainPoint()){
						
						if(list.get(j-1).getAnswerCount() < list.get(j).getAnswerCount()){
							temp = list.get(j-1);
							list.set(j-1, list.get(j));
							list.set(j, temp);
						}
					}
				}
			}
		}
	}
	
	public void sendTurn(int room_idx) throws IOException, EncodeException{
		  
		  int roomAnswerIdx = myRoom(room_idx).getAnswerIdx();
		  int roomExaminerIdx = myRoom(room_idx).getExaminerIdx();
		  
		  String roomAnswer = roomAnswerList(room_idx).get(roomAnswerIdx);
		  String roomExaminer = 
				  myRoom(room_idx).getOrderList().get(roomExaminerIdx);
		  
		  String nextRoomExaminer = myRoom(room_idx).getOrderList().get(0);
		  
		  if(roomExaminerIdx + 1 < remainUserChk(room_idx))
			  nextRoomExaminer = myRoom(room_idx).getOrderList().get(roomExaminerIdx + 1);
		  
		  mg = new Message();
		  mg.setSubject("/turninfo");
		  int nowTurn = myRoom(room_idx).getNowTurn();
		  mg.setContent(roomExaminer + "#" + nextRoomExaminer + "#" + nowTurn);
		  gameRoomMessage(mg, room_idx);
		  
		  mg.setSubject("/examiner");
		  mg.setContent(roomAnswer);
		  
		  if(WebSocketTest.getUserMap().get(roomExaminer) != null){
			  if(WebSocketTest.getUserMap().get(roomExaminer).isOpen())
				  WebSocketTest.getUserMap().get(roomExaminer).getBasicRemote().sendObject(mg);
		  }
		  
	  }
	
	 public void nextTurn(int room_idx) throws IOException, EncodeException{
		  
		  if(myRoom(room_idx).getNowTurn() + 1 > myRoom(room_idx).getTurnLimit()){
			  
			  // 최고점 자를 찾아야 함
			 // 
			  Bean maxBean = null;
			  String maxUser = null;
			  int maxPoint = 0;
			  
			  // 한 게임에서 얻은 포인트 -> 정답 수 -> 순서 순으로 1위 판별
			  bubbleSort(myRoom(room_idx).getUserList());
			  
			  for(Bean bean : myRoom(room_idx).getUserList()){
				  if(bean != null){
					  maxUser = bean.getNickname();
					  maxBean = bean;
					  break;
				  }
			  }
			  if(maxBean != null){
				  
				  if(dao.updatePoint(maxBean.getNickname(), 10, maxBean)){
					  mg = new Message();
					  mg.setSubject("/level_up");
					  mg.setContent(maxBean.getNickname()+"#"+maxBean.getRank());
					  
					  WebSocketTest.getUserMap().get(maxBean.getNickname()).getBasicRemote().sendObject(mg);
				  }
				  Message mg = new Message();
				  mg.setSubject("/game_end");
				  //mg.setContent(maxBean.getNickname());
				  mg.setRoom(myRoom(room_idx));
				 
				  mg.setContent(maxUser);
				  gameRoomMessage(mg, room_idx);
				  
			  }else{
				  Message mg = new Message();
				  mg.setSubject("/game_end");
				  gameRoomMessage(mg, room_idx);
				  
			  }
		  
		  }
		  
		  else{
			  boolean finalTurn = false;
			  
			  if(myRoom(room_idx).getNowTurn() + 1 == myRoom(room_idx).getTurnLimit())
				  finalTurn = true;
			  
			  int roomAnswerIdx = myRoom(room_idx).getAnswerIdx();
			  int roomExaminerIdx = myRoom(room_idx).getExaminerIdx();
			  
			  // ## 턴 전환 됨 ## //
			  myRoom(room_idx).setExaminerIdx(0);
			  
			  if(roomExaminerIdx + 1 < remainUserChk(room_idx)){
				  for(int i = roomExaminerIdx + 1; i < remainUserChk(room_idx); i++){
					  if(myRoom(room_idx).getOrderList().get(i) != null){
						  myRoom(room_idx).setExaminerIdx(i);
						  break;
					  }
				  }
				  
			  }
			  
			  if(roomAnswerIdx + 1 < roomAnswerList(room_idx).size())
				  myRoom(room_idx).setAnswerIdx(roomAnswerIdx + 1);
			  else
				  myRoom(room_idx).setAnswerIdx(0);
			  // ## ## //
			  
			  int newRoomAnswerIdx = myRoom(room_idx).getAnswerIdx();
			  int newRoomExaminerIdx = myRoom(room_idx).getExaminerIdx();
			  String newRoomAnswer = roomAnswerList(room_idx).get(newRoomAnswerIdx);
			  String newRoomExaminer = myRoom(room_idx).getOrderList().get(newRoomExaminerIdx);
			  
			  int nextRoomExaminerIdx = 0;
			  
			  if(newRoomExaminerIdx + 1 < remainUserChk(room_idx)){
				  for(int i = newRoomExaminerIdx + 1; i < remainUserChk(room_idx); i++){
					  if(myRoom(room_idx).getOrderList().get(i) != null){
						  nextRoomExaminerIdx = i;
						  break;
					  }
				  }
				 
			  }
			  String nextRoomExaminer = myRoom(room_idx).getOrderList().get(nextRoomExaminerIdx);
			  
			  int nextTurn = myRoom(room_idx).getNowTurn() + 1;
			  mg = new Message();
				  
			  mg.setSubject("/turninfo");
			  mg.setContent(newRoomExaminer + "#" + nextRoomExaminer + "#" + nextTurn);
			  
			  if(finalTurn)
				  mg.setContent(newRoomExaminer + "#" + nextTurn);
			  
			  gameRoomMessage(mg, room_idx);
			 
			  mg.setSubject("/examiner");
			  mg.setContent(newRoomAnswer);
			  WebSocketTest.getUserMap().get(newRoomExaminer).getBasicRemote().sendObject(mg);
			  
			  myRoom(room_idx).setNowTurn(nextTurn);
			  
		  }
		  
		  
	  }
}
