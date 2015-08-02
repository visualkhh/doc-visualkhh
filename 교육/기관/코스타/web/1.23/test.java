class test{
	public static void main(String[] args){
		System.out.println("Hello World!");
		int in[][]={
			{1,2,3,4,5},
			{1,2,3,4,5,44,44}
					};


					for(int i=0; i<in.length;i++)
					{
						for(int y=0;y<in[i].length;y++)
						{
							System.out.print(in[i][y]+"\t");
						}
	System.out.print("\n");
					}

//	rider[i]=new int[y];
int wow[][];
wow=in;
					in=new int[4][4];


					for(int i=0; i<in.length;i++)
					{
						for(int y=0;y<in[i].length;y++)
						{
							System.out.print(in[i][y]+"\t");
						}
	System.out.print("\n");
					}



					for(int i=0; i<wow.length;i++)
					{
						for(int y=0;y<wow[i].length;y++)
						{
							System.out.print(wow[i][y]+"\t");
						}
	System.out.print("\n");
					}

	}
}
