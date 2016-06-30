package com.netmarble.catchmind.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.ServletContext;
import javax.websocket.CloseReason;
import javax.websocket.DeploymentException;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerContainer;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpointConfig;

import org.apache.tomcat.websocket.WsWebSocketContainer;
import org.apache.tomcat.websocket.server.Constants;
import org.apache.tomcat.websocket.server.WsServerContainer;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;
import com.netmarble.catchmind.model.Message;
import com.netmarble.catchmind.model.MessageDecoder;
import com.netmarble.catchmind.model.MessageEncoder;
import com.netmarble.catchmind.model.RoomBean;
import com.sun.corba.se.spi.orbutil.fsm.Guard.Result;

@ServerEndpoint(
		  value = "/websocket/{nickname}/{where}", 
		  encoders = { MessageEncoder.class }, 
		  decoders = { MessageDecoder.class },
		  configurator =  WebSocketPool.class 
		)

public class WebSocketTest implements Callable<WebSocketTest> {
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ServletContext servletContext;
	
	GamePlay gp = GamePlay.getInstance();
	SessionCheck schk = SessionCheck.getInstance();
	
	// 사용자 접속 정보
	private static Map<String, Session> userMap = new ConcurrentHashMap<String, Session>();
	
	// RoomBean -> 방 설정 정보
	private static Map<Integer, RoomBean> gameRoomMap =  new ConcurrentHashMap<>();
	private static List<String> popUpList = new ArrayList<>();
	
	private static Map<Integer, GameTimer> roomTimer = Collections.synchronizedMap(new LinkedHashMap<Integer, GameTimer>());
	private static int maxRoomNum = 1;
	
	private static Map<String, Bean> waitRoomMap = new ConcurrentHashMap<>();
	
	
	private final static List<String> answerList = Arrays.asList(
			"저자", "곶감", "강변", "깁스", "개근상", 
			"개인택시", "베게", "타조", "예술", "코너킥",
			"금수강산", "잡지", "개인기", "조선족","카카오나무",
			"나막신", "조용필", "문인우", "바둑", "청각",
			"나비", "세븐나이츠", "최지혜", "산더미", "이발소",
			"노래", "레이븐", "손연재", "실내화", "쥐불놀이",
			"정해민","해수욕장","히딩크","정윤지","타악기","한화이글스");
	
	String threadName = "Thread-Name:"+Thread.currentThread().getName();
	
	private static Map<String, Bean> errorUser = new ConcurrentHashMap<>();
	private static Queue<Integer> outRoomNum = new ConcurrentLinkedQueue<>();
	
	private String outUser = null;
	private int outIdx;
	private static Bean outBean = new Bean();
	
	Dao dao = new Dao();
	private ExecutorService executorService;
	//private static final ExecutorService threadPool = Executors.newFixedThreadPool(10);
	
	public WebSocketTest() {
		// TODO Auto-generated constructor stub]
		if( !schk.isAlive() )
			schk.start();
	}
	
