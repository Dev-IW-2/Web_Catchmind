package com.netmarble.catchmind.action;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

import javax.websocket.EncodeException;

import com.netmarble.catchmind.model.Message;

public class GameTimer extends Thread{

	private volatile int min;
	private volatile int sec;
	private volatile int milliSec;
	private boolean timerOn = true;
	private Timer timer;
	private int room_idx;
	
	private volatile int point;
	
	GamePlay gp = GamePlay.getInstance();
	
	private Message mg = new Message();
	
	public GameTimer(int min, int sec, int milliSec, int room_idx, int point) {
		this.min = min;
		this.sec = sec;
		this.milliSec = milliSec;
		this.room_idx = room_idx;
		this.point = point;
	}
	
	
	public int getMin() {
		return min;
	}
	public synchronized void setMin(int min) {
		this.min = min;
	}
	public int getSec() {
		return sec;
	}
	public synchronized void setSec(int sec) {
		this.sec = sec;
	}
	public int getMilliSec() {
		return milliSec;
	}
	public synchronized void setMilliSec(int milliSec) {
		this.milliSec = milliSec;
	}
	
	public boolean isTimerOn() {
		return timerOn;
	}
	public void setTimerOn(boolean timerOn) {
		this.timerOn = timerOn;
	}
	

	public int getRoom_idx() {
		return room_idx;
	}

	public void setRoom_idx(int room_idx) {
		this.room_idx = room_idx;
	}


	public Timer getTimer() {
		return timer;
	}


	public void setTimer(Timer timer) {
		this.timer = timer;
	}
	

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}

	public Message getMg() {
		return mg;
	}

	public void setMg(Message mg) {
		this.mg = mg;
	}


	public void timerStart(){
		
		timer = new Timer();
		TimerTask task = new TimerTask() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				
				
				setMilliSec(getMilliSec()-1);
				if(getMilliSec() < 0){
					setSec(getSec()-1);
					setMilliSec(59);
				}
				if(getSec() < 0){
					setMin(getMin()-1);
					setSec(59);
				}
				
				if(getMin() == 0 && getSec() == 0 && getMilliSec() == 0){
					
					try {
						timer.cancel();
						setTimerOn(false);
						gp.timeOut(room_idx);
						
					} catch (IOException | EncodeException | InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				
				if(getMilliSec() == 0 && getMin() != 2){
					if(getSec() == 30 || getSec() == 0){
						setPoint(getPoint() - 2);
						try {
							mg.setSubject("/server_time");
							mg.setContent(getMin()+"#"+getSec()+"#"+getMilliSec()+"#"+getPoint());
							
							gp.gameRoomMessage(mg, room_idx);
						} catch (IOException | EncodeException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
				
			}
		};
		
		//timer.schedule(task, 1000/60);
		timer.schedule(task, 0, 1000/60);
	}
	
}
