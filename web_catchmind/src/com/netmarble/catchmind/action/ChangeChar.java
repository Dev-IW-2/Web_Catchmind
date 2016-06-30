package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;

public class ChangeChar implements Action{

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub

		int avatar_idx = Integer.parseInt(request.getParameter("avatar"));
		String nickname = request.getParameter("nickname");
		
		Dao dao = new Dao();
		dao.updateAvatar(avatar_idx, nickname, bean);
		
		HttpSession session = request.getSession();
		session.setAttribute("avatarName", bean.getAvatarName());
		session.setAttribute("avatarLink", bean.getAvatarLink());
		
		ActionForward forward = new ActionForward();
		return forward;
	}

}
