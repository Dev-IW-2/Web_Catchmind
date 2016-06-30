package com.netmarble.catchmind.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netmarble.catchmind.model.Bean;

/**
 * Servlet implementation class M_Controller
 */
@WebServlet("/M_Controller")
public class M_Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public M_Controller() {
        super();
        // TODO Auto-generated constructor stub
    }
    protected void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   	 
   	 // TODO Auto-generated method stub
     request.setCharacterEncoding("utf-8");
       
     String requestURI = request.getRequestURI();
     String contextPath = request.getContextPath();
     List<String> nonClass = new ArrayList<>();
     nonClass.add("Joinform");
     nonClass.add("Create_room");
     nonClass.add("Notice");
     nonClass.add("PasswordChkForm");
     nonClass.add("MatchingOk");
     nonClass.add("Reconnect");
     
     List<String> xhrClass = new ArrayList<>();
     xhrClass.add("RegisterChk");
     xhrClass.add("LoginChk");
     xhrClass.add("Go_room");
     xhrClass.add("PasswordChk");
     xhrClass.add("ChangeChar");
     
     String command = requestURI.substring(contextPath.length()+1, requestURI.indexOf(".bo"));

     Action action = null;
     ActionForward forward = null;
     
     Bean bean = new Bean();
     
     if( !nonClass.contains(command) ){
     
       try{
         action = (Action)Class.forName("com.netmarble.catchmind.action."+command).newInstance();
         forward = action.execute(request, response, bean);
       }catch(Exception e){
         e.printStackTrace();
       }
     }else{
       forward = new ActionForward();
     }
     
     String view = command + ".jsp";
     
     if( xhrClass.contains(command) ){
    	 view = "xhrRes.jsp";
     }
     
     request.setAttribute("bean", bean);
     
     if( forward != null ){
       if( forward.isRedirect() ){
    	   response.sendRedirect(forward.getPath());
       }else{
    	   RequestDispatcher dispatcher = request.getRequestDispatcher(view);
    	   dispatcher.forward(request, response);
       }
     }
     
   } 
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doProcess(request,response);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doProcess(request,response);
	}

}
