package kosta.controller;

import kosta.model.Board;
import kosta.model.BoardDao;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BoardController {
	private BoardDao dao;
	
	public void setDao(BoardDao dao) {
		this.dao = dao;
	}

	@RequestMapping(value="/board_insert.do", method=RequestMethod.GET)
	public ModelAndView insert_form()throws Exception{
		return new ModelAndView("board/insert_form.jsp");
	}
	
	@RequestMapping(value="board_insert.do", method=RequestMethod.POST)
	public ModelAndView insert_do(Board board)throws Exception{
		dao.insert(board);
		
		
		return new ModelAndView("board/list.jsp");
	}
}













