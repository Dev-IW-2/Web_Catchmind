package com.netmarble.catchmind.action;

import java.io.IOException;

import javax.websocket.EncodeException;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Message;

public class SessionCheck extends Thread {

	private static SessionCheck schk = new SessionCheck();
	
	private SessionCheck(){
		
	}
	public static SessionCheck getInstance(){
		return schk;
	}

	private int tempKey;
	private Message mg;
	GamePlay gp = GamePlay.getInstance();
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		//super.run();
		while(true){
			try {
				if( !WebSocketTest.getUserMap().isEmpty() ){
					for(String user : WebSocketTest.getUserMap().keySet()){
						if( !WebSocketTest.getUserMap().get(user).isOpen() ){
							if( !WebSocketTest.getGameRoomMap().isEmpty() ){
								for(int key : WebSocketTest.getGameRoomMap().keySet()){
									if(WebSocketTest.getGameRoomMap().get(key).getOrderList().contains(user)){
										tempKey = key;
										break;
									}
								}
								try{
									if( tempKey != 0){
										Bean tempBean = null;
										for(Bean bean: WebSocketTest.getGameRoomMap().get(tempKey).getUserList()){
											if(bean != null){
												if(bean.getNickname().equals(user)){
													tempBean = bean;
													break;
												}
												
											}
										}
										if(tempBean != null){
											tempBean.setRoomCode(gp.myRoom(tempKey).hashCode());
											tempBean.setOutIdx(tempKey);
											WebSocketTest.getErrorUser().put(user, tempBean);
											//WebSocketTest.getErrorUser().put(user, tempKey);
											mg = new Message();
											mg.setClose(user);
											mg.setContent(String.valueOf(tempKey));
											
											gp.gameRoomOutUser(tempKey, mg);
											
											mg = new Message();
											mg.setSubject("@disconnected");
											mg.setContent(user+"#"+tempKey);
											
											gp.waitRoomMessage(mg);
										}
										
									}
									
								} catch (IOException | EncodeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
							}
							if( WebSocketTest.getWaitRoomMap().containsKey(user) ){
								try {
									WebSocketTest.getWaitRoomMap().remove(user);
									gp.waitRoomOutUser(user);
								} catch (IOException | EncodeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
							}
							WebSocketTest.getUserMap().remove(user);
						}
					}
				}
				
				
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public int getTempKey() {
		return tempKey;
	}
	public void setTempKey(int tempKey) {
		this.tempKey = tempKey;
	}
	public Message getMg() {
		return mg;
	}
	public void setMg(Message mg) {
		this.mg = mg;
	}
	
	
}
