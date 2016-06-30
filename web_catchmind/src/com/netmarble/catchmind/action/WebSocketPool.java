package com.netmarble.catchmind.action;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.websocket.server.ServerEndpointConfig;

import com.sun.corba.se.spi.orbutil.fsm.Guard.Result;


public class WebSocketPool extends ServerEndpointConfig.Configurator  {

	
	private final int threadCnt = 100;
	private ExecutorService executor = Executors.newFixedThreadPool(threadCnt);
	private Future<WebSocketTest> future;
	private final WebSocketTest ws = new WebSocketTest();
	
	private static List<Future<WebSocketTest>> list = new ArrayList<Future<WebSocketTest>>();
	
	private static List<WebSocketTest> exe = new ArrayList<>();
	
	private static volatile int nowThread = 0;
	
	
	public WebSocketPool() throws Exception {
		// TODO Auto-generated constructor stub
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public <T> T getEndpointInstance(Class<T> endpointClass) throws InstantiationException {
		// TODO Auto-generated method stub
		if(WebSocketTest.class.equals(endpointClass)){
			//System.out.println(nowThread);
			//System.out.println(exe.get(nowThread).threadName);
			//return (T) exe.get(nowThread++);
			try {
				/*if(exe.size() < threadCnt)
					exe.add(new WebSocketTest());
				if(nowThread >= threadCnt)
					nowThread = 0;
				return (T) executor.getClass();*/
				
				Callable<WebSocketTest> callable = ws;
				future = executor.submit(callable);

				return (T) future.get();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		 else
			throw new InstantiationException();
		return null;
	}

	public static int getNowThread() {
		return nowThread;
	}

	public static void setNowThread(int nowThread) {
		WebSocketPool.nowThread = nowThread;
	}
	
	

}
