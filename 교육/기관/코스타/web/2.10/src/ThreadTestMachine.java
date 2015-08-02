import java.util.*;

class Producer implements Runnable{//���Ǳ� ������

	private AtuoMachine machine;
	
	
	public void run() {  //���Ẹ��!!
		
		for(int i=0;i<10;i++){
			machine.putDrink("�����"+i);
			System.out.println("Producer:�����"+i);
			
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
		
	}   
	
	Producer(AtuoMachine machine){   //���Ǳ� �ּ� �˷���.!!
		this.machine=machine;
	}
	
}



class Consumer implements Runnable{  //������
	
	private AtuoMachine machine;
	

	public void run() {  //���ᱸ��
		
		for(int i=0;i<10;i++){
			
			System.out.println("_Consumer: "+machine.getDrink());
			
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
		
	}   
	
	Consumer(AtuoMachine machine){   //���Ǳ� �ּ� �˷���.!!
		this.machine=machine;
	}
	
	
}


class AtuoMachine { //���Ǳ�
	Stack store = new Stack();
	
	public synchronized void putDrink(String drink){

	 store.push(drink);
	 this.notify();  // �����Ŀ� ���Ǯ��
	}

	
	public synchronized String getDrink(){
		
			if(store.isEmpty()){//������ ���
					try {
						this.wait();  
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
			}
			return store.pop().toString();
	}
	
	
}

public class ThreadTestMachine {
	
	public static void main(String[] args) {
		
		AtuoMachine machine =new AtuoMachine();
		
		Producer gildong =new Producer(machine);
		Consumer jane = new Consumer(machine);
		
		
		Thread t1=new Thread(gildong);
		Thread t2 = new Thread(jane);
		t1.start();
		t2.start();
		

	}

}