		@OnMessage
		synchronized public void onMessage(Message message, Session session)  {
		     
			try{
			
			if(session.isOpen()){
				
				if( message.getClose() != null ){	// clientout! -> Remove from userMap
					
					//System.out.println(session);
			    	userMap.remove(message.getClose());
			    	
			    	//System.out.println(message.toString()+" == message");
			    	
			    	if( message.getContent() != null ){		// 게임방 접속을 끈을때
			    		
			    		int room_idx = Integer.parseInt(message.getContent());
			    		//gp.gameRoomOutUser(room_idx, message);
			    		
			    		outUser = message.getClose();
			    		outIdx = room_idx;
			    		
			    		for(Bean bean: gp.myRoom(room_idx).getUserList()){
			    			if(bean != null){
			    				if(bean.getNickname().equals(outUser)){
				    				outBean = bean;
				    				break;
				    			}
			    			}
			    		}
			    		
			    		myRoomPlay(room_idx).gameRoomOutUser(room_idx, message);
			    		
			    		//System.out.println(outUser+": outuser");
			    	}
			    		
			    		if(waitRoomMap.containsKey(message.getClose())){	// 대기방 접속을 끈을때
				    		String user = message.getClose();
				    		waitRoomMap.remove(user);
				    		
				    		// 대기방 접속을 끈었을 때도 알려줘야 한다.
				    		//System.out.println(user+": --user");
				    		gp.waitRoomOutUser(user);
				    	}
			    	
			    }
			}
			
			
		    
		    if(message.getSubject() != null){
		    	
		    	//System.out.println(threadName);
		    	// send waitRoomMessage
		    	if( message.getSubject().contains("/all") ){
			    	gp.waitRoomMessage(message);
			    }
		    	else if( message.getSubject().contains("/room") ){
		    		int room_idx = Integer.parseInt(message.getSubject().split("#")[1]);
		    		//gp.gameRoomChat(room_idx, message);
		    		myRoomPlay(room_idx).gameRoomChat(room_idx, message);
		    	}
		    	
		    	// paint_start, paint_end, paint_eraser, paint_color, paint_clean
		    	else if( message.getSubject().contains("/paint") ){
		    		int room_idx = Integer.parseInt(message.getSubject().split("#")[1]);
		    		//gp.gameRoomMessage(message, room_idx);
		    		myRoomPlay(room_idx).gameRoomMessage(message, room_idx);
		    	}

		    	else if( message.getSubject().contains("/timer_start") ){
		    		int room_idx = Integer.parseInt(message.getSubject().split("#")[1]);
		    		//gp.roomTimerStart(room_idx, message);
		    		myRoomPlay(room_idx).roomTimerStart(room_idx, message);
		    	}
		    	
		    	else if( message.getSubject().contains("/wait_room") ){
		    		String user = message.getContent();
		    		popUpList.add(user);
		    		if( !waitRoomMap.isEmpty() ){
		    			message.setWaitRoomMap(waitRoomMap);
			    		userMap.get(user).getBasicRemote().sendObject(message);
		    		}
		    		
		    	}
		    	else if( message.getSubject().contains("/popup_out") ){
		    		String user = message.getContent();
		    		if(popUpList.contains(user))
		    			popUpList.remove(user);
		    	}
		    	else if( message.getSubject().contains("/take_part") ){
		    		
		    		String[] content = message.getContent().split("#");
		    		int room_idx = 	Integer.parseInt(content[0]);
		    		String user = content[1];
		    		//gp.gameTakePart(room_idx, user);
		    		myRoomPlay(room_idx).gameTakePart(room_idx, user);
		    	}
		    	else if( message.getSubject().contains("/invite") ){
		    		
		    		//System.out.println(message);
		    		String[] content = message.getContent().split("#");
		    		String toUser = content[0];
		    		//String fromUser = content[1];
		    		//int room_idx = Integer.parseInt(content[2]);
		    		
		    		if(getUserMap().get(toUser) != null)
		    			getUserMap().get(toUser).getBasicRemote().sendObject(message);
		    		
		    	}
		    	else if( message.getSubject().contains("/profile") ){
		    		
		    		String[] content = message.getContent().split("#");
		    		int room_idx = 	Integer.parseInt(content[0]);
		    		String user = content[1];
		    		String from = message.getFrom();
		    		
		    		//gp.sendProfile(room_idx, user, from);
		    		myRoomPlay(room_idx).sendProfile(room_idx, user, from);
		    	}
		    	else if( message.getSubject().contains("/banish") || message.getSubject().contains("/reject") ){
		    		String user = message.getContent();
		    		userMap.get(user).getBasicRemote().sendObject(message);
		    	}
		    	
		    	else if( message.getSubject().contains("/matching") ){
		    		String user = message.getContent();
		    		gp.matching(user);
		    	}
		    	
		    	else if( message.getSubject().contains("@reject") ){
		    		String[] content = message.getContent().split("#");
		    		int room_idx = 	Integer.parseInt(content[0]);
		    		
		    		//gp.rejectMatching(room_idx, message);
		    		myRoomPlay(room_idx).rejectMatching(room_idx, message);
		    	}
		    	else if( message.getSubject().contains("@accept") ){
		    		String[] content = message.getContent().split("#");
		    		int room_idx = 	Integer.parseInt(content[0]);
		    		String user = content[1];
		    		
		    		//gp.acceptMatching(room_idx, user);
		    		myRoomPlay(room_idx).acceptMatching(room_idx, user);
		    	}
		    	else if( message.getSubject().contains("@cancel") ){
		    		String[] content = message.getContent().split("#");
		    		int room_idx = 	Integer.parseInt(content[0]);
		    		String user = content[1];
		    		
		    		//gp.removeUser(room_idx, user);
		    		myRoomPlay(room_idx).removeUser(room_idx, user);
		    	}
		    	else if( message.getSubject().contains("/reconnect_reject") ){
		    		
		    		String user = message.getContent();
		    		if(WebSocketTest.getErrorUser().containsKey(user)){
						WebSocketTest.getErrorUser().remove(user);
					}
		    		
		    	}
		    	
		    }
		    
			}catch(Exception e){
				
				e.printStackTrace();
			}
		  }

