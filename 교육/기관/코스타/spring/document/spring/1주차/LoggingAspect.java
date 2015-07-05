package kosta.spring;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StopWatch;

public class LoggingAspect {

	private Log log = LogFactory.getLog(getClass());
	
	public Object logging(ProceedingJoinPoint jointPoint)throws Throwable{
		log.info("��� ����");
		StopWatch stopWatch = new StopWatch();
		try{
			stopWatch.start();	
			Object retValue = jointPoint.proceed();//write()�޼��� ȣ�� ����
			return retValue;			
		}catch(Throwable e){
			throw e;
		}finally{
			stopWatch.stop();
			log.info("��� ����");
			log.info(jointPoint.getSignature().getName() + "�޼��� ����� "
					 + stopWatch.getTotalTimeMillis());
		}		
		
	}
	
}







