import java.io.*;
import java.util.*;
interface Power
{

		void powerOn();
		void powerOff();

}

interface Volume extends Power
{
		void volumeUp(int level);
		void volumeDown(int level);
}//END interface 


class electric implements Power
{

	 boolean sw;

			public	void powerOn()
			{

				if(!sw)
				{
					sw=!sw;
					System.out.println("(ON) �������ϴ�.");
				}else
				{
					System.out.println("�̹�(ON) �����ֽ��ϴ�.");
				}

			}//END powerOn  method
	
	
			public void powerOff()
			{
				if(sw)
				{
					sw=!sw;
					System.out.println("(OFF) �������ϴ�.");
				}else
				{
					System.out.println("�̹�(OFF) �����ֽ��ϴ�.");
				}
			}//END powerOff  method
	

	electric()
	{
		sw=false;

	}

}//END electric 

class computer extends electric implements Volume
{
	 int volume;
	computer()
	{
		volume=10; //�⺻��10
	}

	public void volumeUp(int level)
	{
		if(sw)
		{

				if(level<=100)
				{
					volume+=10;
					System.out.println("(volumeUp) �÷Ƚ��ϴ�."+volume);
				}else
				{
					System.out.println("���� �����ִ�ġ.�Դϴ�.");
				}
		}else
		{
			System.out.println("������ OFF�����Դϴ�.");
		}
	};
	public void volumeDown(int level)
	{
		if(sw)
		{
				if(level>=10)
				{
					volume-=10;
					System.out.println("(volumeUp) ���Ƚ��ϴ�."+volume);
				}else
				{
					System.out.println("���� ��������ġ.�Դϴ�.");
				}
		}else
		{
			System.out.println("������ OFF�����Դϴ�.");
		}
	};
}//END computer




class radio extends electric implements Volume
{
	 int volume;
	computer()
	{
		volume=10; //�⺻��10
	}

	public void volumeUp(int level)
	{
		if(sw)
		{

				if(level<=100)
				{
					volume+=10;
					System.out.println("(volumeUp) �÷Ƚ��ϴ�."+volume);
				}else
				{
					System.out.println("���� �����ִ�ġ.�Դϴ�.");
				}
		}else
		{
			System.out.println("������ OFF�����Դϴ�.");
		}
	};
	public void volumeDown(int level)
	{
		if(sw)
		{
				if(level>=10)
				{
					volume-=10;
					System.out.println("(volumeUp) ���Ƚ��ϴ�."+volume);
				}else
				{
					System.out.println("���� ��������ġ.�Դϴ�.");
				}
		}else
		{
			System.out.println("������ OFF�����Դϴ�.");
		}
	};
}//END computer





class interfaceTest2 
{
	public static void main(String[] args) 
	{
		System.out.println("InterfaceTest(Extends)\n");

		computer com=new computer();


		Scanner sc =new Scanner(System.in);
while(true)
{

		System.out.println("��ǻ�͸� �����մϴ�.\n");
		System.out.println("��ǻ��������\n����:"+com.sw+"����"+com.volume);
		System.out.print("Menu: 1)����ON\t2) ����OFF\t 3) ����UP\t 4) ����DOWN\n\t>:");
		int input =sc.nextInt();
		if(input==1)
		{
			com. powerOn();
		}else if(input==2)
		{
			com. powerOff();
		}else if(input==3)
		{
			com.volumeUp(10);
		}else if(input==4)
		{
			com.volumeDown(10);

		}else
		{
			System.exit(0) ;
		}
}



	}
}
