import java.io.*;
import java.util.*;
public class StudentManager {


	public static void main(String[] args)throws IOException {
		// TODO Auto-generated method stub

		int maxstudent=0; //�ִ��л���
		int imenu=0;	//���ø޴�
		int presentPoint=0;//�����л�
		int input; //�Է¹޴º���
		  Scanner sc = new Scanner(System.in);
		  System.out.println("*************VisualHHK**************");
		  System.out.println("**********���� ���� ���α׷�**********");
		  System.out.println("************************************");
		  System.out.println("                               version 1.0\n\n");
		  System.out.println("�ȳ��ϼ��� ���α׷��� ó�� �����ϼ̽��ϴ�.");
		  System.out.print("�ִ� �ۼ������� �л����� �Է����ּ��� \n INPUT:>");
		  
		  
		  //1	2	3	4	5	6	7	8	9	����
		  //0	1	2	3	4	5	6	7	8	÷��
        //�й� �̸�  ���� ���� ���� ���� ��� ���� ��� 
		  maxstudent =sc.nextInt();
		  
		  String [][]student =new String[maxstudent][9];

		  //�ʱ�ȭ
		  for(int i=0;i<maxstudent;i++)
		  {
			  for(int y=0;y<student[i].length;y++)
			  {
				 student[i][y]="0";
			  } 
		  }
		  
		  
		  
		  
		  while(true)
		  {
			  

			  

try{		  
			  
			  
			  
			  
			  System.out.println("*menu*");
			  System.out.println("1: �����Է�\t keyInput: 1");
			  System.out.println("2: ������ȸ\t keyInput: 2");
			  System.out.println("3: �����˻�\t keyInput: 3");
			  System.out.println("4: ��������\t keyInput: 4");
			  System.out.println("0: ��   ��\t keyInput: 0");
			  System.out.print(" INPUT:>");
			  imenu = sc.nextInt();
			  
		  
			  if(imenu==1)//�����Է�
			  {
				  if(maxstudent==presentPoint)
					  {
					  System.out.println("�߰��Ҽ��ִ� �ο��� �ʰ��Ͽ����ϴ�");
					  continue;
					  }
				  
				  
				  //1	2	3	4	5	6	7	8	9	����
				  //0	1	2	3	4	5	6	7	8	÷��
		        //�й� �̸�  ���� ���� ���� ���� ��� ���� ��� 
				  student[presentPoint][0]=Integer.toString(presentPoint);  //�й��Է�
				  
				  
				  System.out.print("�̸� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint][1]=sc.next();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint][2]=sc.next();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint][3]=sc.next();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint][4]=sc.next();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  input = Integer.parseInt(student[presentPoint][2])  +Integer.parseInt(student[presentPoint][3])  +Integer.parseInt(student[presentPoint][4]);
				  student[presentPoint][5]=Integer.toString(input);
				  System.out.println(input);
				  
				  
				  System.out.print("��� �Է�");
				  System.out.print(" INPUT:>");
				  input=input/3; 
				  student[presentPoint][6]=Integer.toString(input);
				  System.out.println(input);
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  
				  if(input>=90)student[presentPoint][7]="A";
				  else if(input>=80)student[presentPoint][7]="B";
				  else if(input>=70)student[presentPoint][7]="C";
				  else if(input>=60)student[presentPoint][7]="D";
				  else if(input>=50)student[presentPoint][7]="E";
				  else if(input>=40)student[presentPoint][7]="F";
				  else student[presentPoint][7]="�а�";
				  
				  System.out.println(student[presentPoint][7]);
				  
			  				  
				  presentPoint++;
				  

			  }else if(imenu==2)//������ȸ
			  {
				  
				  

					
				  
				  System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���"); 
				  
				  
		  
				  			  
				  
				 
				  //���� ���
				  for(int i =0,y=1 ;i<maxstudent; i++)
				  {
					  int temp=Integer.parseInt(student[i][8]);
					  
					  if(temp==y )
					  {					  
						  
						  
						  
							  for(int z=0;z<student[i].length;z++)
							   {
								   System.out.print(student[i][z]+"\t");
							   }
							  System.out.println();  
						  
						  y++;
						  i=-1;  
					  }
				  } //for end
				
				  
				   
			  }else if(imenu==3)//�����˻�
			  {
				  
				  
				  System.out.print("�˻��� �й��� �Է����ּ���");
				  System.out.print(" INPUT:>");
				  
				  input =sc.nextInt();
				  
				  
				  
				  
				  int index = 0;
				  for(int y=0;y<maxstudent;y++)
				  {
					  if(Integer.parseInt(student[y][0])==input)
					  {
						  index=y;
						 break;
					  }else
					  {
						  index=maxstudent+500; //���ý� ���� �й��ΰ�챸�� �ϱ����� �л������� ����500���� �ø���.
					  }
			
				  }
				  
				 if(index==maxstudent+500)
				 {
				 System.out.println("�й��� ���� �л��Դϴ� �ٽ� �Է����ּ���.");  continue; //���ٵǸ� �ٽ� �޴�	  
				 }
				 
				 
				 
				 
					
				System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���");
				for(int i=0;i<student[index].length;i++)
				{
				System.out.print(student[index][i]+"\t");
				}
				
				
				
				
				System.out.println();
				  
				  
			  }else if(imenu==4)//��������
			  {
				
				  
				  System.out.print("������ �й��� �Է����ּ���");
				  System.out.print(" INPUT:>");
				  
				  input =sc.nextInt();
				  
				  
				  
				  
				  int index = 0;
				  for(int y=0;y<maxstudent;y++)
				  {
					  if(Integer.parseInt(student[y][0])==input)
					  {
						  index=y;
						  break;
					  }else
					  {
						  index=maxstudent+500; //���ý� ���� �й��ΰ�� ����+500 .
					  }

				  }
				  
					 if(index==maxstudent+500)
					 {
					 System.out.println("�й��� ���� �л��Դϴ� �ٽ� �Է����ּ���.");  continue; //���ٵǸ� �ٽ� �޴�	  
					 }
					 
				System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���");
				for(int i=0;i<student[index].length;i++)
				{student[index][i]="0";
				System.out.print(student[index][i]+"\t");
				}
				System.out.println("\n*******�����Ϸ�*****������ȸ���� Ȯ���ϼ���");
				
				  
				  
				  
			  }else if(imenu==0)
			  {
				  System.out.println("���α׷��� ���� �մϴ�.");
				  break;  
			  }else
			  {
				  System.out.println("����� �Է����ּ���");
				  
			  } //if end
			  
			  
			  
			  
			  //��ŷ ����
			  for(int i=0,ranking=1;i<maxstudent;i++)
			  {
				  
				  for(int y=0;y<maxstudent;y++)
				  {
					  if(Integer.parseInt(student[i][6])<Integer.parseInt(student[y][6]))
						  {ranking++;}
					  else if(Integer.parseInt(student[i][6])==Integer.parseInt(student[y][6]))
					  {
						  student[y][6]=Integer.toString(Integer.parseInt(student[y][6])+1);	//������������� (�����ڸ�����)������� �ϳ����÷���	  
					  }
				  }				  
				student[i][8]=Integer.toString(ranking);
				
				ranking=1;
			  }
			  
			  
			  
}catch(Exception e)
{
	System.out.print("�Է¿��������ϴ� �ٽ��ѹ� �Է��ϼ���");
	sc.close();
	
	
}
			  	  
		  } //while END
		  
		  
		  

		  
		  
		  sc.close();
		  

	}

}
