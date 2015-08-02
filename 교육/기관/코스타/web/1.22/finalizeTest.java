class FDemo
{
	int f=0;
	 int x=0;


FDemo(int i)
	{
x=i;
Runtime.getRuntime().gc();
	}

protected void finalize()
	{
		System.out.println("Bye World!"+x);
	}
}




class finalizeTest{
	public static void main(String[] args){

		int i=0;

FDemo a[]=new FDemo[100];



		while(i<100)
		{
a[i]=new FDemo(i);
i++;
		}


System.out.println(a[0].x);

	
	
	}
}
