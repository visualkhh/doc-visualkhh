
import java.io.*;
class binarysearch
{
	public static void main(String[] args) throws IOException{
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
