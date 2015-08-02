import java.util.*;

class StringParsing {
	public static void main(String[] args) {
		String str = "ȫ�浿, �Ӳ���, �̼���, ������";
		String[] name = str.split(",");

		for(int i=0; i<3; i++)
			System.out.println(name[i]);

		System.out.println("--------------------------------------------------");

		str = "ȫ�浿-�Ӳ���-�̼���-������";
		StringTokenizer st = new StringTokenizer(str, "-");

		System.out.println("�� �Ľ��� ���ڿ��� �� : " + st.countTokens());

		while(st.hasMoreTokens()){
			System.out.println(st.nextToken());
		}

		System.out.println("--------------------------------------------------");

		str = "JavaTM ����� ��2��:James Gosling,Bill Joy, Guy Steele";
		str += ",Gilad Bracha:����ī�� �����Ű:�Ǿ �������̼�:2000:5500";

		StringTokenizer st1 = new StringTokenizer(str, ":");

		String title = st1.nextToken();
		System.out.println("å �̸� ... " + title);

		String authors = st1.nextToken();
		StringTokenizer st2 = new StringTokenizer(authors, ",");
		System.out.print("���� ...");
		while(st2.hasMoreTokens())
			System.out.print(st2.nextToken() + "   ");

		System.out.println();

		String trans = st1.nextToken();
		System.out.println("���� ..." + trans);
	}
}
