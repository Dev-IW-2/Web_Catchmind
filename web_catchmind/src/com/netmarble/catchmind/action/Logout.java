package com.netmarble.catchmind.action;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netmarble.catchmind.model.Bean;

public class Logout implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		
		
		HttpSession session = request.getSession();
		session.invalidate();
		
		
		ActionForward forward = new ActionForward();
		forward.setRedirect(true);
		ServletContext context = request.getSession().getServletContext();
		forward.setPath(context.getContextPath());
		return forward;
	}

}
