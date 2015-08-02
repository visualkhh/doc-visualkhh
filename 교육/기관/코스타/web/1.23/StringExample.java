class StringExample{
	public static void main(String[] args){



		//배열로 사용한 스트링클래스
	
	String name[] =new String[5];
	name[0]="김현하";name[1]="김현하ㄴ";name[2]="김현하ㄴㄴ";


		for(int i=0;i<name.length;i++)
		{
			System.out.println(name[i]);
		}

				System.out.println();
				System.out.println();
				System.out.println();

		//변수처럼사용한 스트링참조변수
		String names="우허ㅏ학;ㅁ혀ㄴ";
		System.out.println(names);

				System.out.println();
				System.out.println();
				System.out.println();

		//equals 비교문 
		String String1 =new String("java"); 
		String String2 =new String("java"); 
		System.out.println("스트링1:"+String1+"\t스트링2:"+String2+"\t값이같냐?equals?\t"+String1.equals(String2));
		System.out.println("스트링1:"+String1+"\t스트링2:"+String2+"\t주소가같냐?equal?\t"+(String1==String2));

		//길이!length()		
				System.out.println("스트링1:"+String1+"\t길이"+String1.length());




		//compareTo
		if(String1.compareTo(String2)>0)
		{
				System.out.println("스트링1:큼");
		}else if(String1.compareTo(String2)<0)
		{
				System.out.println("스트링1:작음");
		}else if(String1.compareTo(String2)==0)
		{
				System.out.println("스트링1=2:같음");
		}




		//indexof
		String site="www.naver.com";
		System.out.println(site.indexOf("a"));
		System.out.println(site.indexOf("naver"));
		System.out.println(site.indexOf("visual"));


		System.out.println(site.substring(0,5));





	}
}
