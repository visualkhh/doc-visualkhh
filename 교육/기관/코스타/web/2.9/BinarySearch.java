import java.util.*;
import java.io.*;
/*
{"ȫ�浿","����","����"},{"�Ӳ���","���ֵ�","���"},{"��ƿ��","����","��ǥ����"},{"����","�ĸ�","û��"};

���࿹
�̸�: ���� ����
�˻���� �̸� ���� 
			�ּ� �ĸ�
			��� û��

			����Ͻðڽ��ϱ� y/n: N
*/


class BinarySearch
{
	public static void main(String[] args) throws IOException
	{
		String [][] info={
				{"ȫ�浿","����","����"},
				{"�Ӳ���","���ֵ�","���"},
				{"��ƿ��","����","��ǥ����"},
				{"����","�ĸ�","û��"}
							};
//������
System.out.println("/////////////������//////////");
for(int i=0;i<4;i++){
System.out.println(info[i][0]);
}			

			
			for(int i=0;i<info.length;i++){


					for(int y=0;y<info.length;y++){
						
						if(info[i][0].charAt(0)<info[y][0].charAt(0)){
							String [] temp={"","",""};
							temp[0]=info[i][0];
							temp[1]=info[i][1];
							temp[2]=info[i][2];

							info[i][0] =info[y][0];
							info[i][1] =info[y][1];
							info[i][2] =info[y][2];

							info[y][0] =temp[0];
							info[y][1]=temp[1];
							info[y][2]=temp[2];
						}

					}
			}


//������
System.out.println("/////////////������//////////");
for(int i=0;i<4;i++){
System.out.println(info[i][0]);
}

System.out.println("/////////////////////////////////");
boolean loop=true;
while(loop){
			System.out.print("�˻��� ����̸��� �Է�: ");
			Scanner sc=new Scanner(System.in);
			String search=sc.next();


int low=0,mid=0,high=info.length-1; //���� �߰� �� ��ġ

boolean sw=false;


	while(high>=low)
		{
						mid=(low+high)/2;

		


						if(info[mid][0].equals(search))
						{
							sw=true;
						
							break;
						}
						
						if(info[mid][0].charAt(0)>search.charAt(0))
						{
							
							high=mid-1;
						}else
						{
							
							low=mid+1;
						}

		}

System.out.println("/////////////////////////////////");
		if(sw==true)
		{

				System.out.print(mid+"��°���� ã��");

				System.out.println("��� \n   �̸�: "+info[mid][0]);
				System.out.println("   �ּ�: "+info[mid][1]);
				System.out.println("   ���: "+info[mid][2]);


		}else{
			System.out.print("��ã��");
		}
		

System.out.println("����Ͻðڽ��ϱ� tip �߸��Է½� ���� y/n : ");
String input =sc.next();   
loop=input.equals("Y")||input.equals("y") ? true : false;
}

							
	}
}
