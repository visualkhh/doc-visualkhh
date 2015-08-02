import java.util.*;

class CalendarTest {
	public static void main(String[] args) {
		Calendar cal = Calendar.getInstance();

		int hour = cal.get(Calendar.HOUR);
		int min = cal.get(Calendar.MINUTE);
		int sec = cal.get(Calendar.SECOND);

		System.out.println("현재 시간은 " + hour + "시 " + min + "분 " + sec + "초 이다.");
		System.out.println("현재 날짜는 " +cal.get(Calendar.YEAR) + "시 " +cal.get(Calendar.MONTH)+ "월 " +cal.get(Calendar.DATE) + "일 이다.");


		Date da= new Date();

		System.out.println(da.toString());
		System.out.println(new Date().toGMTString());
		System.out.println(new Date().toLocaleString());

	long start =System.currentTimeMillis()/1000;
	
	for(int i=0;i<10000;i++)
		{
		System.out.println(i);
		};

	long end = System.currentTimeMillis()/1000;
	System.out.println(end-start);

	}
}
