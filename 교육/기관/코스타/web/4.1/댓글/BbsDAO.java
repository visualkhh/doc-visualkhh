package myclasses;
import java.sql.*;
import java.util.*;
import java.text.*;

public class BbsDAO {
	private Connection con;	
	public BbsDAO(Connection con) {
		this.con = con;
	}
	
	protected void checkReplies(ArticleHeader h, String rnum) 
		throws SQLException {
		String sql = "select num, subject, writer, idate, rcount " +
			" from bbs_reply where rnum=" + rnum;
		PreparedStatement stmt = con.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		while(rs.next()) {
			String num = rs.getString("num");
			String subject = rs.getString("subject");
			String writer = rs.getString("writer");
			String idate = rs.getString("idate");
			String rcount = rs.getString("rcount");
			ArticleHeader header = new ArticleHeader(num, subject, 
			                       writer, idate, rcount);
			checkReplies(header, "-" + num);
			h.addReply(header);
		}
		stmt.close();
	}
	
	public List<ArticleHeader> getHeader(int page, int numPerPage) 
		throws SQLException {
		List<ArticleHeader> articles = new LinkedList<ArticleHeader>();
		int start = (page-1) * numPerPage;
		int end = page * numPerPage;
		String sql = "select num, subject, writer, idate, " + 
		             " rcount from bbs where num > " + start + 
					 " and num <= " + end + " order by num desc";
		PreparedStatement stmt = con.prepareStatement(sql);
		ResultSet rs = stmt.executeQuery();
		while(rs.next()) {
			String num = rs.getString("num");
			String subject = rs.getString("subject");
			String writer = rs.getString("writer");
			String idate = rs.getString("idate");
			String rcount = rs.getString("rcount");
			ArticleHeader header = new ArticleHeader(num, subject, 
			                       writer, idate, rcount);
			checkReplies(header, num);
			articles.add(header);
		}
		stmt.close();
		return articles;
	}

	public BbsArticle getArticle(String num) throws SQLException {
		return getArticle(num, "bbs");
	}
	
	public BbsArticle getReplyArticle(String num) throws SQLException {
		return getArticle(num, "bbs_reply");
	}
	
	public BbsArticle getArticle(String num, String db) 
		throws SQLException {
		String sql = "select num, subject, writer, password, idate," + 
		             "html, contents, email, homepage, ip, rcount," +
					 "vcount from " + db + " where num =" + num;
		Statement stmt = con.createStatement( 
		       ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_UPDATABLE );
		ResultSet rs = stmt.executeQuery(sql);
		BbsArticle ar = null;
		while(rs.next()) {
			ar = new BbsArticle();
			ar.setNum(rs.getString("num"));
			ar.setSubject(rs.getString("subject"));
			ar.setWriter(rs.getString("writer"));
			ar.setPassword(rs.getString("password"));
			ar.setIdate(rs.getString("idate"));
			String c = rs.getString("html");
			ar.setHtml(false);
			if(c.equalsIgnoreCase("y")){
				ar.setHtml(true);
			}
			ar.setContents(rs.getString("contents"));
			ar.setEmail(rs.getString("email"));
			ar.setHomepage(rs.getString("homepage"));
			ar.setIp(rs.getString("ip"));
			long rcount = rs.getLong("rcount");
			rs.updateLong("rcount", rcount+1);
			rs.updateRow(); 
			ar.setRcount(String.valueOf(rcount+1));
			ar.setVcount(rs.getString("vcount"));
		}
		rs.close();
		
		if(db.endsWith("reply")) {
			sql="select count(num) from bbs_reply where rnum= -" + num;
		} else {
			sql="select count(num) from bbs_reply where rnum= " + num;			
		}
		rs = stmt.executeQuery(sql);
		while(rs.next()) {
			ar.setSize(rs.getInt(1));
		}
		rs.close();	
		
		if(db.endsWith("reply")) {
		sql = "select num, writer, idate, contents, password, ip " +
		      " from bbs_comment where rnum = -" + num;
		} else {
		sql = "select num, writer, idate, contents, password, ip " +
		      " from bbs_comment where rnum = " + num;			
		}
		rs = stmt.executeQuery(sql);
		while(rs.next()) {
			Comment ba = new Comment();
			ba.setNum(rs.getString("num"));
			ba.setRnum(num);
			ba.setWriter(rs.getString("writer"));
			ba.setIdate(rs.getString("idate"));
			ba.setContents(rs.getString("contents"));
			ba.setIp(rs.getString("password"));
			ba.setIp(rs.getString("ip"));
			ar.addComment(ba);
		}
		rs.close();		
		stmt.close();
		return ar;
	}
	
