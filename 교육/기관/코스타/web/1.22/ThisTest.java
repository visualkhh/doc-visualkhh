class a
{
int i=0;
int j=0;

void SetVar(int i, int y)
	{
	this.i=i;
	this.j=y;
	}

void GetVar(a b)
	{
	b.i*=5;
	b.j*=5;
	System.out.println(i+"."+j);
	}

}


class ThisTest{
	public static void main(String[] args){
		System.out.println("Hello World!");

		a b1 =new a();
		a b2 =new a();
		a b3 =new a();

		b1.SetVar(10,20);
		b2.SetVar(30,40);
		b3.SetVar(50,60);
		
		b1.GetVar(b1);
		b2.GetVar(b1);
		b3.GetVar(b1);

		b1.GetVar(b1);



	}
}
