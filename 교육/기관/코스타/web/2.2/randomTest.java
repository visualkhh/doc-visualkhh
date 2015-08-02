import java.util.*;

class  randomTest{
	public static void main(String[] args){
		System.out.println("random");
////////////////////////////	
	Random ra=new Random();
	for(int i=0;i<4;i++)
	{
		System.out.println(ra.nextInt());
	}
////////////////////////////
		for(int i=0;i<4;i++)
	{
		System.out.println(ra.nextInt(10));
	}
////////////////////////////////////
int min=55, max =70;
		for(int i=0;i<4;i++)
	{
		System.out.println(ra.nextInt((max-min+1)+min));
	}


	}
}
