class ExclusiveOr{
	public static void main(String[] args){

int data=35786;
int key=12377;

int encode=data^key;

System.out.println(encode);

//2진 변환
bits(data);
bits(key);


String info="홍길동 엑스맨";
String keys="gggaaaasdasd";
char a='o';
char b='a';
int result=a^b;
bits(a);
bits(b);
bits(result);

//암호화!!!!!! OXR암호화
System.out.println(info.length());

StringBuffer tot=new StringBuffer();
		for(int i=0,y=0;i<info.length();i++,y++)
		{
			System.out.print((char)(info.charAt(i)^keys.charAt(y)));

			tot.append((char)(info.charAt(i)^keys.charAt(y)));
				
				if (y%keys.length()-1==0)
				{
					y=0;
				}

		}

System.out.println();




//복호화!!!!!! OXR복호화
		for(int i=0,y=0;i<info.length();i++,y++)
		{
			System.out.print((char)(tot.charAt(i)^keys.charAt(y)));

				
				if (y%keys.length()-1==0)
				{
					y=0;
				}

		}
System.out.println();

System.out.println(tot);





	}


static public  void bits(int i)
	{

		int temp=i;
	String result="";

		while(true)
		{

			if(temp==0)
				{
				System.out.println(result);
				break;
				}



				result=temp%2+result;
				temp=temp/2;
				
		}
	

	}

}
