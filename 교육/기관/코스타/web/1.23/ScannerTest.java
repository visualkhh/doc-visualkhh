import java.util.Scanner;
import java.io.*;
class ScannerTest{
	public static void main(String[] args)throws IOException{
		System.out.println("Hello World!");

		Scanner sc=new Scanner(System.in);

		System.out.println("�Է¿��");
		String visualhhk=sc.next();
		System.out.println("���"+visualhhk);

		System.out.println("�Է¿�� INT");
		int visualhhkint=sc.nextInt();
		System.out.println("���"+visualhhkint);
		
		System.out.println("�Է¿�� Double");
		double visualhhkdouble=sc.nextDouble();
		System.out.println("���"+visualhhkdouble);
	}
}
