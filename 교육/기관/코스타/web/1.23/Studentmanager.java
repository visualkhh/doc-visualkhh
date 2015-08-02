import java.util.Scanner;
import java.io.*;
class Studentmanager{
	public static void main(String[] args)throws IOException{

	Scanner sc=new Scanner(System.in);
	String student[][];
	int maxstudent=0; //총학생 허용수
	int realstudent=0;//현재입력된학생
	int nextstudent=0; //다음입력 학생
	
	
	


System.out.println("*************************************");
System.out.println("**********성적관리프로그램**********");
System.out.println("*************************************\n");


	System.out.println("\t안녕하세요 성적관리프로그램 입니다환영합니다 \n\t 성적을 작성할 최대학생수를 입력하세요");
	maxstudent=sc.nextInt();
	System.out.println("출력"+maxstudent);

	student=new String[maxstudent][8];
while(true)
{
	System.out.println("\t 1) 성적입력\t key: 1");
	System.out.println("\t 2) 성적표출력\t key: 2");
	System.out.println("\t 3) 검색\t key: 3");
	System.out.println("\t 3) 종료EXIT\t key: 0");

	int input =System.in.read()-48;
	System.in.skip(2);




	if( input == 1 )  //성적입력
	{


		if(nextstudent>maxstudent)
		{
			System.out.println("기록허용 학생수가 초가 하였습니다");
			continue;

		}
//	0		1		2		3		4		5		6		7
//	1		2		3		4		5		6		7		8	
//	이름	수학	국어	영어	총점	평균	학점	등수
	System.out.print("이    름 : ");
	String name=sc.next();
	student[nextstudent][0]=name;

	System.out.print("수학점수 : ");
	String mat=sc.next();
	student[nextstudent][1]=mat;

	System.out.print("국어점수 : ");
	String kor=sc.next();
	student[nextstudent][2]=kor;

	System.out.print("영어점수 : ");
	String eng=sc.next();
	student[nextstudent][3]=eng;


	String sum=Integer.toString(
		(Integer.parseInt(mat)+Integer.parseInt(kor)+Integer.parseInt(eng))
								);
	student[nextstudent][4]=sum;
	System.out.println("총점점수 : "+sum);



	String avg=Integer.toString(
		(Integer.parseInt(mat)+Integer.parseInt(kor)+Integer.parseInt(eng))/3
								);
	student[nextstudent][5]=avg;
	System.out.println("평균점수 : "+avg);
	


String hak;
	if(Integer.parseInt(avg)>=90){hak="A";}
	else if(Integer.parseInt(avg)>=80){hak="B";}
	else if(Integer.parseInt(avg)>=70){hak="C";}
	else if(Integer.parseInt(avg)>=60){hak="D";}
	else if(Integer.parseInt(avg)>=50){hak="E";}
	else if(Integer.parseInt(avg)>=40){hak="F";}
	else {hak="학고";}

	student[nextstudent][6]=hak;
	System.out.println("학  점 : "+hak);

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
	else if( input == 2 )//성적표출력
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



System.out.println("이름\t수학\t국어\t영어\t총점\t평균\t학점\t등수");
					for(int i=0; i<student.length;i++)
					{
						for(int y=0;y<student[i].length;y++)
						{
							System.out.print(student[i][y]+"\t");
						}
					System.out.print("\n");
					}

	}
	else if( input == 3 )//검색
	{

	}
	else if( input == 0 )//종료
	{

		break;
	}
	else
	{
			System.out.println("\t 잘못입력하였습니다. 다시한번 시도해주세요");
	}
}
	
	
	
	}
}
