import java.util.*;
class CollectionTest{
	public static void main(String[] args){

		System.out.println("CollectionTest");
		
//HashSet add  / size
		HashSet set =new HashSet();
			set.add("zz");
			set.add("zgzz");
			set.add("zgfcz");
			set.add("zgfcz");
			set.add("zzcvb");
			set.add("zzfry54");
		
		System.out.println(set.size());
				System.out.println(set);

//TrreSet add/ size
		TreeSet set1=new TreeSet();
			set1.add("zz");
			set1.add("zgzz");
			set1.add("zgfcz");
			set1.add("zgfcz");
			set1.add("zzcvb");
			set1.add("zzfry54");
		System.out.println(set1.size());
				System.out.println(set1);



//ArrayList  Index
		ArrayList list =new ArrayList();
		list.add("zzcsdf");
		list.add("bfg");
		list.add("hger");
		list.add("Bfgg");
		System.out.println(list.size());
		System.out.println("0 = "+list.get(0));
		System.out.println("1 = "+list.get(1));



//Vector output
			Vector v=new Vector ();
			v.addElement("È«±æµ¿");
			v.addElement("10");
			v.addElement(10.4);
			v.addElement(10);

			String s;
			for(int i=0;i<v.size();i++)
			{
				s=(String)v.elementAt(i).toString();;
			//s=(String)v.get(i).toString();;
				System.out.println(i+"¹øÂ°¿ä¼Ò%s"+s);
			}

//Vector Search
		Vector v2=new Vector();
			v2.addElement("È«±æµ¿");
			v2.addElement("10");
			v2.addElement("2È«±æµ¿");
			v2.addElement("100");
			v2.addElement("È«3±æµ¿");
			v2.addElement("104");

		String search="104";
		if(v2.contains(search))
		{
			int i= v2.indexOf(search);
			System.out.println("°´Ã¼À§Ä¡"+(i+1)+"¿¡ÀÖ¾î¿ä");
		}





//Vector delete
		Vector v3=new Vector();
			v3.addElement("È«±æµ¿");
			v3.addElement("10");
			v3.addElement("2È«±æµ¿");
			v3.addElement("100");
			v3.addElement("È«3±æµ¿");
			v3.addElement("104");

			v3.removeElementAt(3);
			for(int i=0;i<v3.size();i++)
			{
				s=(String)v3.elementAt(i).toString();;
			//s=(String)v.get(i).toString();;
				System.out.println(i+"¹øÂ°¿ä¼Ò"+s);
	
			}

			System.out.println("º¤ÅÍ¿¡ µé¾îÀÖ´Â ¿¤¸®¸ÕÆ®¼ö"+v3.size());


			v3.clear();
			System.out.println("º¤ÅÍ¿¡ µé¾îÀÖ´Â ¿¤¸®¸ÕÆ®¼ö"+v3.size());


			System.out.println("º¤ÅÍÀÇ Å©±â"+v3.capacity());
			v3.trimToSize();
			System.out.println("º¤ÅÍÀÇ Å©±â"+v3.capacity());

	}
}
