import java.io.*;

class IfStatement4{

public static void main(String[] args) throws IOException{
		System.out.println("KeyInput");
		char id, pass;

				System.out.println("ID");
				id=(char)System.in.read();



System.in.skip(2);



				System.out.println("PASS");
				pass=(char)System.in.read();

				if(id=='a')
				{
					
					if(pass=='b')
					{
						System.out.println("로그인됐음");
					}else
					{
						System.out.println("비번만달러요");
					}

				}else
				{
					if(pass=='b')
					{
						System.out.println("아이디가틀렸어요");
					}else
					{
						System.out.println("둘다틀렸네요");
					}

				}
	}

}
