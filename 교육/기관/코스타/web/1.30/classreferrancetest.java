class parent
{
	int i;
	public void setvalue()
	{
		i=10;
	}
}
class child extends parent
{
	int j;
	public void setvalue()
	{
		j=20;
		i=6666666;
	}
}

class classreferrancetest {
	public static void main(String[] args){
	System.out.println("Class reperance Test");

	parent p1=new parent();
	p1.setvalue();
	System.out.println(p1.i);

	parent p2=p1;
	parent p3=p2;
	System.out.println(p2.i);


	child c1=new child();
	c1.setvalue();
	System.out.println(c1.j);
	
	child c2=c1;
	System.out.println(c2.j);


System.out.println("	p1=c1;");
	p1=c1;

	System.out.println(p1.i);

	p1=c2;
//	p1.i=5;

	p2=c2;
	System.out.println(p2.i);

	
	c2=(child)p2;
	System.out.println(c2.j);
	System.out.println(c2.i);



System.out.println(p3.i);

	}
}
