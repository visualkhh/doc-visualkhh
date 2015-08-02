import java.io.*;

/*
class ExceptionTest {
	public static void main(String[] args) {
		int nums[] = new int[4];
		
		try{
			System.out.println("Excpetion 실행 예제...");
			nums[7] = 10;
		}
		catch(ArrayIndexOutOfBoundsException   e){
			System.out.println("범위를 벗어났다.");
		}

		System.out.println("이 문장이 실행되는가?");		
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
			reader = new FileReader(fname);  //파일을찾아 메모리에 올려라
		}
		catch(FileNotFoundException e){
			System.out.println("파일이 존재하지 않는다.");
		}

		try{
			reader.read(buff, 0, 100);  // buff에 0부터100번째 문자까지 넣라
		}
		catch(IOException e){
			System.out.println("읽을 때 에러났다...");
		}

		String str = new String(buff);
		System.out.println("읽은 내용 : " + str);

		try{
			reader.close();  //메모리에서 내려라 파일닫아라!
		}
		catch(IOException e){
			System.out.println("막판에 에러났네...");
		}
	}

	public static void main(String[] args) {
		new ExceptionTest2(args[0]);
	}
}