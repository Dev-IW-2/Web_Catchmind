package com.netmarble.catchmind.action;

import java.util.Collections;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.RoomBean;

public class Go_room implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		if( request.getParameter("where") != null ){
			
			int roomNum = Integer.parseInt(request.getParameter("where"));
			
			if(WebSocketTest.getGameRoomMap().get(roomNum) != null){
				if (WebSocketTest.getGameRoomMap().get(roomNum).getOrderList().size() >= 
						WebSocketTest.getGameRoomMap().get(roomNum).getLimit()) {
					
					bean.setXhrRes(2);
					
					ActionForward forward = new ActionForward();
					return forward;
				}
			}
			
		}
		
		HttpSession session = request.getSession();
		RoomBean rb = new RoomBean();
		
		
		bean.setUidx((int)session.getAttribute("uidx"));
		bean.setUid((String)session.getAttribute("uid"));
		bean.setNickname((String)session.getAttribute("nickname"));
		//bean.setAvatar((int)session.getAttribute("avatar"));
		bean.setAvatarName((String)session.getAttribute("avatarName"));
		bean.setAvatarLink((String)session.getAttribute("avatarLink"));
		bean.setPoint((int)session.getAttribute("point"));
		bean.setRank((String)session.getAttribute("rank"));

		bean.setXhrRes(1);
		
		
		// CreateRoom
		if(request.getParameter("is_create") != null){
			
			if( Integer.parseInt(request.getParameter("is_create"))	== 1){
				
				String title = request.getParameter("title");
				
				boolean isPrivate = false;
				if(Integer.parseInt(request.getParameter("is_private")) == 1)
					isPrivate = true;
				
				String password = "";
				if(isPrivate)
					password = request.getParameter("password");
				
				int limit = Integer.parseInt(request.getParameter("limit"));
				int turnLimit = Integer.parseInt(request.getParameter("turn_limit"));
						
				int leader = (int)session.getAttribute("uidx");
				String leaderName = (String)session.getAttribute("nickname");
				
				int room_idx;
				
				if(WebSocketTest.getOutRoomNum().isEmpty()){
					room_idx = WebSocketTest.getMaxRoomNum();
					WebSocketTest.setMaxRoomNum(room_idx+1);
				}
					
				else{
					room_idx = WebSocketTest.getOutRoomNum().poll();
				}
				
				rb.setIdx(room_idx);
				rb.setTitle(title);
				rb.setPrivate(isPrivate);
				rb.setPassword(password);
				rb.setLimit(limit);
				rb.setTurnLimit(turnLimit);
				rb.setLeaderName(leaderName);
				rb.getOrderList().add(bean.getNickname());
				
				session.setAttribute("room_idx", room_idx);
				
				//GamePlay.makeAnswerList(WebSocketTest.getMaxRoomNum());
				
				rb.getUserList().add(bean);
				WebSocketTest.getGameRoomMap().put(room_idx, rb);
				
				
				//WebSocketTest.setMaxRoomNum(WebSocketTest.getMaxRoomNum()+1);
				
				
			}
		}
		//rb.getUserList().add(leaderName);
		
		// joinroom
		if( request.getParameter("where") != null ){
			
			int roomNum = Integer.parseInt(request.getParameter("where"));
			session.setAttribute("room_idx", request.getParameter("where"));
			
			if(request.getParameter("reconnect") != null){
				
				if(WebSocketTest.getErrorUser().containsKey(bean.getNickname())){
					bean = WebSocketTest.getErrorUser().get(bean.getNickname());
					WebSocketTest.getErrorUser().remove(bean.getNickname());
				}
				
			}
			
			if(request.getParameter("auto") == null){
				WebSocketTest.getGameRoomMap().get(roomNum).getOrderList().add(bean.getNickname());
				
				int i = 0;
				boolean noNull = true;
				
				for(Iterator<Bean> it = WebSocketTest.getGameRoomMap().get(roomNum).getUserList().iterator(); it.hasNext();){
					if(it.next() == null){
						WebSocketTest.getGameRoomMap().get(roomNum).getUserList().set(i, bean);
						noNull = false;
						break;
					}
					i++;
				}
				
				if(noNull){
					WebSocketTest.getGameRoomMap().get(roomNum).getUserList().add(bean);
				}
			}
			
			
		}
		
		ActionForward forward = new ActionForward();
		return forward;
	}

}
