import java.io.*;
import java.util.Scanner;

class IfStatement3{
	public static void main(String[] args) throws IOException{

		Scanner console = new Scanner(System.in);
		int point=0;		

		System.out.println("�����Է�");
		point = console.nextInt();  

		
		

		if(point>=90)
		{
					System.out.println("������90�̻�");
		}else if(point>=50)
		{
					System.out.println("���� 50�̻�");
		}else{
					System.out.println("��¿��");
		}





					System.out.println("�����ڸ� �Է��ϼ��� 3��5�� ������....* / + -");
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
				System.out.println("������Է��ϼ��� ");
		}



	System.out.println("�빮�ڷθ� ���� ���Ĺ��� �Է��ϼ���");


System.in.skip(2);


char choice=(char)System.in.read();

char think ='K';

		
		if(think==choice)
		{
			System.out.println("����");
		}else if ((int)choice < (int)think)
		{
			System.out.println("�Է°��� ���� �����Ѱͺ��� ���׿�");
		}else
		{
			System.out.println("�Է°��� ���� �����Ѱͺ��� ���׿�");
		}



	}
}
