import java.io.*;
class Search1{
	public static void main(String[] args) throws IOException{
		System.out.println("Search1");

		char data[]={'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};



		char input=(char)System.in.read();


for(int i=0;i<data.length;i++)
		{


			if(data[i]==input)
			{
			System.out.print(i+"번째 첨자에서 찾았습니다. 값="+data[i]);
			break;
			}
			else if( i==data.length-1 )
			{
			System.out.print("없어요="+input);break;
			}


		}


	}
}
