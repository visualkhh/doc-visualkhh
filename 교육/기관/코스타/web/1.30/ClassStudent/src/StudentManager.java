import java.io.*;
import java.util.*;


class Ordersort
{
	public Ordersort()
	{	
	}
	
	public void rankingsort(Student student[]) 
	{
		  //랭킹 정의
		
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
		  //정렬 출력
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
				  index=student.length+500; //선택시 없는 학번인경우구별 하기위해 학생수보다 임의500높게 올린다.
			  }
	
		  }
		  
		 if(index==student.length+500)
		 {
		 System.out.println("학번이 없는 학생입니다 다시 입력해주세요.");   //오바되면 다시 메뉴	  
		 }
		 
	}
	
	public void deletestudent(Student student[],int input)
	{
	
		student[input].delete();
		System.out.println("\n*******삭제완료*****성적조회에서 확인하세요");
	
	}
	
	
	
}


abstract class Student //학생 오리지날 정보
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

class Inputinformation extends Student//정보입력
{
	//학번 이름  국어 영어 수학 총점 평균 학점 등수 

	
	public Inputinformation(int number, String name, int kor, int eng, int mat, int sum,char charpoint, int avg)
	{
		super(number, name, kor, eng, mat, sum, charpoint,avg);
	
	}


	//@Override
	void print() {
		System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수"); 
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


		int maxstudent=0; //최대학생수
		int imenu=0;	//선택메뉴
		int presentPoint=0;//현재학생
		int input; //입력받는변수
		  Scanner sc = new Scanner(System.in);

		  System.out.println("*************VisualHHK**************");
		  System.out.println("**********성적 관리 프로그램**********");
		  System.out.println("************************************");
		  System.out.println("                               version 1.0\n\n");
		  System.out.println("안녕하세요 프로그램을 처음 구동하셨습니다.");
		  System.out.print("최대 작성가능한 학생수를 입력해주세요 \n INPUT:>");
		  
		  
		  //1	2	3	4	5	6	7	8	9	갯수
		  //0	1	2	3	4	5	6	7	8	첨자
        //학번 이름  국어 영어 수학 총점 평균 학점 등수 
		  maxstudent =sc.nextInt();
		  
		  Student []student =new Student[maxstudent];
		  Ordersort ordersort =new Ordersort();
		  
		  
		  //초기화
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
			  System.out.println("1: 성적입력\t keyInput: 1");
			  System.out.println("2: 성적조회\t keyInput: 2");
			  System.out.println("3: 성적검색\t keyInput: 3");
			  System.out.println("4: 성적삭제\t keyInput: 4");
			  System.out.println("0: 종   료\t keyInput: 0");
			  System.out.print(" INPUT:>");
			  imenu = sc.nextInt();
			  
			  
			  
			  if(imenu==1)//성적입력
			  {
				 				  
				  
				  if(maxstudent==presentPoint)
				  {
				  System.out.println("추가할수있는 인원이 초가하였습니다");
				  continue;
				  }
				  
				  
				//1	2	3	4	5	6	7	8	9	갯수
				  //0	1	2	3	4	5	6	7	8	첨자
		        //학번 이름  국어 영어 수학 총점 평균 학점 등수 
				  student[presentPoint].number=presentPoint;  //학번입력
				  
				  
				  System.out.print("이름 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint].name=sc.next();
				  
				  System.out.print("국어 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint].kor=sc.nextInt();
				  
				  System.out.print("영어 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint].eng=sc.nextInt();
				  
				  System.out.print("수학 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint].mat=sc.nextInt();
				  
				  System.out.print("총점 입력");
				  System.out.print(" INPUT:>");
				  input = student[presentPoint].sum();
				  System.out.println(input);
				  
				  
				  System.out.print("평균 입력");
				  System.out.print(" INPUT:>");
				  
				  
				  System.out.println(student[presentPoint].avg(3));
				  
				  System.out.print("학점 입력");
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
				  
								  

			  }else if(imenu==2)//모든성적조회
			  {

				  ordersort.rankingsort(student);
				  System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수"); 
				  ordersort.sortprint(student);
				  
				  
				   
			  }else if(imenu==3)//성적검색
			  {
				  
				  
				  System.out.print("검색할 학번을 입력해주세요");
				  System.out.print(" INPUT:>");
				  input =sc.nextInt();
				  System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수");
				  ordersort.searchprint(student,input);
				  
				  
			  
				  
			  }else if(imenu==4)//성적삭제
			  {
				
				  System.out.print("삭제할 학번을 입력해주세요");
				  System.out.print(" INPUT:>");
				  input =sc.nextInt();
				  System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수");
				  ordersort.searchprint(student,input);
				  ordersort.deletestudent(student, input);
				  

			  }else if(imenu==0)
			  {
				  System.out.println("프로그램을 종료 합니다.");
				  break;  
			  }else
			  {
				  System.out.println("제대로 입력해주세요");
				  
			  } //if end
			  

			  
			  
			  
		  }//end while 
		  
		  
	}
}


