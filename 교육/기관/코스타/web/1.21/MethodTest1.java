class MethodTest1{
	public static void main(String[] args){
		liner(12,'a');
		System.out.println("인사관리프로그램");
		liner(14,'z');
		System.out.println("1사원등록");
		System.out.println("2사원삭제");
		System.out.println("3사원검색");
		liner(10,'b');
	}



	public static void liner(int cnt,char in)
	{
		for(int i=0; i<cnt;i++)
		{
		System.out.print(in);
		}
System.out.println();

	}



}
