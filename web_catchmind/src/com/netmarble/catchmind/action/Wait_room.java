package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;

public class Wait_room implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		HttpSession session = request.getSession();
		String nickname = (String) session.getAttribute("nickname");
		ActionForward forward = new ActionForward();
		
		
		
		
		if(nickname == null){
			forward.setRedirect(true);
			forward.setPath(session.getServletContext().getRealPath("/"));
		}
		else{
			Dao dao = new Dao();
			dao.getUser(nickname, bean);
			
		}
		
		 return forward;
	}

}
