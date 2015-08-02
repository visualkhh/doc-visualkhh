package myclasses;

public class Comment {
	private String num, rnum, writer, contents, password, idate, ip;
	
	public Comment() { }
	public Comment(String num, String rnum, String writer, 
		String idate, String contents, String password, String ip) {
		this.num = num;
		this.writer = writer;
		this.contents = contents;		
		this.idate = idate;
	}
	
	public void setNum(String s) { num = s; }
	public String getNum() { return num; }
	
	public void setRnum(String s) { rnum = s; }
	public String getRnum() { return rnum; }
	
	public void setWriter(String s) { writer = s; }
	public String getWriter() { return writer; }
	
	public void setContents(String s) { contents = s; }
	public String getContents() { return contents; }
	
	public void setIdate(String s) { idate = s; }
	public String getIdate() { return idate; }

	public void setPassword(String s) { password = s; }
	public String getPassword() { return password; }

	public void setIp(String s) { ip = s; }
	public String getIp() { return ip; }	
}
