package kosta.controller;

import java.util.List;

import kosta.model.Board;
import kosta.model.BoardDao;
import kosta.model.BoardValidator;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BoardController {
	private BoardDao dao;
	private BoardValidator myValidator;
		
	public void setMyValidator(BoardValidator myValidator) {
		this.myValidator = myValidator;
	}

	public void setDao(BoardDao dao) {
		this.dao = dao;
	}

	@RequestMapping(value="/board_insert.do", method=RequestMethod.GET)
	public ModelAndView insert_form()throws Exception{
		return new ModelAndView("board/insert_form.jsp");
	}
	
	@RequestMapping(value="board_insert.do", method=RequestMethod.POST)
	public ModelAndView insert_do(@ModelAttribute("boardCommand") 
									Board board, BindingResult errors)throws Exception{
		
		myValidator.validate(board, errors);
		
		if(errors.hasErrors()){
			return new ModelAndView("board/insert_form.jsp");
		}else{
			dao.insert(board);
			return new ModelAndView("redirect:/board_list.do");
		}		
		
	}
	
	@RequestMapping("/board_list.do")
	public ModelAndView list_do()throws Exception{
		ModelAndView mav = new ModelAndView();
		
		List<Board> list = dao.list();
		mav.setViewName("board/list.jsp");
		mav.addObject("list", list);
		
		return mav;
	}
	
}

















