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
					System.out.println("(ON) 켜져습니다.");
				}else
				{
					System.out.println("이미(ON) 켜져있습니다.");
				}

			}//END powerOn  method
	
	
			public void powerOff()
			{
				if(sw)
				{
					sw=!sw;
					System.out.println("(OFF) 꺼져습니다.");
				}else
				{
					System.out.println("이미(OFF) 꺼져있습니다.");
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
		volume=10; //기본값10
	}

	public void volumeUp(int level)
	{
		if(sw)
		{

				if(level<=100)
				{
					volume+=10;
					System.out.println("(volumeUp) 올렸습니다."+volume);
				}else
				{
					System.out.println("현재 볼륨최대치.입니다.");
				}
		}else
		{
			System.out.println("전원이 OFF상태입니다.");
		}
	};
	public void volumeDown(int level)
	{
		if(sw)
		{
				if(level>=10)
				{
					volume-=10;
					System.out.println("(volumeUp) 내렸습니다."+volume);
				}else
				{
					System.out.println("현재 볼륨최하치.입니다.");
				}
		}else
		{
			System.out.println("전원이 OFF상태입니다.");
		}
	};
}//END computer




class radio extends electric implements Volume
{
	 int volume;
	computer()
	{
		volume=10; //기본값10
	}

	public void volumeUp(int level)
	{
		if(sw)
		{

				if(level<=100)
				{
					volume+=10;
					System.out.println("(volumeUp) 올렸습니다."+volume);
				}else
				{
					System.out.println("현재 볼륨최대치.입니다.");
				}
		}else
		{
			System.out.println("전원이 OFF상태입니다.");
		}
	};
	public void volumeDown(int level)
	{
		if(sw)
		{
				if(level>=10)
				{
					volume-=10;
					System.out.println("(volumeUp) 내렸습니다."+volume);
				}else
				{
					System.out.println("현재 볼륨최하치.입니다.");
				}
		}else
		{
			System.out.println("전원이 OFF상태입니다.");
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

		System.out.println("컴퓨터를 조작합니다.\n");
		System.out.println("컴퓨터현상태\n전원:"+com.sw+"볼륨"+com.volume);
		System.out.print("Menu: 1)전원ON\t2) 전원OFF\t 3) 볼륨UP\t 4) 볼륨DOWN\n\t>:");
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
