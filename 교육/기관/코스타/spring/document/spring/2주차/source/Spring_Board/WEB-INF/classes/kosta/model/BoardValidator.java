package kosta.model;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class BoardValidator implements Validator {

	@Override
	public boolean supports(Class arg0) {
		if(Board.class.isAssignableFrom(arg0)){
			return true;
		}
		return false;
	}

	@Override
	public void validate(Object arg0, Errors errors) {
		Board board = (Board)arg0;
		
		if(board.getWriter() == null || board.getWriter().length()==0){
			errors.rejectValue("writer", "required");
		}
		
		if(board.getTitle() == null || board.getTitle().length() == 0){
			errors.rejectValue("title", "required");
		}
	}

}











