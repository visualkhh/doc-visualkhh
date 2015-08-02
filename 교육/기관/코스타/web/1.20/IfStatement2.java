import java.io.*;

class IfStatement2{

public static void main(String[] args) throws IOException{
		System.out.println("KeyInput");


		char i ;
		i=(char)System.in.read();
if(i=='a' || i=='A')
	{
			System.out.println("Good");
	}
	else if (i=='b' || i=='B')
		{
			System.out.println("Good");
	
		}
	else if (i=='c'|| i=='C')
		{
				System.out.println("Good");
		}
	else
		{
				System.out.println("worst");
		}




	if((int)i>57 && (int)i<127)
	{
					System.out.println("문자입니다");
	}else{
					System.out.println("문자가 아닙니다");
	}

	}
}	
