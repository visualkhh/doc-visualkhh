import java.util.Scanner;
import java.io.*;
class Studentmanager{
	public static void main(String[] args)throws IOException{

	Scanner sc=new Scanner(System.in);
	String student[][];
	int maxstudent=0; //���л� ����
	int realstudent=0;//�����Էµ��л�
	int nextstudent=0; //�����Է� �л�
	
	
	


System.out.println("*************************************");
System.out.println("**********�����������α׷�**********");
System.out.println("*************************************\n");


	System.out.println("\t�ȳ��ϼ��� �����������α׷� �Դϴ�ȯ���մϴ� \n\t ������ �ۼ��� �ִ��л����� �Է��ϼ���");
	maxstudent=sc.nextInt();
	System.out.println("���"+maxstudent);

	student=new String[maxstudent][8];
while(true)
{
	System.out.println("\t 1) �����Է�\t key: 1");
	System.out.println("\t 2) ����ǥ���\t key: 2");
	System.out.println("\t 3) �˻�\t key: 3");
	System.out.println("\t 3) ����EXIT\t key: 0");

	int input =System.in.read()-48;
	System.in.skip(2);




	if( input == 1 )  //�����Է�
	{


		if(nextstudent>maxstudent)
		{
			System.out.println("������ �л����� �ʰ� �Ͽ����ϴ�");
			continue;

		}
//	0		1		2		3		4		5		6		7
//	1		2		3		4		5		6		7		8	
//	�̸�	����	����	����	����	���	����	���
	System.out.print("��    �� : ");
	String name=sc.next();
	student[nextstudent][0]=name;

	System.out.print("�������� : ");
	String mat=sc.next();
	student[nextstudent][1]=mat;

	System.out.print("�������� : ");
	String kor=sc.next();
	student[nextstudent][2]=kor;

	System.out.print("�������� : ");
	String eng=sc.next();
	student[nextstudent][3]=eng;


	String sum=Integer.toString(
		(Integer.parseInt(mat)+Integer.parseInt(kor)+Integer.parseInt(eng))
								);
	student[nextstudent][4]=sum;
	System.out.println("�������� : "+sum);



	String avg=Integer.toString(
		(Integer.parseInt(mat)+Integer.parseInt(kor)+Integer.parseInt(eng))/3
								);
	student[nextstudent][5]=avg;
	System.out.println("������� : "+avg);
	


String hak;
	if(Integer.parseInt(avg)>=90){hak="A";}
	else if(Integer.parseInt(avg)>=80){hak="B";}
	else if(Integer.parseInt(avg)>=70){hak="C";}
	else if(Integer.parseInt(avg)>=60){hak="D";}
	else if(Integer.parseInt(avg)>=50){hak="E";}
	else if(Integer.parseInt(avg)>=40){hak="F";}
	else {hak="�а�";}

	student[nextstudent][6]=hak;
	System.out.println("��  �� : "+hak);

	nextstudent++;






				/*	for(int i=0; i<student.length;i++)
					{
						for(int y=0;y<student[i].length;y++)
						{
							System.out.print(student[i][y]+"\t");
						}
	System.out.print("\n");
					}  */


	}
	else if( input == 2 )//����ǥ���
	{

/*

			for(int i=0;i<maxstudent;i++)
			{
				student[i][7]=Integer.toString(Integer.parseInt(student[i][7])+1);
				
				for(int j=0;j<maxstudent;j++)
				{
					if (Integer.parseInt(student[i][5])<Integer.parseInt(student[j][5]))
					{

						student[i][7]=Integer.toString(Integer.parseInt(student[i][7])+=1);
					}
				}
			}

*/



System.out.println("�̸�\t����\t����\t����\t����\t���\t����\t���");
					for(int i=0; i<student.length;i++)
					{
						for(int y=0;y<student[i].length;y++)
						{
							System.out.print(student[i][y]+"\t");
						}
					System.out.print("\n");
					}

	}
	else if( input == 3 )//�˻�
	{

	}
	else if( input == 0 )//����
	{

		break;
	}
	else
	{
			System.out.println("\t �߸��Է��Ͽ����ϴ�. �ٽ��ѹ� �õ����ּ���");
	}
}
	
	
	
	}
}
