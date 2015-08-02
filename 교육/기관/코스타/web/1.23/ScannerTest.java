import java.util.Scanner;
import java.io.*;
class ScannerTest{
	public static void main(String[] args)throws IOException{
		System.out.println("Hello World!");

		Scanner sc=new Scanner(System.in);

		System.out.println("입력요망");
		String visualhhk=sc.next();
		System.out.println("출력"+visualhhk);

		System.out.println("입력요망 INT");
		int visualhhkint=sc.nextInt();
		System.out.println("출력"+visualhhkint);
		
		System.out.println("입력요망 Double");
		double visualhhkdouble=sc.nextDouble();
		System.out.println("출력"+visualhhkdouble);
	}
}
