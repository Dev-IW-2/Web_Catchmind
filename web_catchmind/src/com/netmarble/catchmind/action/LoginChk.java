package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netmarble.catchmind.model.Bean;
import com.netmarble.catchmind.model.Dao;

public class LoginChk implements Action{

	@Override
	public ActionForward execute(HttpServletRequest request,
			HttpServletResponse response, Bean bean) throws Exception {
		// TODO Auto-generated method stub
		Dao dao = new Dao();
		
		String uid = request.getParameter("uid");
		String upw = request.getParameter("upw");
		
		//bean.setUid(uid);
		//bean.setUpw(dao.getSHA256(upw));
		
		
		bean = dao.loginChk(uid, dao.getSHA256(upw), bean);
		if( bean.getXhrRes() == 1 ){
			
			HttpSession session = request.getSession();
			
			session.setAttribute("uidx", bean.getUidx());
			session.setAttribute("uid", bean.getUid());
			session.setAttribute("nickname", bean.getNickname());
			//session.setAttribute("avatar", bean.getAvatar());
			session.setAttribute("avatarName", bean.getAvatarName());
			session.setAttribute("avatarLink", bean.getAvatarLink());
			session.setAttribute("point", bean.getPoint());
			session.setAttribute("rank", bean.getRank());
			//bean.setXhrRes(1);
			
		}
		 ActionForward forward = new ActionForward();
		 return forward;
	}

}
