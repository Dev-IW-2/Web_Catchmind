package com.netmarble.catchmind.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;

public class RoomInfo implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		if(request.getParameter("room_idx") != null){
			
			int room_idx = Integer.parseInt(request.getParameter("room_idx"));
			List<Bean> userList = WebSocketTest.getGameRoomMap().get(room_idx).getUserList();
			
			request.setAttribute("userList", userList);
			
		}
		
		
		
		ActionForward forward = new ActionForward();
		return forward;
	}
	

}
