class ClassBasicDemo
{
	int i;
	double d;
String name;

}



class ClassBasic
{

	public static void main(String[] args){
		System.out.println("Hello World!");

		ClassBasicDemo cd = new ClassBasicDemo();
		cd.i=10;
		System.out.println(cd.i);

// new ClassBasicDemo().i=555; //값을 집어넣을수있지만 꺼내올수가 없다
		



ClassBasicDemo a = new ClassBasicDemo();
a.name="A꺼";
System.out.println(a.name);

ClassBasicDemo b = new ClassBasicDemo();
b.name="B꺼";
System.out.println(b.name);

a=b;
System.out.println(b.name);

ClassBasicDemo visu=a;
System.out.println(visu.name);

	}
}

