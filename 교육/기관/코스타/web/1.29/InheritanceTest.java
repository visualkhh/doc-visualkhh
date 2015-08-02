class Person
{
private	String name;
private	int age;
boolean gender;
	void setVar(String n,int a)
	{
		name=n;
		age=a;

	}
Person(int w)
	{
	System.out.println("积己磊 欺郊"+w);
	}
Person(boolean w)
	{
	System.out.println("积己磊 欺郊"+w);
	}
}

class Mem extends Person
{
	boolean gender=true;
static int a=22;
int zzz=55;
//Mem m=new Mem(zzz);

	Mem()
	{
				super(true);
		//age=55;
		//name="zz";
		System.out.println(gender);
		setVar("zz",455);
		gender=true;
				super.gender=true;



	}

	void aa(){
	}


}
class InheritanceTest{
	public static void main(String[] args){
		System.out.println("Inheritance!");
		Mem m=new Mem();
	}
}
