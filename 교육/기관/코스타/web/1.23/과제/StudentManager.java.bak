import java.io.*;
import java.util.*;
public class StudentManager {


	public static void main(String[] args)throws IOException {
		// TODO Auto-generated method stub

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
		  
		  String [][]student =new String[maxstudent][9];

		  //초기화
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
				  student[presentPoint][0]=Integer.toString(presentPoint);  //학번입력
				  
				  
				  System.out.print("이름 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint][1]=sc.next();
				  
				  System.out.print("국어 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint][2]=sc.next();
				  
				  System.out.print("영어 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint][3]=sc.next();
				  
				  System.out.print("수학 입력");
				  System.out.print(" INPUT:>");
				  student[presentPoint][4]=sc.next();
				  
				  System.out.print("총점 입력");
				  System.out.print(" INPUT:>");
				  input = Integer.parseInt(student[presentPoint][2])  +Integer.parseInt(student[presentPoint][3])  +Integer.parseInt(student[presentPoint][4]);
				  student[presentPoint][5]=Integer.toString(input);
				  System.out.println(input);
				  
				  
				  System.out.print("평균 입력");
				  System.out.print(" INPUT:>");
				  input=input/3; 
				  student[presentPoint][6]=Integer.toString(input);
				  System.out.println(input);
				  
				  System.out.print("학점 입력");
				  System.out.print(" INPUT:>");
				  
				  if(input>=90)student[presentPoint][7]="A";
				  else if(input>=80)student[presentPoint][7]="B";
				  else if(input>=70)student[presentPoint][7]="C";
				  else if(input>=60)student[presentPoint][7]="D";
				  else if(input>=50)student[presentPoint][7]="E";
				  else if(input>=40)student[presentPoint][7]="F";
				  else student[presentPoint][7]="학고";
				  
				  System.out.println(student[presentPoint][7]);
				  
			  				  
				  presentPoint++;
				  

			  }else if(imenu==2)//성적조회
			  {
				  
				  

					
				  
				  System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수"); 
				  
				  
		  
				  			  
				  
				 
				  //정렬 출력
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
				
				  
				   
			  }else if(imenu==3)//성적검색
			  {
				  
				  
				  System.out.print("검색할 학번을 입력해주세요");
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
						  index=maxstudent+500; //선택시 없는 학번인경우구별 하기위해 학생수보다 임의500높게 올린다.
					  }
			
				  }
				  
				 if(index==maxstudent+500)
				 {
				 System.out.println("학번이 없는 학생입니다 다시 입력해주세요.");  continue; //오바되면 다시 메뉴	  
				 }
				 
				 
				 
				 
					
				System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수");
				for(int i=0;i<student[index].length;i++)
				{
				System.out.print(student[index][i]+"\t");
				}
				
				
				
				
				System.out.println();
				  
				  
			  }else if(imenu==4)//성적삭제
			  {
				
				  
				  System.out.print("삭제할 학번을 입력해주세요");
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
						  index=maxstudent+500; //선택시 없는 학번인경우 임의+500 .
					  }

				  }
				  
					 if(index==maxstudent+500)
					 {
					 System.out.println("학번이 없는 학생입니다 다시 입력해주세요.");  continue; //오바되면 다시 메뉴	  
					 }
					 
				System.out.println("학번\t이름\t국어\t영어\t수학\t총점\t평균\t학점\t등수");
				for(int i=0;i<student[index].length;i++)
				{student[index][i]="0";
				System.out.print(student[index][i]+"\t");
				}
				System.out.println("\n*******삭제완료*****성적조회에서 확인하세요");
				
				  
				  
				  
			  }else if(imenu==0)
			  {
				  System.out.println("프로그램을 종료 합니다.");
				  break;  
			  }else
			  {
				  System.out.println("제대로 입력해주세요");
				  
			  } //if end
			  
			  
			  
			  
			  //랭킹 정의
			  for(int i=0,ranking=1;i<maxstudent;i++)
			  {
				  
				  for(int y=0;y<maxstudent;y++)
				  {
					  if(Integer.parseInt(student[i][6])<Integer.parseInt(student[y][6]))
						  {ranking++;}
					  else if(Integer.parseInt(student[i][6])==Integer.parseInt(student[y][6]))
					  {
						  student[y][6]=Integer.toString(Integer.parseInt(student[y][6])+1);	//등수차별을위해 (동점자를위해)평균점을 하나씩늘려줌	  
					  }
				  }				  
				student[i][8]=Integer.toString(ranking);
				
				ranking=1;
			  }
			  
			  
			  
}catch(Exception e)
{
	System.out.print("입력오류났습니다 다시한번 입력하세요");
	sc.close();
	
	
}
			  	  
		  } //while END
		  
		  
		  

		  
		  
		  sc.close();
		  

	}

}
