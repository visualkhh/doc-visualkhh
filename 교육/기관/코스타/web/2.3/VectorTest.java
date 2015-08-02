import java.util.*;

class Mem
{
	String name;
	int age;
	String address;
	Mem(String name, int age, String address)
	{
		this.name=name;
		this.age=age;
		this.address=address;
	}

	void display()
	{
		System.out.println(name+"\t"+age+"\t"+address);
	}
}






class VectorTest 
{
	public static void main(String[] args) 
	{
		System.out.println("Vector Test!");

		Mem m=new Mem("zz",20,"asd");
		Mem m2=new Mem("z2z",22,"a2sd");
		Mem m3=new Mem("z3z",23,"a3sd");


		Mem wow[] =new Mem[3];
		wow[0] =new Mem("azzz",220,"zasd");
		wow[1]=new Mem("azz",240,"bvasd");
		wow[2]=new Mem("azzz",250,"hhasd");




		m.display();
		m2.display();
		m3.display();

	Vector v=new Vector();
	v.addElement(m);
	v.addElement(m2);
	v.addElement(m3);
//	v.addElement(wow);

	for(int i=0; i<v.size();i++)
	{

		((Mem)v.get(i)).display();
		
		//Mem a=(Mem)v.get(i);
		//a.display();
	}

System.out.println("/////////");




Enumeration en =v.elements();


		Mem ma[] =new Mem[3];
		int cnt=0;

		while(en.hasMoreElements())
		{
			ma[cnt]=(Mem)en.nextElement();
			cnt++;
			System.out.println(cnt);
		}
		

	for(int i=0; i<v.size();i++)
	{
		ma[i].display();
	}




/*Mem wows[] =new (Mem)v.get(3);
	for(int i=0; i<3;i++)
	{

//		((Mem[])v.get(3)).display();
		
		//Mem a=(Mem)v.get(i);
		//a.display();
	}
*/


	}
}
