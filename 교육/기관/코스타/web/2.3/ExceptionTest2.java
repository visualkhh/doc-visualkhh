import java.io.*;

/*
class ExceptionTest {
	public static void main(String[] args) {
		int nums[] = new int[4];
		
		try{
			System.out.println("Excpetion ���� ����...");
			nums[7] = 10;
		}
		catch(ArrayIndexOutOfBoundsException   e){
			System.out.println("������ �����.");
		}

		System.out.println("�� ������ ����Ǵ°�?");		
	}
}
*/

class ExceptionTest2{
	ExceptionTest2(String filename){
		reading(filename);
	}
	
	void reading(String fname){
		FileReader reader = null;
		char[] buff = new char[100];
		
		try{
			reader = new FileReader(fname);  //������ã�� �޸𸮿� �÷���
		}
		catch(FileNotFoundException e){
			System.out.println("������ �������� �ʴ´�.");
		}

		try{
			reader.read(buff, 0, 100);  // buff�� 0����100��° ���ڱ��� �ֶ�
		}
		catch(IOException e){
			System.out.println("���� �� ��������...");
		}

		String str = new String(buff);
		System.out.println("���� ���� : " + str);

		try{
			reader.close();  //�޸𸮿��� ������ ���ϴݾƶ�!
		}
		catch(IOException e){
			System.out.println("���ǿ� ��������...");
		}
	}

	public static void main(String[] args) {
		new ExceptionTest2(args[0]);
	}
}