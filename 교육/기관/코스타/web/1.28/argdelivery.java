class arg
{
	int w=10;
	double x=3.14;
	char y='a';
	String z="인수전달";
}

class argdelivery{
	public static void main(String[] args){

	
int a=10,b=12, c=17, d=20, e=100;
prn(a,b,c,d,e);

int aarray[]={10,200,30,40,50};
prnarray(aarray);


arg ob =new arg();

prnclass(ob);


	}



	public static void prn(int a,int b,int c, int d, int e)
	{
		System.out.println(a+" "+b+" "+c+" "+d+" "+e);
	}




	public static void prnarray(int[] b)        //첨조에 대한 전달
	{
		for(int i=0; i<b.length;i++)
		{
			System.out.print(b[i]+" ");
		}
	
	}



	public static void prnclass(arg b)        //첨조에 대한 전달
	{
			System.out.println(b.w);
			System.out.println(b.x);
			System.out.println(b.y);
			System.out.println(b.z);
	
	}








}
