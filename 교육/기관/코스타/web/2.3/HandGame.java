import java.io.*;
import java.util.*;
class HandGame 
{
	public static void main(String[] args) 
	{
		System.out.println("Gawi Bawi Bo");
String[] COM={"","가위γ","바위■","보ψ"};
int user=0;
int com=0;
int input=0;
	Random r=new Random();
	Scanner sc =new Scanner(System.in);

do{
		System.out.print("값을 입력하세요(가위1,  바위2, 보3) : ");
		input=sc.nextInt();
	}while(input<1 || input>3);

	user=input;	

	com=r.nextInt(3)+1;

System.out.println("컴터: "+COM[com]);
System.out.println("YOU: "+COM[user]);

switch(user-com)
		{
	case 2:
	case -1:
		System.out.println("컴터가 이겼음");break;
	case 1:
	case -2:
		System.out.println("당신이 이겼음");break;
	case 0:
		System.out.println("비겼음");break;
		}

	}
}