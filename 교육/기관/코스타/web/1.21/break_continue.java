class break_continue{
	public static void main(String[] args){

		for(int i=0;i<=10;i++)
		{

			System.out.println("Hello World!"+i);
		}

int i=0;
		while(true)
		{
						System.out.println("Hello Worldzzzzzzzzz!"+i);
						if(i==5)break;//continue;
			System.out.println("Hello World!"+i);
			i++;
		}

i=0;
		do
		{
						System.out.println("Hello Worldzzzzzzzzz!"+i);
			if(i==5)continue;//break;
			System.out.println("Hello World!"+i);
			i++;
									System.out.println("Hello Worldzzzzzzzzzzwowowow!"+i);
		}
		while (i<10);

	}
}
