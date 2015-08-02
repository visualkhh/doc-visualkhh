class arraysort{
	public static void main(String[] args){
	int arr[][]=new int [3][2];
String name[]=new String[3];

name[0]="김현하";		arr[0][0]=98;

name[1]="임걱정";		arr[1][0]=55;

name[2]="둘리";			arr[2][0]=70;


for(int i=0;i<arr.length;i++)
{
	arr[i][1]=1;
	
	for(int j=0;j<arr.length;j++)
	{
		if (arr[i][0]<arr[j][0])
		{
			arr[i][1]+=1;
		}
	}
}



for (int i=0,cnt=0 ;i<3;i++,cnt++)
{

	System.out.println(name[i]+"\t"+arr[cnt][0]+"\t"+arr[cnt][1]);
	
	
}


System.out.println("\n\n\n");

//현하 소팅
for (int i=1,cnt=0 ;i<=3;i++,cnt++)
{

	if(i==arr[cnt][1])
	{	
		System.out.println(name[cnt]+"\t"+arr[cnt][0]+"\t"+arr[cnt][1]);
		cnt=0;
	}else{
		i--;
	}

}



//선생님 정렬  버블정렬
/*
		for(int i=0; i<2; i++)
		{
			for (int j=0;j<2 ;j++ )
			{
				if (arr[j][1]>arr[j+1][1])
				{
					String str=name[j];
					name[j]=name[j+1];
					name[j+1]=str;

					int k=arr[j][0];
					arr[j][0] =arr[j+1][0];
					arr[j+1][0]=k;

					k=arr[j][1];
					arr[j][1] =arr[j+1][1];
					arr[j+1][1]=k;
				}
			}
		}
*/


/*


for (int i=0,cnt=0 ;i<3;i++,cnt++)
{

	System.out.println(name[i]+"\t"+arr[cnt][0]+"\t"+arr[cnt][1]);
	
	
}

*/
	}
}
