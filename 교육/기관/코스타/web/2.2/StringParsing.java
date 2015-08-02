import java.util.*;

class StringParsing {
	public static void main(String[] args) {
		String str = "홍길동, 임꺽정, 이순신, 유관순";
		String[] name = str.split(",");

		for(int i=0; i<3; i++)
			System.out.println(name[i]);

		System.out.println("--------------------------------------------------");

		str = "홍길동-임꺽정-이순신-유관순";
		StringTokenizer st = new StringTokenizer(str, "-");

		System.out.println("총 파싱할 문자열의 수 : " + st.countTokens());

		while(st.hasMoreTokens()){
			System.out.println(st.nextToken());
		}

		System.out.println("--------------------------------------------------");

		str = "JavaTM 언어사양 제2판:James Gosling,Bill Joy, Guy Steele";
		str += ",Gilad Bracha:무라카미 마사아키:피어슨 에듀케이션:2000:5500";

		StringTokenizer st1 = new StringTokenizer(str, ":");

		String title = st1.nextToken();
		System.out.println("책 이름 ... " + title);

		String authors = st1.nextToken();
		StringTokenizer st2 = new StringTokenizer(authors, ",");
		System.out.print("저자 ...");
		while(st2.hasMoreTokens())
			System.out.print(st2.nextToken() + "   ");

		System.out.println();

		String trans = st1.nextToken();
		System.out.println("역자 ..." + trans);
	}
}