		  @OnOpen
		  synchronized public void onOpen(Session session, @PathParam("nickname")String nickname, @PathParam("where")int where) throws IOException, EncodeException, InterruptedException {
			  
			  	userMap.put(nickname, session);
			  	
			  		if(where == 0){		//waiting_room
			  			gp.newWaitRoomUser(nickname);
			  			
			  			if(errorUser.containsKey(nickname)){
			  				gp.reConnectMessage(nickname);
			  			}
			  		}
			  				// 신규접속
			  		else{	//game_room	// 특정사용자가 게임에 진입하였으므로 모든 사용자에게 사실을 알려야한다. // 같은 방에 있다면 그것에 대해서도 알려야함.
			  			gp.newGameRoomUser(where, nickname);
			  			//myRoomPlay(where).newGameRoomUser(where, nickname);
			  		}
			 
		  }
		  
		  @OnClose
		  synchronized public void onClose(Session session, CloseReason reason) { 
			  try{
				 // System.out.println("Connection closed");
				  WebSocketPool.setNowThread(WebSocketPool.getNowThread() - 1);
				
				  
			  }catch(Exception e){
				  e.printStackTrace();
			  }
			  
			  
		  }
		  @OnError
		  public void onError(Session session, Throwable t) throws IOException, EncodeException{
			  //System.out.println(session+"$$");
			  t.printStackTrace();
			  
			  if(outUser != null){
				  outBean.setOutIdx(outIdx);
				  outBean.setRoomCode(gp.myRoom(outIdx).hashCode());
				  errorUser.put(outUser, outBean);
			  }
			  
			  try{
				  //System.out.println("error");
				
			  }catch(Exception e){
				  e.printStackTrace();
			  }
		  }
		  
		  

	  
	public synchronized static int getMaxRoomNum() {
		return maxRoomNum;
	}

	public synchronized static void setMaxRoomNum(int maxRoomNum) {
		WebSocketTest.maxRoomNum = maxRoomNum;
	}




	public static Map<String, Session> getUserMap() {
		return userMap;
	}



	public static void setUserMap(Map<String, Session> userMap) {
		WebSocketTest.userMap = userMap;
	}



	public static Map<Integer, RoomBean> getGameRoomMap() {
		return gameRoomMap;
	}



	public static void setGameRoomMap(Map<Integer, RoomBean> gameRoomMap) {
		WebSocketTest.gameRoomMap = gameRoomMap;
	}



	public static Map<String, Bean> getWaitRoomMap() {
		return waitRoomMap;
	}



	public static void setWaitRoomMap(Map<String, Bean> waitRoomMap) {
		WebSocketTest.waitRoomMap = waitRoomMap;
	}



	public static Map<Integer, GameTimer> getRoomTimer() {
		return roomTimer;
	}

	public static void setRoomTimer(Map<Integer, GameTimer> roomTimer) {
		WebSocketTest.roomTimer = roomTimer;
	}

	public static List<String> getPopUpList() {
		return popUpList;
	}

	public static void setPopUpList(List<String> popUpList) {
		WebSocketTest.popUpList = popUpList;
	}

	public static List<String> getAnswerlist() {
		return answerList;
	}
	

	public static Map<String, Bean> getErrorUser() {
		return errorUser;
	}

	public static void setErrorUser(Map<String, Bean> errorUser) {
		WebSocketTest.errorUser = errorUser;
	}

	public GamePlay myRoomPlay(int where){
		return WebSocketTest.getGameRoomMap().get(where).getGp();
	}

	public static Queue<Integer> getOutRoomNum() {
		return outRoomNum;
	}

	public static void setOutRoomNum(Queue<Integer> outRoomNum) {
		WebSocketTest.outRoomNum = outRoomNum;
	}

	public static Bean getOutBean() {
		return outBean;
	}

	public static void setOutBean(Bean outBean) {
		WebSocketTest.outBean = outBean;
	}

	@Override
	public WebSocketTest call() throws Exception {
		// TODO Auto-generated method stub
		return new WebSocketTest();
	}

	

	

}
