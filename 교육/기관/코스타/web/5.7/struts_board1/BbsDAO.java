package bbs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import page.Page;

public class BbsDAO {
	private static BbsDAO instance = new BbsDAO();

	private BbsDAO() {}

	public static BbsDAO getInstance() {
		return instance;
	}

	public Connection getConnection() throws Exception {
		Context ctx = new InitialContext();		
		DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/oracle");

		return ds.getConnection();		
	}
	
	public boolean write(BbsArticle info) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();
			sql = "INSERT INTO bbs VALUES(bbs_autonum.NEXTVAL, ?,?,?,SYSDATE,?,?,?,?,?,0,0)";
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, info.getSubject());
			pstmt.setString(2, info.getWriter());
			pstmt.setString(3, info.getPassword());
			pstmt.setString(4, info.getHtml());
			pstmt.setString(5, info.getContents());
			pstmt.setString(6, info.getEmail());
			pstmt.setString(7, info.getHomepage());
			pstmt.setString(8, info.getIp());
			
			if( pstmt.executeUpdate() == 1 )
				result = true;
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); } catch(Exception e) {}
			if( con != null ) try { con.close(); } catch(Exception e) {}
		}
		
		return result;
	}
	
	public boolean writeComment(Comment info) {		
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();
			sql = "INSERT INTO bbs_comment VALUES(bbs_comment_autonum.NEXTVAL, ?,?,?,?,?, SYSDATE)";
			
			pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, info.getRnum());
			pstmt.setString(2, info.getWriter());
			pstmt.setString(3, info.getContents());
			pstmt.setString(4, info.getPassword());
			pstmt.setString(5, info.getIp());
			
			if( pstmt.executeUpdate() == 1 )
				result = true;
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); } catch(Exception e) {}
			if( con != null ) try { con.close(); } catch(Exception e) {}
		}
		
		return result;
	}

	public boolean modify(BbsArticle info) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();
			sql = "UPDATE bbs SET subject=?, contents=?, email=?, homepage=?, html=? WHERE num=? AND password=?";
			pstmt = con.prepareStatement(sql);
			pstmt.setString(1, info.getSubject());
			pstmt.setString(2, info.getContents());
			pstmt.setString(3, info.getEmail());
			pstmt.setString(4, info.getHomepage());
			pstmt.setString(5, info.getHtml());			
			pstmt.setInt(6, info.getNum());
			pstmt.setString(7, info.getPassword());
			
			if( pstmt.executeUpdate() == 1 )
				result = true;
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); } catch(Exception e) {}
			if( con != null ) try { con.close(); } catch(Exception e) {}
		}
		
		return result;
	}
	
	
	public ArrayList<BbsArticle> getList(Page page) {
		Connection con = null;
		PreparedStatement pstmt = null;
		PreparedStatement pstmtCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		StringBuilder sql = new StringBuilder();
		String whereSql = null;
		ArrayList<BbsArticle> list = new ArrayList<BbsArticle>();
		
		int total = 0;
		int absolutePage = 0;
		
		try {
			con = getConnection();
			
			whereSql = makeListSearchQuery(page);
			
			sql.append("SELECT COUNT(*) FROM bbs b ");
			sql.append( whereSql );
			pstmtCount = con.prepareStatement(sql.toString());
			
			rsCount = pstmtCount.executeQuery();
			
			if( !rsCount.next() )	return list;
			
			total = rsCount.getInt(1);
			if( total%page.getPageSize() == 0 )
				page.setPageCount( total/page.getPageSize() );
			else
				page.setPageCount( total/page.getPageSize()+1 );
			
			if( page.getPageNum() > 0 )				
				absolutePage = (page.getPageNum()-1)*page.getPageSize()+1;

			sql.setLength(0);
			sql.append("SELECT num, subject, writer, password, idate, html, contents, email, homepage, ip, rcount, vcount, (SELECT COUNT(*) FROM bbs_comment WHERE rnum=b.num) FROM bbs b ").append( whereSql ).append(" ORDER BY num DESC");			
			pstmt = con.prepareStatement(sql.toString(), ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
			rs = pstmt.executeQuery();
			
			if( rs.next() ) {				
				rs.absolute(absolutePage);				
				for(int i = 0; i < page.getPageSize(); i++)
				{
					BbsArticle info = new BbsArticle();
					
					info.setNum( rs.getInt(1) );
					info.setSubject( rs.getString(2) );
					info.setWriter( rs.getString(3) );
					info.setPassword( rs.getString(4) );
					info.setIdate( rs.getTimestamp(5) );
					info.setHtml( rs.getString(6) );
					info.setContents( rs.getString(7) );
					info.setEmail( rs.getString(8) );
					info.setHomepage( rs.getString(9) );
					info.setIp( rs.getString(10) );
					info.setRcount( rs.getInt(11) );
					info.setVcount( rs.getInt(12) );
					info.setComment_count( rs.getInt(13) );
					
					list.add( info );
					
					if( rs.isLast() )	break;
					else 				rs.next();
				}
			}
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( rs != null ) try { rs.close(); } catch(Exception e) {}
			if( rsCount != null ) try { rsCount.close(); } catch(Exception e) {}
			if( pstmt != null ) try { pstmt.close(); } catch(Exception e) {}
			if( pstmtCount != null ) try { pstmtCount.close(); } catch(Exception e) {}
			if( con != null ) try { con.close(); } catch(Exception e) {}
		}
		
		return list;
	}
	
	public String makeListSearchQuery(Page page) {
		StringBuilder sql = new StringBuilder();
		String[] keys = {"subject", "writer"};
		
		HashMap<String, String> map = page.getKeys();
		
		if( map.size() > 1 )	// action 제외
		{
			boolean orFlag = false;
			
			sql.append(" WHERE ");
			
			for(int i = 0; i < keys.length; i++) {
				if( map.containsKey(keys[i]) ) {
					if( orFlag )	sql.append(" OR ");
					
					sql.append("b.")
						.append( keys[i] )
						.append(" LIKE '%")						
						.append( map.get(keys[i]) )
						.append("%'");
					
					orFlag = true;
				}
			}
		}
		return sql.toString();
	}
	
	
	public BbsArticle get(int no, boolean hit) {
		return get(no, null, hit);
	}
	
	public BbsArticle get(int no, String password, boolean hit) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		StringBuilder sql = new StringBuilder();
		BbsArticle info = null;
		
		try {
			con = getConnection();
			
			if( hit && !addHit(con, no) )	return info;
			
			sql.append("SELECT * FROM bbs WHERE num=?");
			if( password != null )	sql.append(" AND password=?");
			
			pstmt = con.prepareStatement(sql.toString());			
			pstmt.setInt(1, no);
			
			if( password != null )	pstmt.setString(2, password);
			
			rs = pstmt.executeQuery();
			
			if( rs.next() ) {
				info = new BbsArticle();
				
				info.setNum( rs.getInt(1) );
				info.setSubject( rs.getString(2) );
				info.setWriter( rs.getString(3) );
				info.setPassword( rs.getString(4) );
				info.setIdate( rs.getTimestamp(5) );
				info.setHtml( rs.getString(6) );
				info.setContents( rs.getString(7) );
				info.setEmail( rs.getString(8) );
				info.setHomepage( rs.getString(9) );
				info.setIp( rs.getString(10) );
				info.setRcount( rs.getInt(11) );
				info.setVcount( rs.getInt(12) );
			}
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( rs != null ) try { rs.close(); }catch(Exception e) {}		
			if( pstmt != null ) try { pstmt.close(); }catch(Exception e) {}		
			if( con != null ) try { con.close(); }catch(Exception e) {}		
		}
		
		return info;
	}
	
	
	public ArrayList<Comment> getCommentList(int num) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = null;
		
		ArrayList<Comment> list = new ArrayList<Comment>();
		try {
			con = getConnection();
			sql = "SELECT * FROM bbs_comment WHERE rnum=? ORDER BY num ASC";
			pstmt = con.prepareStatement(sql);			
			pstmt.setInt(1, num);
			
			rs = pstmt.executeQuery();
			
			while( rs.next() ) {
				Comment info = new Comment();
				
				info.setNum( rs.getInt(1) );
				info.setRnum( rs.getInt(2) );
				info.setWriter( rs.getString(3) );
				info.setContents( rs.getString(4) );
				info.setPassword( rs.getString(5) );
				info.setIp( rs.getString(6) );
				info.setIdate( rs.getTimestamp(7) );
				
				list.add( info );
			}
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( rs != null ) try { rs.close(); }catch(Exception e) {}
			if( pstmt != null ) try { pstmt.close(); }catch(Exception e) {}
			if( con != null ) try { con.close(); }catch(Exception e) {}
		}
		
		return list;
	}
	
	
	public boolean addHit(Connection con, int num) {
		PreparedStatement pstmt = null;
		String sql = null;
		boolean result = false;
		
		try {
			sql = "UPDATE bbs SET rcount=rcount+1 WHERE num=?";
			pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, num);
			
			if( pstmt.executeUpdate() == 1) 
				result = true;
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try {pstmt.close();}catch(Exception e) {}
		}
		
		return result;
	}
	
	
	public boolean delete(int num, String password) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();			
			sql = "DELETE FROM bbs WHERE num=? AND password=?";
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, num);
			pstmt.setString(2, password);
			
			if( pstmt.executeUpdate() == 1 ) 
				result = true;
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); }catch(Exception e) {}
			if( con != null ) try { con.close(); }catch(Exception e) {}
		}
		
		return result;
	}
	
	
	public boolean deleteComment(int num, String password) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();			
			sql = "DELETE FROM bbs_comment WHERE num=? AND password=?";			
			pstmt = con.prepareStatement(sql);
			
			pstmt.setInt(1, num);
			pstmt.setString(2, password);
			
			if( pstmt.executeUpdate() == 1 ) 
				result = true;
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); }catch(Exception e) {}
			if( con != null ) try { con.close(); }catch(Exception e) {}
		}
		
		return result;
	}
	
	public boolean recommend(int num) {
		Connection con = null;
		PreparedStatement pstmt = null;
		String sql = null;
		
		boolean result = false;
		
		try {
			con = getConnection();
			sql = "UPDATE bbs SET vcount=vcount+1 WHERE num=?";
			pstmt = con.prepareStatement(sql);
			pstmt.setInt(1, num);
			
			if( pstmt.executeUpdate() == 1 )	result = true;
			
		}catch(Exception e) {
			System.out.println(e);
		}finally {
			if( pstmt != null ) try { pstmt.close(); }catch(Exception e){}
			if( con != null ) try { con.close(); }catch(Exception e){}
		}
		
		return result;
	}
}




