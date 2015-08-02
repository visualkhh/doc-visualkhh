
import java.io.*;

class WhileTest2{

public static void main(String[] args) throws IOException{

		System.out.println("KeyInput");
		int i=0,cnt=0,sum=0;

i=System.in.read()-48;


		while(i!=0)
		{

sum+=i;

System.in.skip(4);

i=System.in.read()-48;


		}

		System.out.println(sum);


//1ºÎÅÍ 10±îÁö Â¦¼öÈ¦ÀÇ °¹¼ö ÇÕ À» Ãâ·Â
cnt=0;sum=0;

i=1;

int sumh=0; int cnth=0;



while(i<=10)
	{
						if(i%2==0)
						{
							cnt++; sum+=i; //Â¦
						}
						else
						{
							sumh+=i; cnth++;	//È¦
							
						}
			
			
			i++;

	}


		System.out.println("Â¦¼ö°¹¼ö"+cnt+"ÀÌ¸ç ÇÕÀº"+sum);
		System.out.println("È¦°¹¼ö"+cnth+"ÀÌ¸ç ÇÕÀº"+sumh);

}
}