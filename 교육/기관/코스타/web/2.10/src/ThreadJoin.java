import java.util.Date;




public class ThreadJoin implements Runnable {

	/**
	 * @param args
	 */
	public void run(){
		for(int i=1;i<10;i++){
			System.out.println(Thread.currentThread().getName()+"  "+i+new Date().toString());
			//runnable������ getname�� �̿��Ҽ��ֵ�!!!!!���
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		ThreadJoin t=new ThreadJoin();
		Thread f=new Thread (t,"ù");
		Thread s=new Thread(t,"��");
		
		f.start();
		s.start();
		
		f.join();    //f�� ���������������� ����������!!
		s.join();  //s�� ���������������� ����������
		
		System.out.println("END"); //���ξ�����!!
		
	}

}
