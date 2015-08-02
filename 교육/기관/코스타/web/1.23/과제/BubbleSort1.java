import java.io.*;
class BubbleSort1{
	public static void main(String[] args) throws IOException{
		System.out.println("Hello World!");



		int data[]={45,34,46,456,56,5,2};
	//	int data[]={2,5,34,45,46,56,456};

System.out.println("data값은 1~ "+(Integer.MAX_VALUE-1)+" 까지 있을수있습니다.");

	int temp=Integer.MAX_VALUE;



		for(int i=0;i<data.length;i++)
		{
			System.out.print(data[i]+"\t");
		}

		System.out.println("\n\nBubbleSort!after");



		for(int i=0; i<data.length-1; i++)
		{
			
			for(int j=0 ; j<data.length-i-1;j++)
			{
				if(data[j] >data[j+1])
				{
					temp=data[j+1];
					data[j+1]=data[j];
					data[j]=temp;

				}else if(temp==Integer.MAX_VALUE)
				{
					break;
				}


								
			}



		}



		for(int i=0;i<data.length;i++)
		{
			System.out.print(data[i]+"\t");
		}

		System.out.println("\n\nBubbleSort!after");




//이분검색;;;;;;;;;;;;;;시작

	


//		int datas[]=data;
//		int search=System.in.read()-48;

		int datas[]={'a','b','c','d','e','f','g','h','i','j','k'};		
		char search=(char)System.in.read();


		System.out.println("\n\n이분검색시작");

int low=0,mid=0,high=datas.length-1; //시작 중간 끝 위치

boolean sw=false;


	while(high>=low)
		{
			mid=(low+high)/2;

			if(datas[mid]==search)
			{
				sw=true;
				break;
			}
			
			if(datas[mid]>search)
			{
				high=mid-1;
			}else
			{
				low=mid+1;
			}

		}


		if(sw==true)
		{
			System.out.print(mid+"번째에서 찾음");
		}else{
			System.out.print("못찾음");
		}






	}
}
