import java.io.*;

class fortest{

public static void main(String[] args) throws IOException{
		System.out.println("KeyInput");
		int i=0,cnt=0,sum=0;


		System.out.println("�����ڸ� �Է��ϼ��� 3��5�� ������....* / + - �������� x �Է�");


for(char oper=(char)System.in.read();   !(oper=='x' || oper=='X')  ;  oper=(char)System.in.read())
	{

int a=3,b=5;

		System.out.println("�����ڸ� �Է��ϼ��� 3��5�� ������....* / + - �������� x �Է�");

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
				System.out.println("������Է��ϼ��� ");
		}

System.in.skip(4);

	}


	


	}




}
