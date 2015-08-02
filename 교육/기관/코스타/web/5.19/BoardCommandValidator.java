package springapp.board;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class BoardCommandValidator implements Validator {

	@Override
	public boolean supports(Class arg0) {
		if(BoardVO.class.isAssignableFrom(arg0))
			return true;
		return false;
	}

	@Override
	public void validate(Object arg0, Errors arg1) {
		BoardVO command = (BoardVO)arg0;
		if(command.getWriter()==null || command.getWriter().length()==0){
			arg1.reject("writer", "required");
		}
		if(command.getTitle()==null || command.getTitle().length()==0){
			arg1.reject("title", "required");
		}
		if(command.getPassword()==null || command.getPassword().length()==0){
			arg1.reject("password", "required");
		}

	}

}
