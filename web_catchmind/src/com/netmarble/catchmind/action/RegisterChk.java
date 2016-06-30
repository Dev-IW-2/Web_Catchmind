package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;

public class RegisterChk implements Action{

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		String uid = request.getParameter("uid");
		String nickname = request.getParameter("nickname");
		String upw = request.getParameter("upw");
		
		Dao dao = new Dao();
		
		if(dao.registerIDChk(uid)){
			
			if(dao.retisterNickChk(nickname)){
				
				bean.setUid(uid);
				bean.setNickname(nickname);
				bean.setUpw(dao.getSHA256(upw));
				
				dao.registerUser(bean);
				
				bean.setXhrRes(3);
				
			}else{
				bean.setXhrRes(2);
			}
		}else{
			bean.setXhrRes(1);
		}
		
		 ActionForward forward = new ActionForward();
		 return forward;
	}

	
}
