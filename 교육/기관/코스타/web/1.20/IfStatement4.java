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
						System.out.println("�α��ε���");
					}else
					{
						System.out.println("������޷���");
					}

				}else
				{
					if(pass=='b')
					{
						System.out.println("���̵�Ʋ�Ⱦ��");
					}else
					{
						System.out.println("�Ѵ�Ʋ�ȳ׿�");
					}

				}
	}

}
