import java.io.*;
import java.util.Scanner;

class IfStatement3{
	public static void main(String[] args) throws IOException{

		Scanner console = new Scanner(System.in);
		int point=0;		

		System.out.println("학점입력");
		point = console.nextInt();  

		
		

		if(point>=90)
		{
					System.out.println("잘했음90이상");
		}else if(point>=50)
		{
					System.out.println("보통 50이상");
		}else{
					System.out.println("노력요망");
		}





					System.out.println("연산자를 입력하세요 3과5를 연산할....* / + -");
					char oper=(char)System.in.read();

if(oper=='*')
		{
	System.out.println(3*5);
		}else if(oper=='/')
		{
				System.out.println(3/5);
		}else if(oper=='+')
		{
				System.out.println(3+5);
		}else if(oper=='-')
		{
				System.out.println(3-5);
		}else
		{
				System.out.println("제대로입력하세요 ");
		}



	System.out.println("대문자로만 임의 알파뱃을 입력하세요");


System.in.skip(2);


char choice=(char)System.in.read();

char think ='K';

		
		if(think==choice)
		{
			System.out.println("빙고");
		}else if ((int)choice < (int)think)
		{
			System.out.println("입력값이 제가 생각한것보다 낮네요");
		}else
		{
			System.out.println("입력값이 제가 생각한것보다 높네요");
		}



	}
}
