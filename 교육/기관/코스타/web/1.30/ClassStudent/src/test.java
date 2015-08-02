
class test1 {
int i=10;
}

class test2 extends test1 {
int ii=110;
}

class test3 extends test2{
	int iii=1110;
	public test3(int z) {
	this.ii=z;
	//ii=z;
		// TODO Auto-generated constructor stub
	}
}
public class test {

	public static void main(String[] args) {
		test2 t2=new test3(555);
		System.out.print(t2.ii);
		
		t2=new test3(666);
		System.out.print(t2.ii);
		
		
		if(t2.ii<50)
		{
		int i=230;
		}else if(t2.ii<3000)
		{
			
			System.out.println(i);
		}else{

		}
		
	}
	
}
