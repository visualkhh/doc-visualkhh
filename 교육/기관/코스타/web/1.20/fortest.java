import java.io.*;

class fortest{

public static void main(String[] args) throws IOException{
		System.out.println("KeyInput");
		int i=0,cnt=0,sum=0;


		System.out.println("연산자를 입력하세요 3과5를 연산할....* / + - 나갈려면 x 입력");


for(char oper=(char)System.in.read();   !(oper=='x' || oper=='X')  ;  oper=(char)System.in.read())
	{

int a=3,b=5;

		System.out.println("연산자를 입력하세요 3과5를 연산할....* / + - 나갈려면 x 입력");

		if(oper=='*')
		{
				System.out.println(a*b);
		}else if(oper=='/')
		{
				System.out.println(a/b);
		}else if(oper=='+')
		{
				System.out.println(a+b);
		}else if(oper=='-')
		{
				System.out.println(a-b);
		}else
		{
				System.out.println("제대로입력하세요 ");
		}

System.in.skip(4);

	}


	


	}




}
