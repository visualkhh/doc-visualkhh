import java.io.*;
class ArrayTest{




public static void main(String[] args) throws IOException{





System.out.println("10�� ���� �Է�");
int arr[] =new int[10];



	int temp=0;


for(int i=0; i<10;i++)
		{
	int a;
	a=System.in.read()-48;
	System.in.skip(2);
	arr[i]=a;

temp+=arr[i];
		}


for(int i=0; i<10;i++)
		{

	System.out.print(arr[i]+"\t");


		}
	System.out.print("="+temp+"�հ�");

		
System.out.println("");
System.out.println("3��  �Է�");








char name[] =new char[3];

for(int i=0; i<3;i++)
		{
	
	char in;

	in=(char)System.in.read();
	System.in.skip(4);

	name[i]=in;


		}


for(int i=0;i<3;i++)
	{
System.out.print(name[i]);
	}


	}
}
