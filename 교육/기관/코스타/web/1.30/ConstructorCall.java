class a
{
	a()
	{
		super();
		System.out.println("A Constructor");
	}
}
class b extends a
{
	b()
	{
		super();
		System.out.println("B Constructor");
	}
}

class c extends b
{
	c()
	{
		super();
		System.out.println("C Constructor");
	}
}

class ConstructorCall{
	public static void main(String[] args){
		System.out.println("Hello World!");
		c x =new c();
	}
}
