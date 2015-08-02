import java.util.Date;




public class ThreadJoin implements Runnable {

	/**
	 * @param args
	 */
	public void run(){
		for(int i=1;i<10;i++){
			System.out.println(Thread.currentThread().getName()+"  "+i+new Date().toString());
			//runnable이지만 getname을 이용할수있따!!!!!충격
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		ThreadJoin t=new ThreadJoin();
		Thread f=new Thread (t,"첫");
		Thread s=new Thread(t,"두");
		
		f.start();
		s.start();
		
		f.join();    //f가 먼저끝나기전까지 끝나지않음!!
		s.join();  //s가 먼저끝나기전까지 끝나지않음
		
		System.out.println("END"); //메인쓰레드!!
		
	}

}
