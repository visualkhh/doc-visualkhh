import java.util.*;

class Producer implements Runnable{//자판기 관리인

	private AtuoMachine machine;
	
	
	public void run() {  //음료보충!!
		
		for(int i=0;i<10;i++){
			machine.putDrink("음료수"+i);
			System.out.println("Producer:음료수"+i);
			
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
		
	}   
	
	Producer(AtuoMachine machine){   //자판기 주소 알려줌.!!
		this.machine=machine;
	}
	
}



class Consumer implements Runnable{  //구매자
	
	private AtuoMachine machine;
	

	public void run() {  //음료구매
		
		for(int i=0;i<10;i++){
			
			System.out.println("_Consumer: "+machine.getDrink());
			
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
		}
		
	}   
	
	Consumer(AtuoMachine machine){   //자판기 주소 알려줌.!!
		this.machine=machine;
	}
	
	
}


class AtuoMachine { //자판기
	Stack store = new Stack();
	
	public synchronized void putDrink(String drink){

	 store.push(drink);
	 this.notify();  // 넣은후에 대기풀고
	}

	
	public synchronized String getDrink(){
		
			if(store.isEmpty()){//없으면 대기
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
