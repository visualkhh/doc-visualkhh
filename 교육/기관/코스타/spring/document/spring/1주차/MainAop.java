package kosta.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainAop {

	public static void main(String[] args) {
		String[] configLocation = {"applicationContext.xml",
				"commonConcern.xml"};
		
		ApplicationContext context = 
				new ClassPathXmlApplicationContext(configLocation);
		
		WriteService service = 
				(WriteService)context.getBean("writeService");
		
		service.write();
	}

}










