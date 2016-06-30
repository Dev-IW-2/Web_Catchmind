package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;

public class PasswordChk implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		
		int room_idx = Integer.parseInt(request.getParameter("room_idx"));
		String password = request.getParameter("password");
		
		bean.setXhrRes(2);
		if(WebSocketTest.getGameRoomMap().get(room_idx).getPassword().equals(password)){
			bean.setXhrRes(1);
		}
		
		
		ActionForward forward = new ActionForward();
		return forward;
	}

	
}
