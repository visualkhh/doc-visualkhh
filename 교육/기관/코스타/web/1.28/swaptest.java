public  class swaptest{

static int i=10,j=40;

	public static void main(String[] args){
		System.out.println("SwapTest");

		swaptest ob=new swaptest();

		swap(ob);

		System.out.println(ob.i+" "+ob.j);

		swaps(i,j);
		System.out.println(i+" "+j);
	}
	public static void swap(swaptest ob)
	{
		int k=ob.i;
		ob.i=ob.j;
		ob.j=k;

	}




	public static void swaps(int ob, int oo)
	{
		int k=ob;
		ob=oo;
		oo=k;
		swaptest.i=555555;
		swaptest.j=222222;
System.out.println(ob+" "+oo);
	}

}
