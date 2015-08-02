
public class ThreadTestPriorIty extends Thread{
	String name;
	ThreadTestPriorIty(String n){
		name=n;
	}
	
	public static void main(String[] args) {
		ThreadTestPriorIty t1,t2,t3;
		
		t1=new ThreadTestPriorIty("zz");
		t2=new ThreadTestPriorIty("zzz");
		t3=new ThreadTestPriorIty("zzzz");
		
		t1.start();
		t2.start();
		t3.start();
		
//		//////////////
				
		
		t3.setPriority(10);
		t2.setPriority(5);
		t1.setPriority(1);
		t1.start();
		t2.start();
		t3.start();
		
	}
	
	public synchronized void run(){
		for(int i=0;i<3;i++){
			System.out.println(name+"Ãâ·Â");
		}
		
	}

}
