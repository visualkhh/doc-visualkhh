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

// new ClassBasicDemo().i=555; //���� ��������������� �����ü��� ����
		



ClassBasicDemo a = new ClassBasicDemo();
a.name="A��";
System.out.println(a.name);

ClassBasicDemo b = new ClassBasicDemo();
b.name="B��";
System.out.println(b.name);

a=b;
System.out.println(b.name);

ClassBasicDemo visu=a;
System.out.println(visu.name);

	}
}

