class ExceptionTest 
{
	public static void main(String[] args) 
	{
		int nums[]=new int [4];
		System.out.println("ExceptionTest");
	try
	{
		nums[7]=10;
	}
	catch (Exception e)
	{
				System.out.println("뭐가좀좀이상하지않는가?"+e);
	}

				System.out.println("좀이상하지않는가?");
		

	}
}
