class ThreadisAlive implements Runnable{
	int count;
	Thread thrd;

	ThreadisAlive(String n){
		thrd = new Thread(this, n);
		count = 0;
		thrd.start();
	}

	public void run(){
		System.out.println(thrd.getName() + " ����");

		do{
			try{ Thread.sleep(500); }catch(InterruptedException e){}
			
			System.out.println(thrd.getName() + ", count is " + count);
			count++;
		}while(count < 10);

		System.out.println(thrd.getName() + " ����");
	}

	public static void main(String[] args){
		System.out.println("���� ������ ����");

		ThreadisAlive t1 = new ThreadisAlive("�ڽ� ������1");
		ThreadisAlive t2 = new ThreadisAlive("�ڽ� ������2");
		ThreadisAlive t3 = new ThreadisAlive("�ڽ� ������3");

		do{
			System.out.print(".");
			try{Thread.sleep(100); } catch(InterruptedException e){}
		//}while(t1.count != 10);
		}while(t1.thrd.isAlive()||t2.thrd.isAlive()||t3.thrd.isAlive());

		System.out.println("���� ������ ��");
	}
}