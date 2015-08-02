
interface inter1
{
	int a=10;
}
interface inter2
{
	int b=20;
}
interface inter3 extends inter1
{
	int c=30;
}



	 interface Volume
	{
		void volumeUp(int level);
		void volumeDown(int level);
	}


class TV implements Volume
	{

		private int volLevel;

		public TV()
		{
			volLevel=0;
		}

		
		public void volumeUp(int level)
		{

			volLevel+=level;
			System.out.println("Tº¼·ý¾÷\t"+volLevel);
		}
		
		
		public void volumeDown(int level)
		{
			volLevel-=level;
			System.out.println("Tº¼·ý´Ù¿î\t"+volLevel);

		}

	}




class SPEAKER implements Volume
	{

		private int volLevel;

		public SPEAKER()
		{
			volLevel=0;
		}

		
		public void volumeUp(int level)
		{

			volLevel+=level;
			System.out.println("Sº¼·ý¾÷\t"+volLevel);
		}
		
		
		public void volumeDown(int level)
		{
			volLevel-=level;
			System.out.println("Sº¼·ý´Ù¿î\t"+volLevel);

		}

	}



	class RADIO implements Volume
	{

		private int volLevel;

		public RADIO()
		{
			volLevel=0;
		}

		
		public void volumeUp(int level)
		{

			volLevel+=level;
			System.out.println("Rº¼·ý¾÷\t"+volLevel);
		}
		
		
		public void volumeDown(int level)
		{
			volLevel-=level;
			System.out.println("Rº¼·ý´Ù¿î\t"+volLevel);

		}

	}



class interfaceTest implements inter3,inter2
{
	public static void main(String[] args) 
	{
		System.out.println("interface Test");
		System.out.println(inter2.b);
		System.out.println(inter2.b);
		System.out.println(inter1.a);

		RADIO radio =new RADIO();
		TV tv =new TV();
		SPEAKER speaker =new SPEAKER();

		radio.volumeUp(10);
		tv.volumeUp(10);
		speaker.volumeUp(10);
		speaker.volumeDown(10);

	
		Volume[] vol =new Volume[3];
		vol[0]=radio;
		vol[1]=tv;
		vol[2]=speaker;
		vol[2].volumeDown(10);

	}
}
