package com.netmarble.catchmind.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;

public interface Action {
	
	public ActionForward execute(
		      HttpServletRequest request,HttpServletResponse response, Bean bean)
		  throws Exception;

}
