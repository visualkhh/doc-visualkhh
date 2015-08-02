package myclasses;
import java.util.*;

public class BbsArticle {
	protected String num, rnum, subject, writer, password, idate;
	protected String contents, email, homepage, ip, rcount, vcount ;
	protected int size;
	protected boolean html;
	protected Vector<Comment>  comments;
	
	public BbsArticle() {
		comments = new Vector<Comment>();
	}
	
	public void addComment(Comment a) {
		comments.add(a);
	}
	
	public void setNum(String s) { this.num = s; }
	public String getNum() { return num; }
	
	public void setRnum(String s) { this.rnum = s; }
	public String getRnum() { return rnum; }

	public void setSubject(String s) { this.subject = s; }
	public String getSubject() { return subject; }
	
	public void setWriter(String s) { this.writer = s; }
	public String getWriter() { return writer; }
	
	public void setPassword(String s) { this.password = s; }
	public String getPassword() { return password; }

	public void setIdate(String s) { idate = s; }
	public String getIdate() { return idate; }
	
	public void setContents(String s) { contents = s; }
	public String getContents() { return contents; }

	public void setEmail(String s) { email = s; }
	public String getEmail() { return email; }

	public void setHomepage(String s) { homepage = s; }
	public String getHomepage() { return homepage; }
	
	public void setIp(String s) { ip = s; }
	public String getIp() { return ip; }

	public void setRcount(String s) { rcount = s; }
	public String getRcount() { return rcount; }

	public void setVcount(String s) { vcount = s; }
	public String getVcount() { return vcount; }
	
	public void setHtml(boolean s) { html = s; }
	public boolean getHtml() { return html; }
	
	public void setSize(int s) { size = s; }
	public int getSize() { return size; }

	public Vector<Comment> getComments() { return comments; }	
}

