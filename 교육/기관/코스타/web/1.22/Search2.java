class sort2{
	public static void main(String[] args){
	




		int datas[] = {1,2,16,5,23,54,21};
		
		System.out.print("원데이터\n");

		for(int i=0; i<datas.length;i++)
		{
			System.out.print(datas[i] + "\t");
		}
		
		
		System.out.println("\n");
		System.out.print("---정렬시작\n\n");

		int index;
		for(int i=0; i<datas.length-1;i++)
		{
				index=0;
				
			
				
				for(int j=1;j<datas.length-i;j++)
				{
					if(datas[j] > datas[index])
						index= j;
				}


				int k = datas[index];
				datas[index] = datas[datas.length-1-i];
				datas[datas.length-1-i] = k;

		}


		System.out.print("정렬후\n");

		for(int i=0; i<datas.length;i++)
		{
			System.out.print(datas[i] + "\t");
		}
		System.out.println();



	}
}
