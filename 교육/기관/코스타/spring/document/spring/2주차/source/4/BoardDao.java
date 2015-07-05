package kosta.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

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

	public List<Board> list() {
		String sql = "select * from board order by seq desc";
		
		RowMapper mapper = new RowMapper() {
			
			@Override
			public Object mapRow(ResultSet rs, int arg1) throws SQLException {
				Board board = new Board();
				board.setContents(rs.getString("contents"));
				board.setHitcount(rs.getInt("hitcount"));
				board.setRegdate(rs.getString("regdate"));
				board.setSeq(rs.getInt("seq"));
				board.setTitle(rs.getString("title"));
				board.setWriter(rs.getString("writer"));
				
				return board;
			}
		};
		
		List<Board> result = myJdbcTemplate.query(sql, mapper);
				
		return result;
	}

	public Board detail(int seq) {
		String sql = "select * from board where seq=?";
		Object values[] = {seq};
		
		RowMapper mapper = new RowMapper() {
			
			@Override
			public Object mapRow(ResultSet rs, int arg1) throws SQLException {
				Board board = new Board();
				board.setContents(rs.getString("contents"));
				board.setHitcount(rs.getInt("hitcount"));
				board.setRegdate(rs.getString("regdate"));
				board.setSeq(rs.getInt("seq"));
				board.setTitle(rs.getString("title"));
				board.setWriter(rs.getString("writer"));
				
				return board;
			}
		};
		
		Board board = 
				(Board)myJdbcTemplate.queryForObject(sql, values, mapper);
		
		return board;
	}

}












