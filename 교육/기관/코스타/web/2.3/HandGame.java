import java.io.*;
import java.util.*;
class HandGame 
{
	public static void main(String[] args) 
	{
		System.out.println("Gawi Bawi Bo");
String[] COM={"","������","������","����"};
int user=0;
int com=0;
int input=0;
	Random r=new Random();
	Scanner sc =new Scanner(System.in);

do{
		System.out.print("���� �Է��ϼ���(����1,  ����2, ��3) : ");
		input=sc.nextInt();
	}while(input<1 || input>3);

	user=input;	

	com=r.nextInt(3)+1;

System.out.println("����: "+COM[com]);
System.out.println("YOU: "+COM[user]);

switch(user-com)
		{
	case 2:
	case -1:
		System.out.println("���Ͱ� �̰���");break;
	case 1:
	case -2:
		System.out.println("����� �̰���");break;
	case 0:
		System.out.println("�����");break;
		}

	}
}