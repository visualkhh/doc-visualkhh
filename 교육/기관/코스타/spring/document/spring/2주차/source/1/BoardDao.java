package kosta.model;

import org.springframework.jdbc.core.JdbcTemplate;

public class BoardDao {
	private JdbcTemplate myJdbcTemplate;

	public void setMyJdbcTemplate(JdbcTemplate myJdbcTemplate) {
		this.myJdbcTemplate = myJdbcTemplate;
	}
	
	public void insert(Board board){
		String sql = "insert into board " +
					" (seq, title, writer, contents, hitcount, regdate) " +
				   " values(board_seq.nextval, ?,?,?,0,sysdate)";
		
		Object values[] = {
			board.getTitle(),
			board.getWriter(),
			board.getContents()
		};
		
		myJdbcTemplate.update(sql, values);
		
	}

}












