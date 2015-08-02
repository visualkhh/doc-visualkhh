import java.util.*;
import java.io.*;
/*
{"홍길동","서울","낚시"},{"임꺽정","제주도","등산"},{"마틸다","뉴욕","오표수집"},{"레옹","파리","청소"};

실행예
이름: 레용 엔터
검색결과 이름 레용 
			주소 파리
			취미 청소

			계속하시겠습니까 y/n: N
*/


class BinarySearch
{
	public static void main(String[] args) throws IOException
	{
		String [][] info={
				{"홍길동","서울","낚시"},
				{"임꺽정","제주도","등산"},
				{"마틸다","뉴욕","오표수집"},
				{"레옹","파리","청소"}
							};
//정렬전
System.out.println("/////////////정렬전//////////");
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


//정렬후
System.out.println("/////////////정렬후//////////");
for(int i=0;i<4;i++){
System.out.println(info[i][0]);
}

System.out.println("/////////////////////////////////");
boolean loop=true;
while(loop){
			System.out.print("검색할 사람이름을 입력: ");
			Scanner sc=new Scanner(System.in);
			String search=sc.next();


int low=0,mid=0,high=info.length-1; //시작 중간 끝 위치

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

				System.out.print(mid+"번째에서 찾음");

				System.out.println("결과 \n   이름: "+info[mid][0]);
				System.out.println("   주소: "+info[mid][1]);
				System.out.println("   취미: "+info[mid][2]);


		}else{
			System.out.print("못찾음");
		}
		

System.out.println("계속하시겠습니까 tip 잘못입력시 종료 y/n : ");
String input =sc.next();   
loop=input.equals("Y")||input.equals("y") ? true : false;
}

							
	}
}
