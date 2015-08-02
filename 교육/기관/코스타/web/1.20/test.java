import java.io.*;
import java.util.Scanner;

class test{
	public static void main(String[] args)throws IOException{


/*
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		galloninput = Integer.parseInt(br.readLine());
*/


Scanner console = new Scanner(System.in);
  
System.out.println("===두 개의 double변수 이용 갤런과 리턴값을 저장하고 갤런값을 해당하는 리턴값으로 바꿔보자..tip:1갤런3.7584===");

		System.out.println("gallon=tip:3.75884 :"	);
		double galloninput=0;		
		galloninput = console.nextDouble();  
		
		
		System.out.println("liter=");
		double literinput=0;
		literinput= console.nextDouble();  




oper gall=new oper(galloninput, literinput);

double output=gall.resulte();

		System.out.println("결과"+output);





		System.out.println("========달의중력의 17%정도이다달에서의 당신체중을 계산프로그램작성================");

		System.out.println("weight=");
		double weight=0;
		weight= console.nextDouble();  

		System.out.println("gravitation");
		double gravitation=0;
		gravitation= console.nextDouble();  

System.out.println("결과"+gall.gravitationoper(gravitation,weight));



		System.out.println("===번개발생위치파악번개소리를 들은사람이 번개가치는 곳에서부터 몇피트 정도 떨어져있는가 계산 소리는 공기중을 약 1,100피트/second 속도로 진행 번개를본시각괴 천둥소리를 들은 시각 사이의 시간을 알면 거리를 계산할수있다.=====");

				
				System.out.println("See");
		double see=0;
		see= console.nextDouble();



				System.out.println("Listen");
		double listen;
		listen= console.nextDouble();

System.out.println("결과"+gall.lightning(see,listen));


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