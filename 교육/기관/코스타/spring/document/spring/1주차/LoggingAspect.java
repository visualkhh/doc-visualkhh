package kosta.spring;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StopWatch;

public class LoggingAspect {

	private Log log = LogFactory.getLog(getClass());
	
	public Object logging(ProceedingJoinPoint jointPoint)throws Throwable{
		log.info("기록 시작");
		StopWatch stopWatch = new StopWatch();
		try{
			stopWatch.start();	
			Object retValue = jointPoint.proceed();//write()메서드 호출 시점
			return retValue;			
		}catch(Throwable e){
			throw e;
		}finally{
			stopWatch.stop();
			log.info("기록 종료");
			log.info(jointPoint.getSignature().getName() + "메서드 실행시 "
					 + stopWatch.getTotalTimeMillis());
		}		
		
	}
	
}







