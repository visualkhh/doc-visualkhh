import java.io.*;
import java.util.Scanner;

class test{
	public static void main(String[] args)throws IOException{


/*
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		galloninput = Integer.parseInt(br.readLine());
*/


Scanner console = new Scanner(System.in);
  
System.out.println("===�� ���� double���� �̿� ������ ���ϰ��� �����ϰ� �������� �ش��ϴ� ���ϰ����� �ٲ㺸��..tip:1����3.7584===");

		System.out.println("gallon=tip:3.75884 :"	);
		double galloninput=0;		
		galloninput = console.nextDouble();  
		
		
		System.out.println("liter=");
		double literinput=0;
		literinput= console.nextDouble();  




oper gall=new oper(galloninput, literinput);

double output=gall.resulte();

		System.out.println("���"+output);





		System.out.println("========�����߷��� 17%�����̴ٴ޿����� ���ü���� ������α׷��ۼ�================");

		System.out.println("weight=");
		double weight=0;
		weight= console.nextDouble();  

		System.out.println("gravitation");
		double gravitation=0;
		gravitation= console.nextDouble();  

System.out.println("���"+gall.gravitationoper(gravitation,weight));



		System.out.println("===�����߻���ġ�ľǹ����Ҹ��� ��������� ������ġ�� ���������� ����Ʈ ���� �������ִ°� ��� �Ҹ��� �������� �� 1,100��Ʈ/second �ӵ��� ���� ���������ð��� õ�ռҸ��� ���� �ð� ������ �ð��� �˸� �Ÿ��� ����Ҽ��ִ�.=====");

				
				System.out.println("See");
		double see=0;
		see= console.nextDouble();



				System.out.println("Listen");
		double listen;
		listen= console.nextDouble();

System.out.println("���"+gall.lightning(see,listen));


	}




	
}


class oper
{

private double output=0;

	
	oper(double gallon, double liter)
	{
		
		
		output=liter*gallon;
	}



	public double gravitationoper(double gravitation, double weight)
	{
		return weight/100*gravitation;

	}



	public double lightning(double see, double listen)
	{
		return see*listen;

	}



public double resulte()
	{
	return output;
	}

}