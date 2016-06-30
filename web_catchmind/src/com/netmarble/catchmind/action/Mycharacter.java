package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;

public class Mycharacter implements Action {

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub

		Dao dao = new Dao();
		request.setAttribute("avatarList", dao.avatarList());
		
		ActionForward forward = new ActionForward();
		return forward;
	}

}
