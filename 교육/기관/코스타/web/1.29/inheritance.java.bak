import java.io.*;
import java.util.*;

class car
{
	String name;
	String color;
	int wheelnum;
	int spped;



}


class taxi extends car
{
	int meter;
	String isPrivate;


	void settaxi(String name, String color, int wheelnum,int spped, int meter, String isPrivate)
	{

	 this.name=name;
	 this.color=color;
	 this.wheelnum=wheelnum;
	 this.spped=spped;
	 this.meter=meter;
	 this.isPrivate=isPrivate;
	}

}



class truck extends car
{
	double ton;

	void settruck(String name, String color, int wheelnum,int spped, double ton)
	{

	 this.name=name;
	 this.color=color;
	 this.wheelnum=wheelnum;
	 this.spped=spped;
	 this.ton=ton;

	}

}


class trailer extends truck
{
	String company;
	void settrailer(String name, String color, int wheelnum,int spped, double ton,String company)
	{

	 this.name=name;
	 this.color=color;
	 this.wheelnum=wheelnum;
	 this.spped=spped;
	 this.ton=ton;
	 this.company=company;

	}
}


class inheritance {
	public static void main(String[] args)throws IOException {

		System.out.println("Hello World!");
		Scanner sc = new Scanner(System.in);



taxi taxicar=new taxi();
truck truckcar=new truck();
trailer trailercar=new trailer();

while(true)
{		System.out.println("차를 골라주세요\n 1)taxi \n 2)truck\n 3)trailer\n 4)수정\n 0)종료");
		int input=sc.nextInt();

		if(input==1)  //taxi
		{


	System.out.println("[taxicar]");
	System.out.print(" taxicar [name] > ");
	taxicar.name=sc.next();

	System.out.print(" taxicar [color] > ");
	taxicar.color=sc.next();

	System.out.print(" taxicar [wheelnum] > ");
	taxicar.wheelnum=sc.nextInt();

	System.out.print(" taxicar [spped] > ");
	taxicar.spped=sc.nextInt();

	System.out.print(" taxicar [meter] > ");
	taxicar.meter=sc.nextInt(); 

	System.out.print(" taxicar [isPrivate] > ");
	taxicar.isPrivate=sc.next(); 

	System.out.print("\n\n");
	System.out.println("name="+taxicar.name+"\tColor="+taxicar.color+"\twheelnum="+taxicar.wheelnum+"\tspped="+taxicar.spped+"\tmeter="+taxicar.meter+"\tisPrivate="+taxicar.isPrivate);


		}else if(input==2) //truck
		{



	System.out.println("[truckcar]");
	System.out.print(" truckcar [name] > ");
	truckcar.name=sc.next();

	System.out.print(" truckcar [color] > ");
	truckcar.color=sc.next();

	System.out.print(" truckcar [wheelnum] > ");
	truckcar.wheelnum=sc.nextInt();

	System.out.print(" truckcar [spped] > ");
	truckcar.spped=sc.nextInt();

	System.out.print(" truckcar [ton] > ");
	truckcar.ton=sc.nextDouble(); 

	System.out.print("\n\n");
	System.out.println("name="+truckcar.name+"\tColor="+truckcar.color+"\twheelnum="+truckcar.wheelnum+"\tspped="+truckcar.spped+"\tton="+truckcar.ton);


		}else if(input==3)
		{
			

	System.out.println("[trailercar]");
	System.out.print(" trailercar [name] > ");
	trailercar.name=sc.next();

	System.out.print(" trailercar [color] > ");
	trailercar.color=sc.next();

	System.out.print(" trailercar [wheelnum] > ");
	trailercar.wheelnum=sc.nextInt();

	System.out.print(" trailercar [spped] > ");
	trailercar.spped=sc.nextInt();

	System.out.print(" trailercar [ton] > ");
	trailercar.ton=sc.nextDouble(); 

	System.out.print(" trailercar [company] > ");
	trailercar.company=sc.next();

	System.out.print("\n\n");
	System.out.println("name="+trailercar.name+"\tColor="+trailercar.color+"\twheelnum="+trailercar.wheelnum+"\tspped="+trailercar.spped+"\tton="+trailercar.ton+"\t회사="+trailercar.company);



		}else if(input==4)
		{






				if(taxicar.name!=null){
					System.out.println("taxicar 수정 가능(생성완료)");	System.out.println("1)Taxicar]\tname="+taxicar.name+"\tColor="+taxicar.color+"\twheelnum="+taxicar.wheelnum+"\tspped="+taxicar.spped+"\tmeter="+taxicar.meter+"\tisPrivate="+taxicar.isPrivate);
					System.out.println("\n\n");
				}
				if(truckcar.name!=null){
					System.out.println("truckcar 수정 가능(생성완료)");	System.out.println("2)Truckcar]\tname="+truckcar.name+"\tColor="+truckcar.color+"\twheelnum="+truckcar.wheelnum+"\tspped="+truckcar.spped+"\tton="+truckcar.ton);
					System.out.println("\n\n");
				}
				if(trailercar.name!=null){
					System.out.println("trailercar 수정 가능(생성완료)");	System.out.println("3)Trailercar]\tname="+trailercar.name+"\tColor="+trailercar.color+"\twheelnum="+trailercar.wheelnum+"\tspped="+trailercar.spped+"\tton="+trailercar.ton+"\tcompany="+trailercar.company);
					System.out.println("\n\n");
				}

		System.out.println("\t\t수정할 차를 골라주세요\n\t\t1)taxi \n\t\t 2)truck\n\t\t 3)trailer\n");
		input=sc.nextInt();
	
		if(input==1)  //taxi
		{
					System.out.println("\t\t[taxicar]");
					System.out.print("\t\ttaxicar [name] > ");
					String nameinput=sc.next();

					System.out.print("\t\ttaxicar [color] > ");
					String colorinput=sc.next();

					System.out.print("\t\ttaxicar [wheelnum] > ");
					int wheelnuminput=sc.nextInt();

					System.out.print("\t\ttaxicar [spped] > ");
					int sppedinput=sc.nextInt();

					System.out.print("\t\ttaxicar [meter] > ");
					int meterinput=sc.nextInt(); 

					System.out.print("\t\ttaxicar [isPrivate] > ");
					String isPrivateinput=sc.next(); 

					System.out.print("\n\n");

						taxicar.settaxi(nameinput, colorinput, wheelnuminput,sppedinput, meterinput,isPrivateinput);
						System.out.println("\t\tname="+taxicar.name+"\tColor="+taxicar.color+"\twheelnum="+taxicar.wheelnum+"\tspped="+taxicar.spped+"\tmeter="+taxicar.meter+"\tisPrivate="+taxicar.isPrivate);

		}else if(input==2)
		{

					System.out.println("\t\t[truckcar]");
					System.out.print("\t\ttruckcar [name] > ");
					String nameinput=sc.next();

					System.out.print("\t\ttruckcar [color] > ");
					String colorinput=sc.next();

					System.out.print("\t\ttruckcar [wheelnum] > ");
					int wheelnuminput=sc.nextInt();

					System.out.print("\t\ttruckcar [spped] > ");
					int sppedinput=sc.nextInt();

					System.out.print("\t\ttruckcar [ton] > ");
					double toninput=sc.nextDouble(); 

					System.out.print("\n\n");

						truckcar.settruck(nameinput, colorinput, wheelnuminput,sppedinput,toninput);
						System.out.println("\t\tname="+truckcar.name+"\tColor="+truckcar.color+"\twheelnum="+truckcar.wheelnum+"\tspped="+truckcar.spped+"\tton="+truckcar.ton);



		}else if(input==3)
		{

					System.out.println("\t\t[trailercar]");
					System.out.print("\t\ttrailercar [name] > ");
					String nameinput=sc.next();

					System.out.print("\t\ttrailercar [color] > ");
					String colorinput=sc.next();

					System.out.print("\t\ttrailercar [wheelnum] > ");
					int wheelnuminput=sc.nextInt();

					System.out.print("\t\ttrailercar [spped] > ");
					int sppedinput=sc.nextInt();

					System.out.print("\t\ttrailercar [ton] > ");
					double toninput=sc.nextDouble(); 

					System.out.print("\t\ttrailercar [company] > ");
					String companyinput=sc.next();

					System.out.print("\n\n");


						trailercar.settrailer(nameinput,   colorinput,   wheelnuminput,  sppedinput,   toninput,  companyinput);
						System.out.println("\t\tname="+trailercar.name+"\tColor="+trailercar.color+"\twheelnum="+trailercar.wheelnum+"\tspped="+trailercar.spped+"\tton="+trailercar.ton+"\t회사="+trailercar.company);



		}else
		{
			System.out.println("\t\t잘못입력하셨습니다");
		}


		}
		else if(input==0)
		{
			System.exit(0);
		}
		else
		{
			System.out.println("잘못입력하셨습니다");
		}



}	

	}
}
