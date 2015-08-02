import java.util.Random;
class randomcode{
	public static void main(String[] args){
		System.out.println("randomcode!");


	java.util.Random ran = new java.util.Random();
		int cont=65;

		while(cont<91)
		{int x=(ran.nextInt(25+1)+65);
		//System.out.println(x);
			if(cont==x)
			{
				System.out.println((char)x);
				cont++;
			}

		}



String five[] =new String [20];
	System.out.println("쿠폰 오만원짜리");

		for(int i=0 ;i<five.length;i++)
		{
				for(int y=0; y<10;y++)
				{
					if(five[i]==null)five[i]="";
					char temp= (char)(ran.nextInt(25+1)+65);
					five[i]=five[i]+=temp;

					if((y+1)%5==0)
					{
						if(y==9){}
						else{
						five[i]=five[i]+='-';
						}

					}
				}


			for(int z=0; z<i; z++)   //중복검사
			{
				if(five[i].equals(five[z]))
				{
					System.out.println("겹친것이 있었습니다");
					i--;
					break;

				}

			}

		}




		for(int i=0 ;i<five.length;i++)
		{
		System.out.print(five[i]+"\t\t");
		if((i+1)%5==0){
					System.out.println();
		}
		}









String fives[] =new String [100];

five =fives;
	System.out.println("쿠폰 100장");

		for(int i=0 ;i<five.length;i++)
		{
				for(int y=0; y<10;y++)
				{
					if(five[i]==null)five[i]="";
					char temp= (char)(ran.nextInt(25+1)+65);
					five[i]=five[i]+=temp;

					if((y+1)%5==0)
					{
						if(y==9){}
						else{
						five[i]=five[i]+='-';
						}

					}
				}


			for(int z=0; z<i; z++)   //중복검사
			{
				if(five[i].equals(five[z]))
				{
					System.out.println("겹친것이 있었습니다");
					i--;
					break;

				}

			}

		}




		for(int i=0 ;i<five.length;i++)
		{
		System.out.print(five[i]+"\t\t");
		if((i+1)%5==0){
					System.out.println();
		}
		}







	}
}
