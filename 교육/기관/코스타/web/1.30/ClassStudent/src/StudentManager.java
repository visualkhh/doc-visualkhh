import java.io.*;
import java.util.*;


class Ordersort
{
	public Ordersort()
	{	
	}
	
	public void rankingsort(Student student[]) 
	{
		  //��ŷ ����
		
		  for(int i=0,ranking=1;i<student.length;i++)
		  {
			  
			  for(int y=0;y<student.length;y++)
			  {
				  if(student[i].avg<student[y].avg)
					  {ranking++;}
				 
			  }				  
			student[i].order=ranking;
			
			ranking=1;
		  }
  
	
	}
	
	public void sortprint(Student student[]) 
	{
		  //���� ���
		  for(int i =0,y=1 ;i<student.length; i++)
		  {
			  int temp=student[i].order;
			  
			  if(temp==y )
			  {					  
				  System.out.println(student[i].number+"\t"+student[i].name+"\t"+student[i].kor+"\t"+student[i].eng+"\t"+student[i].mat+"\t"+student[i].sum+"\t"+student[i].avg+"\t"+student[i].charpoint+"\t"+student[i].order);
				  System.out.println();  
				  
				  y++;
				  i=-1;  
			  }
		  } //for end
		
	}
	
	
	public void searchprint(Student student[],int input) 
	{
		  int index = 0;
		  for(int i=0;i<student.length;i++)
		  {
			  if(student[i].number==input)
			  {
				  index=i;
				  System.out.println(student[i].number+"\t"+student[i].name+"\t"+student[i].kor+"\t"+student[i].eng+"\t"+student[i].mat+"\t"+student[i].sum+"\t"+student[i].avg+"\t"+student[i].charpoint+"\t"+student[i].order);
				 break;
			  }else
			  {
				  index=student.length+500; //���ý� ���� �й��ΰ�챸�� �ϱ����� �л������� ����500���� �ø���.
			  }
	
		  }
		  
		 if(index==student.length+500)
		 {
		 System.out.println("�й��� ���� �л��Դϴ� �ٽ� �Է����ּ���.");   //���ٵǸ� �ٽ� �޴�	  
		 }
		 
	}
	
	public void deletestudent(Student student[],int input)
	{
	
		student[input].delete();
		System.out.println("\n*******�����Ϸ�*****������ȸ���� Ȯ���ϼ���");
	
	}
	
	
	
}


abstract class Student //�л� �������� ����
{
	int number;
	String name;
	int kor;
	int eng;
	int mat;
	int sum;
	double avg;
	char charpoint;
	int order;

	
	abstract void print();
	abstract int sum();
	abstract double avg(int i);
	abstract void delete();

	
	Student(int number, String name, int kor, int eng, int mat, int sum,char charpoint, int avg)
	{
		this.number=number;
		this.name=name;
		this.kor=kor;
		this.eng=eng;
		this.mat=mat;
		this.mat=mat;
		this.charpoint=charpoint;
		this.avg=avg;
		
	}
}

class Inputinformation extends Student//�����Է�
{
	//�й� �̸�  ���� ���� ���� ���� ��� ���� ��� 

	
	public Inputinformation(int number, String name, int kor, int eng, int mat, int sum,char charpoint, int avg)
	{
		super(number, name, kor, eng, mat, sum, charpoint,avg);
	
	}


	//@Override
	void print() {
		System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���"); 
		System.out.println(number+"\t"+name+"\t"+kor+"\t"+eng+"\t"+mat+"\t"+sum+"\t"+avg+"\t"+charpoint+"\t"+order);

	}
	
	
	//@Override
	void delete()
	{
		number=0;
		name="_";
		kor=0;
		eng=0;
		mat=0;
		sum=0;
		avg=0;
		charpoint='_';
		order=-10;
	}


	//@Override
	double avg(int i) {
		avg=sum/i;
		return avg;
		
	}


	//@Override
	int sum() {
		sum=kor+eng+mat;
		return sum;
		
	}






}


class  StudentManager{
	public static void main(String[] args)throws IOException{


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
		  
		  Student []student =new Student[maxstudent];
		  Ordersort ordersort =new Ordersort();
		  
		  
		  //�ʱ�ȭ
		  for(int i=0;i<maxstudent;i++)
		  {
			  for(int y=0;y<student.length;y++)
			  {
				 student[i]=new Inputinformation(0,"_", 0, 0, 0, 0,'_', 0);
			  } 
		  }  
		  
		  
		  while(true)
		  {
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
				  student[presentPoint].number=presentPoint;  //�й��Է�
				  
				  
				  System.out.print("�̸� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint].name=sc.next();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint].kor=sc.nextInt();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint].eng=sc.nextInt();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  student[presentPoint].mat=sc.nextInt();
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  input = student[presentPoint].sum();
				  System.out.println(input);
				  
				  
				  System.out.print("��� �Է�");
				  System.out.print(" INPUT:>");
				  
				  
				  System.out.println(student[presentPoint].avg(3));
				  
				  System.out.print("���� �Է�");
				  System.out.print(" INPUT:>");
				  
				  if(student[presentPoint].avg>=90)student[presentPoint].charpoint='A';
				  else if(student[presentPoint].avg>=80)student[presentPoint].charpoint='B';
				  else if(student[presentPoint].avg>=70)student[presentPoint].charpoint='C';
				  else if(student[presentPoint].avg>=60)student[presentPoint].charpoint='D';
				  else if(student[presentPoint].avg>=50)student[presentPoint].charpoint='E';
				  else if(student[presentPoint].avg>=40)student[presentPoint].charpoint='F';
				  else student[presentPoint].charpoint='Z';
				  
				  System.out.println(student[presentPoint].charpoint);
				  
			  				  
				  presentPoint++;
				  
								  

			  }else if(imenu==2)//��缺����ȸ
			  {

				  ordersort.rankingsort(student);
				  System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���"); 
				  ordersort.sortprint(student);
				  
				  
				   
			  }else if(imenu==3)//�����˻�
			  {
				  
				  
				  System.out.print("�˻��� �й��� �Է����ּ���");
				  System.out.print(" INPUT:>");
				  input =sc.nextInt();
				  System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���");
				  ordersort.searchprint(student,input);
				  
				  
			  
				  
			  }else if(imenu==4)//��������
			  {
				
				  System.out.print("������ �й��� �Է����ּ���");
				  System.out.print(" INPUT:>");
				  input =sc.nextInt();
				  System.out.println("�й�\t�̸�\t����\t����\t����\t����\t���\t����\t���");
				  ordersort.searchprint(student,input);
				  ordersort.deletestudent(student, input);
				  

			  }else if(imenu==0)
			  {
				  System.out.println("���α׷��� ���� �մϴ�.");
				  break;  
			  }else
			  {
				  System.out.println("����� �Է����ּ���");
				  
			  } //if end
			  

			  
			  
			  
		  }//end while 
		  
		  
	}
}


