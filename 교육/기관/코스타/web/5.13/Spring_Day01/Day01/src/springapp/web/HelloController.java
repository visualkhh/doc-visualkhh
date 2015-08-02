package springapp.web;

import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

public class HelloController extends AbstractController {

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("hello");
		mav.addObject("greeting", getGreeting());
		return mav;
	}
	private String getGreeting(){
		int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);	
		if(hour >=6 && hour <=10){
			return "���� ��ħ�ܴ̿�.";
		}else if(hour >=12 && hour <=16){
			return "���� �Ļ� �ϼ̼�?";
		}else if(hour >=18 && hour <=22){
			return "�� ����~�޾�";
		}else{
			return "���~";
		}		
	}
	

}
