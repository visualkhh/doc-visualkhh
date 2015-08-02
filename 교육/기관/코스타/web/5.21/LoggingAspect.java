package springapp.advice;
import org.aspectj.*;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

public class LoggingAspect {
		
		public void returningLogging(JoinPoint joinPoint){
			System.out.println("returningLogging!!!");
			
		}
}