	public void insert(BbsForm form) throws SQLException {
		insert(form, false);
	}
	
	public void insertReply(BbsForm form)  throws SQLException {
		insert(form, true);
	}
			
	public void insert(BbsForm form, boolean isReply) 
		throws SQLException {
		String sql = null;
		if(isReply) {
			sql="insert into bbs_reply (subject, writer, password, " + 
		        " idate, html, contents, email, homepage, ip, rnum)" + 
				" values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";	 			
		} else {
			sql="insert into bbs (subject, writer, password, " + 
		        " idate, html, contents, email, homepage, ip)" + 
				" values ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";	 
		}
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, form.getSubject());
		if(form.getUid() != null) {
			String usersql = "select name, password, email," + 
			       "homepage from users where uid = ?";
			PreparedStatement ust = con.prepareStatement(usersql);
			ust.setString(1, form.getUid());
			ResultSet rs = ust.executeQuery();
			String name, password, email, homepage;
			name = password = email = homepage = null;
			while(rs.next()) {
				name = rs.getString("name");
				password = rs.getString("password");
				email = rs.getString("email");
				homepage = rs.getString("homepage");
			}
			stmt.setString(2, name);
			stmt.setString(3, password);
			stmt.setString(7, email);
			stmt.setString(8, homepage);	
		} else {		
			stmt.setString(2, form.getWriter());
			stmt.setString(3, form.getPassword());
			stmt.setString(7, form.getEmail());
			stmt.setString(8, form.getHomepage());	
		}
		java.util.Date now = new java.util.Date();
		SimpleDateFormat f=new SimpleDateFormat("yy/MM/dd-HH:mm");
		stmt.setString(4, f.format(now));
		String h = form.getHtml() ? "Y" : "N";
		stmt.setString(5, h);		
		String contents = form.getContents();
		if(!form.getHtml()) {
			contents = contents.replaceAll("<", "&lt;");
		}
		stmt.setString(6, contents);
		stmt.setString(9, form.getIp());
		if(isReply) {
			stmt.setString(10, form.getRnum());
		}
		stmt.executeUpdate();
		stmt.close();
	}
	
	public void update(BbsForm form, String num) 
		throws SQLException {
		update(form, num, "bbs");
	}
	
	public void updateReply(BbsForm form, String num) 
		throws SQLException {
		update(form, num, "bbs_reply");	
	}
	
	public void update(BbsForm form, String num, String db) 
		throws SQLException {
		String sql = "update " + db + " set subject=?, " + 
		"writer=?, password=?, contents=?, email=?, " + 
		"homepage=?, html=? where num = " + num;	
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, form.getSubject());
		if(form.getUid() != null) {
			String usersql = "select name, password, email, " + 
			               "homepage from users where uid = ?";
			PreparedStatement ust = con.prepareStatement(usersql);
			ust.setString(1, form.getUid());
			ResultSet rs = ust.executeQuery();
			String name, password, email, homepage;
			name = password = email = homepage = null;
			while(rs.next()) {
				name = rs.getString("name");
				password = rs.getString("password");
				email = rs.getString("email");
				homepage = rs.getString("homepage");
			}
			stmt.setString(2, name);
			stmt.setString(3, password);
			stmt.setString(5, email);
			stmt.setString(6, homepage);	
		} else {		
			stmt.setString(2, form.getWriter());
			stmt.setString(3, form.getPassword());
			stmt.setString(5, form.getEmail());
			stmt.setString(6, form.getHomepage());	
		}
		String h = form.getHtml() ? "Y" : "N";
		stmt.setString(7, h);		
		String contents = form.getContents();
		if(!form.getHtml()) {
			contents = contents.replaceAll("<", "&lt;");
		}
		stmt.setString(4, contents);
		stmt.executeUpdate();
		stmt.close();
	}
	
	public void delete(PasswordForm form) throws SQLException {
		delete(form, "bbs", false);
	}

	public void deleteReply(PasswordForm form) 
		throws SQLException {
		delete(form, "bbs_reply", true);
	}
	
	public void delete(PasswordForm form, String db, boolean isReply) 
		throws SQLException {
		String sql = "delete from " + db + " where num = ? "; 
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, form.getNum());
		stmt.executeUpdate();
		if(isReply) {
			sql = "delete from bbs_comment where rnum = -? ";
		} else {
			sql = "delete from bbs_comment where rnum = ? ";
		}
		stmt.setString(1, form.getNum());
		stmt.executeUpdate();
		stmt.close();
	}

	public void insertComment(CommentForm form)  throws SQLException {
		String sql = "insert into bbs_comment (rnum, writer, " + 
		             "idate, contents, password, ip)" + 
					 " values ( ?, ?, ?, ?, ?, ?)";	
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, form.getRnum());
		stmt.setString(2, form.getWriter());
		java.util.Date now = new java.util.Date();
		SimpleDateFormat f = new SimpleDateFormat("yy/MM/dd :HH:mm");
		stmt.setString(3, f.format(now));
		stmt.setString(4, form.getContents());
		stmt.setString(5, form.getPassword());		
		stmt.setString(6, form.getIp());		
		stmt.executeUpdate();
		stmt.close();
	}
	
	public boolean deleteComment(PasswordForm form)  
		throws SQLException {
		String sql = "delete from bbs_comment where " + 
		             " num = ? and password = ? ";
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, form.getNum());
		stmt.setString(2, form.getPassword());		
		int n = stmt.executeUpdate();
		stmt.close();
		if (n > 0)
			return true;
		else
			return false;
	}
	
	public void vote(String num) throws SQLException {
		vote(num, "bbs");
	}

	public void voteReply(String num) throws SQLException {
		vote(num, "bbs_reply");
	}
	
	public void vote(String num, String db) throws SQLException {
		String sql = "select num, vcount from " + db + 
		             " where num = " + num;
		Statement stmt = con.createStatement(
		ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_UPDATABLE );
		ResultSet rs = stmt.executeQuery(sql);
		while(rs.next()) {
			long vcount = rs.getLong("vcount");
			rs.updateLong("vcount", vcount+1);
			rs.updateRow(); 
			break;
		}
		rs.close();
		stmt.close();
	}
	
	public boolean checkPassword(PasswordForm form) 
		throws SQLException {
			return checkPassword(form, "bbs");
	}
	
	public boolean checkReplyPassword(PasswordForm form) 
		throws SQLException {
			return checkPassword(form, "bbs_reply");
	}	
			
	public boolean checkPassword(PasswordForm form, String db) 
		throws SQLException {
		String sql = "select password from " + db + " where " + 
		             " num = ? "; 
		PreparedStatement stmt = con.prepareStatement(sql);	
		stmt.setString(1, form.getNum());
		ResultSet rs = stmt.executeQuery();
		boolean value = false;
		while(rs.next()) {
			String p = rs.getString("password");
			if(form.getPassword() != null && 
				form.getPassword().equals(p))
				value = true;
			break;
		}
		return value;
	}
	
	public int getPageCount(int numPerPage) 
		throws SQLException {
		String sql = "select max(num) from bbs";
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(sql);
		int max = 0;
		while(rs.next()) {
			max = rs.getInt(1);
		}
		rs.close();
		st.close();
		int pageCount=(int) Math.ceil(max/(double)numPerPage);
		pageCount = Math.max(pageCount, 1);
		return pageCount;
	}	
}

