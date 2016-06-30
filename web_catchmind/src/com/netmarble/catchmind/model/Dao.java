package com.netmarble.catchmind.model;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.binary.Hex;

import com.netmarble.catchmind.action.WebSocketTest;

public class Dao {

	ResultSet rs;
	Statement stmt = null; 
    Connection conn = null; 
    PreparedStatement psmt;
    
    String url = "jdbc:mysql://localhost:3306/catchmind?useUnicode=true&characterEncoding=utf8"; 
    String id = "root"; 
    String pw = "root"; 
    
    //private static Dao instance = new Dao();
    
    /*public static Dao getInstance(){
    	
    }*/
    
	
    public Dao() {
		// TODO Auto-generated constructor stub
		try {
			  Class.forName( "com.mysql.jdbc.Driver" ).newInstance();
	          conn = DriverManager.getConnection( url, id, pw ); 
	          //stmt = conn.createStatement(); 
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//System.out.println(e.printStackTrace());
			e.printStackTrace();
			return;
		}
	    
	}
    
    public boolean registerIDChk( String uid ){
    	
    	closedChk();
    	
    	String sql = "select idx from user where uid = ?";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setString(1, uid);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				close();
				return false;
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			
		}
    	return true;
    }
    
    public boolean retisterNickChk( String nickname ){
    	
    	closedChk();
    	
    	String sql = "select idx from user where nickname = ?";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, nickname);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				close();
				return false;
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			//close();
		}
    	return true;
    	
    }
    
    public void registerUser(Bean bean){
    	
    	closedChk();
    	
    	String sql = "insert into user (uid, upw, nickname) values "
    			+ "(?,?,?)";
    
    	try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setString(1, bean.getUid());
			psmt.setString(2, bean.getUpw());
			psmt.setString(3, bean.getNickname());
			
			psmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	
    }
    
    public Bean loginChk( String uid, String upw, Bean bean ){
    	closedChk();
    	
    	String sql = "select *, rank.rank as my_rank, avatar.name as my_avatar from user inner join rank on user.rank_idx = rank.idx "
    			+ "inner join avatar on user.avatar_idx = avatar.idx where uid = ? && upw = ?";
    		
    	
    		bean.setUid(uid);
    	try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setString(1, uid);
			psmt.setString(2, upw);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				
				bean.setUidx(rs.getInt("idx"));
				//bean.setEmail(rs.getString("email"));
				bean.setNickname(rs.getString("nickname"));
				bean.setPoint(rs.getInt("point"));
				//bean.setAvatar(rs.getInt("avatar"));
				bean.setAvatarName(rs.getString("my_avatar"));
				bean.setAvatarLink(rs.getString("link"));
				bean.setRank(rs.getString("my_rank"));
				bean.setXhrRes(1);
				
				if(WebSocketTest.getUserMap().containsKey(bean.getNickname()))
					bean.setXhrRes(2);
				//return bean;
			}
			else{
				bean.setXhrRes(2);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	return bean;
    }
    
    public Bean getUser( String nickname ){
    	
    	closedChk();
    	
    	Bean bean = new Bean();
    	String sql = "select *, rank.rank as my_rank, avatar.name as my_avatar from user inner join rank on user.rank_idx = rank.idx "
    			+ "inner join avatar on user.avatar_idx = avatar.idx where nickname = ?";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setString(1, nickname);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				bean.setUidx(rs.getInt("idx"));
				bean.setUid(rs.getString("uid"));
				//bean.setEmail(rs.getString("email"));
				bean.setNickname(rs.getString("nickname"));
				bean.setPoint(rs.getInt("point"));
				//bean.setAvatar(rs.getInt("avatar"));
				bean.setAvatarName(rs.getString("my_avatar"));
				bean.setAvatarLink(rs.getString("link"));
				bean.setRank(rs.getString("my_rank"));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	return bean;
    }
    
    public void getUser( String nickname, Bean bean ){
    	
    	closedChk();
    	
    	String sql = "select *, rank.rank as my_rank, avatar.name as my_avatar from user inner join rank on user.rank_idx = rank.idx "
    			+ "inner join avatar on user.avatar_idx = avatar.idx where nickname = ?";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setString(1, nickname);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				bean.setUidx(rs.getInt("idx"));
				bean.setUid(rs.getString("uid"));
				//bean.setEmail(rs.getString("email"));
				bean.setNickname(rs.getString("nickname"));
				bean.setPoint(rs.getInt("point"));
				//bean.setAvatar(rs.getInt("avatar"));
				bean.setAvatarName(rs.getString("my_avatar"));
				bean.setAvatarLink(rs.getString("link"));
				bean.setRank(rs.getString("my_rank"));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	
    }
    
    public boolean updatePoint(String nickname, int getPoint, Bean bean){
    	
    	closedChk();
    	bean.setGainPoint(bean.getGainPoint()+getPoint);
    	
    	String sql = "select point, rank_idx, limit_point from user inner join rank on user.rank_idx = rank.idx where nickname = ?";
    	int point = 0;
    	int limitPoint = 0;
    	int nowRank = 0;
    	boolean levUp = false;
    	try {
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, nickname);
			
			rs = psmt.executeQuery();
			
			if( rs.next() ){
				point = rs.getInt("point");
				nowRank = rs.getInt("rank_idx");
				limitPoint = rs.getInt("limit_point");
			}
			point += getPoint;
			bean.setPoint(point);
			if(point >= limitPoint){
				levUp = true;
				nowRank++;
				sql = "update user set point = ?, rank_idx = ? where nickname = ?";
				
				psmt = conn.prepareStatement(sql);
				psmt.setInt(1, point);
				psmt.setInt(2, nowRank);
				psmt.setString(3, nickname);
				
			}else{
				sql = "update user set point = ? where nickname = ?";
				
				psmt = conn.prepareStatement(sql);
				psmt.setInt(1, point);
				psmt.setString(2, nickname);
			}
			psmt.executeUpdate();
			
				sql = "select rank from rank where idx = ?";
				
				psmt = conn.prepareStatement(sql);
				psmt.setInt(1, nowRank);
				
				rs = psmt.executeQuery();
				
				if( rs.next() ){
					bean.setRank(rs.getString("rank"));
				}
				
				if(levUp)
					return true;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			//close();
		}
    	return false;
    }
    
    public List<Bean> rankList(){
    	
    	closedChk();
    	
    	List<Bean> list = new ArrayList<>();
    	String sql = "select *, rank.rank as my_rank from user inner join rank on user.rank_idx = rank.idx  order by point DESC LIMIT 0, 10";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			
			
			rs = psmt.executeQuery();
			
			while( rs.next() ){
				Bean bean = new Bean();
				bean.setUidx(rs.getInt("idx"));
				bean.setUid(rs.getString("uid"));
				//bean.setEmail(rs.getString("email"));
				bean.setNickname(rs.getString("nickname"));
				bean.setPoint(rs.getInt("point"));
				//bean.setAvatar(rs.getInt("avatar"));
				bean.setRank(rs.getString("my_rank"));
				list.add(bean);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	
		return list;
    }
    
    public List<Bean> avatarList(){
    	
    	closedChk();
    	
    	List<Bean> list = new ArrayList<>();
    	String sql = "select * from avatar ORDER BY idx";
    	
    	try {
			psmt = conn.prepareStatement(sql);
			
			
			rs = psmt.executeQuery();
			
			while( rs.next() ){
				Bean bean = new Bean();
				bean.setAvatar(rs.getInt("idx"));
				bean.setAvatarName(rs.getString("name"));
				bean.setAvatarLink(rs.getString("link"));
				list.add(bean);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close();
		}
    	
		return list;
    }
    
    public void updateAvatar(int idx, String nickname, Bean bean){
    	
    	closedChk();
    	String sql = "update user set avatar_idx = ? where nickname = ?";
    	
    	
		try {
			psmt = conn.prepareStatement(sql);
			
			psmt.setInt(1, idx);
			psmt.setString(2, nickname);
			
			psmt.executeUpdate();
			
			sql = "select * from avatar where idx = ?";
			
			psmt = conn.prepareStatement(sql);
			psmt.setInt(1, idx);
			rs = psmt.executeQuery();
			
			if(rs.next()){
				bean.setAvatarName(rs.getString("name"));
				bean.setAvatarLink(rs.getString("link"));
			}
			
			bean.setXhrRes(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			bean.setXhrRes(2);
		}
    }
    
    public String getSHA256( String source ){
    	
    	String SHA256 = "";
    	
    	try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(source.getBytes());
			byte byteData[] = md.digest();
			SHA256 = Hex.encodeHexString(byteData);
    	} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			SHA256 = null;
		}
    	
		return SHA256;
    }
    
    public void closedChk(){
    	
    	try{
    		if(conn.isClosed()){
        		Class.forName( "com.mysql.jdbc.Driver" ).newInstance();
    	        conn = DriverManager.getConnection( url, id, pw ); 
        	}
    		
    	} catch(SQLException | InstantiationException | IllegalAccessException | ClassNotFoundException e){
    		e.printStackTrace();
			return;
    	}
    	
    	
    }
	
	public void close(){
		
		if( rs != null ){
			try{
				 rs.close(); 
			}catch(SQLException e){
			}
		}
		if( psmt != null ){
			try{
				psmt.close();
			}catch(SQLException e){
			}
		}
		/*if( stmt != null ){
			try{
				stmt.close();
			}catch(SQLException e){
			}
		}*/
		
		if( conn != null ){
			try{
				conn.close();
			}catch(SQLException e){
			}
		}
		
	}
	
}
