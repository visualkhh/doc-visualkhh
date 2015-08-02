
public class StringTest {

	public static void main(String[] args) {

		
		
		String info="visualhhk WoW";
		
		
		System.out.println("charAt(4)");
		
		System.out.println(info.charAt(4));
		System.out.println("\n\n");
		/*
			charAt (int index) 
          	������ �ε��� ��ġ�� �ִ� char ġ�� �����ݴϴ�
        */ 
		
		
			
		
		
		
		
		System.out.println("codePointAt(0)");	
		System.out.println(info.codePointAt(0));
		char v='v';
		System.out.println((int)v);
		System.out.println("\n\n");
		/*
			codePointAt (int index) 
          	������ �ε��� ��ġ�� ���� (Unicode �ڵ� ����Ʈ)�� �����ݴϴ�
		*/
				
		
		
		
		System.out.println("codePointBefore(1)");
		System.out.println(info.codePointBefore(1));
		System.out.println("\n\n");
		/*
		codePointAt (int index) 
      	������ �ε��� ����ġ�� ���� (Unicode �ڵ� ����Ʈ)�� �����ݴϴ�
		 */
		
		
		
		System.out.println("codePointCount(1, 13)");
		System.out.println(info.codePointCount(1, 13));
		System.out.println("\n\n");
		/*
			codePointCount (int beginIndex, int endIndex) 
          	�� String �� ������ �ؽ�Ʈ ������ Unicode �ڵ� ����Ʈ�� ���� �����ݴϴ�
		*/
		
		
		
		System.out.println("compareTo(\"visualhhk WoW\")");
		System.out.println(info.compareTo("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			compareTo (String  anotherString) 
        	2 ���� ĳ���� ������ ���������� ���մϴ�. 
		*/
		
		
		
		
		
		System.out.println("compareToIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.compareToIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			compareToIgnoreCase (String  str) 
          	�빮�ڿ� �ҹ����� ��������, 2 ���� ĳ���� ������ ���������� ���մϴ�
		*/
		
		
		
		
		
		System.out.println("concat(\"�ڷο���Ǵ� ���ڿ�\")");
		System.out.println(info.concat("�ڷο���Ǵ� ���ڿ�"));
		System.out.println("\n\n");
		/*
			concat (String  str) 
          	������ ĳ���� ������ �� ĳ���� ������ �������� �����մϴ�
          	������ �� �����Ϳ��� ������ �����ϴ�.
		*/
		
		
			
		System.out.println("contains(\"visual\")");
		System.out.println(info.contains("visual"));
		System.out.println("\n\n");
		/*
			contains (CharSequence  s) 
       		�� ĳ���� ������ ������ char ġ�� ������ ������ ��쿡 ������ true �� �����ݴϴ�
		*/
		
		
		
		
		System.out.println("contentEquals(\"visualhhk WoW\")");
		System.out.println(info.contentEquals("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			contentEquals (StringBuffer  sb) 
          	�� String ��, ������ StringBuffer �� ���� ���� ������ ��Ÿ���� ��쿡��,
          	true �� �����־����ϴ�
		*/
		
		
		
		char aa[]={'v','i','z'};
		
		System.out.println("copyValueOf(aa,0,2)");
		System.out.println(info.copyValueOf(aa,0,2));
		System.out.println("\n\n");
		/*
			copyValueOf (char[] data, int offset, int count) 
          	������ �迭���� ���� ������ ��Ÿ���� String �� �����ݴϴ�
		*/
		
		
		
		//System.out.println(info);System.out.println(info);System.out.println(info);
		
		
		System.out.println("endsWith(\"visualhhk WoW\")");
		System.out.println(info.endsWith("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			endsWith (String  suffix) 
          	�� ĳ���� ������, ������ ���̸��� ������ ����� �����մϴ�
		*/
		
		
		
		
		System.out.println("equals(\"visualhhk WoW\")");
		System.out.println(info.equals("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			equals (Object  anObject) 
          	�� ĳ���� ���ΰ� ������ ������Ʈ�� ���մϴ�
		*/
		
		
		
		System.out.println("equalsIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.equalsIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			equalsIgnoreCase (String  anotherString) 
          	�� String �� �ٸ� String �� ���մϴ�.
		*/
		
		
		
		System.out.println("equalsIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.equalsIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			equalsIgnoreCase (String  anotherString) 
          	�� String �� �ٸ� String �� ���մϴ�.
		*/
		
		int i =500;
		System.out.println("format(\"VISUALHHK WoW%d\",i)");
		System.out.println(info.format("VISUALHHK WoW%d",i));
		System.out.println("\n\n");
		/*
			format (String  format, Object ... args) 
          	������ ������ ĳ���� ���ΰ� �μ��� �����, ���� ÷�� ĳ���� ������ �����ݴϴ�
		*/
		
		
		
		System.out.println("getBytes()");
		System.out.println(info.getBytes());
		System.out.println("\n\n");
		/*
			getBytes () 
        	�÷����� ����Ʈ ĳ���� ��Ʈ�� ����� �� String �� ����Ʈ ������ encode ��, ����� �ű� ����Ʈ �迭�� �����մϴ�
        	����Ʈ�� !! ����Ѵ�
		*/
		
		
		
		System.out.println("hashCode()");
		System.out.println(info.hashCode());
		System.out.println("\n\n");
		/*
			hashCode () 
        	�� ĳ���� ������ �ؽ� �ڵ带 �����ݴϴ�
        
        */
		
		
		
		
		String av="vis";
		System.out.println("indexOf(av)");
		System.out.println(info.indexOf(av));
		System.out.println("\n\n");
		/*
		 	indexOf (String  str)
          	�� ĳ���� ���γ�����, ������ �κ� ĳ���� ������ ���ʷ� �����ϴ� ��ġ�� �ε����� �����ݴϴ�
		*/
		
		
		String avs="visualhhk WoW";
		System.out.println("intern()");
		System.out.println(info.intern()==avs.intern());
		System.out.println("\n\n");
		/*
			intern () 
          	ĳ���� ���� ������Ʈ�� �� ��ǥ���� �����ݴϴ�
		 */
		
		
		
		System.out.println("lastIndexOf(\"W\")");
		System.out.println(info.lastIndexOf("W"));
		System.out.println("\n\n");
		/*
			lastIndexOf (int ch) 
          	�� ĳ���� ���γ�����, ������ ���ڰ� �������� �����ϴ� ��ġ�� �ε����� �����ݴϴ�
		 */
		

		
		System.out.println("length()");
		System.out.println(info.length());
		System.out.println("\n\n");
		/*
			length () 
          	�� ĳ���� ������ ���̸� �����ݴϴ�
		 */
		
		
		System.out.println("matches(\"visualhhk WoW\")");
		System.out.println(info.matches("visualhhk WoW"));	
		System.out.println("\n\n");
		/*
		 	matches (String  regex) 
		          �� ĳ���� ������, ������ ���� ǥ���� ��ġ���� ����� �����մϴ�
		*/

		
		
		System.out.println("offsetByCodePoints(4,5)");
		System.out.println(info.offsetByCodePoints(4,5));	
		System.out.println("\n\n");
		/*
			offsetByCodePoints (int index, int codePointOffset) 
          	codePointOffset �ڵ� ����Ʈ�� ���� ������ index �κ��� ������(offset)�� ������, �� String ���� �ε����� �����ݴϴ�
		 */
		
		
		
		System.out.println("regionMatches(4,5)");
		System.out.println(info.regionMatches(0,"vis",0,2));	
		System.out.println("\n\n");
		/*
			regionMatches (int toffset, String  other, int ooffset, int len) 
          	2 ���� ĳ���� ���� ������ �������� ����� �����մϴ�
		 */
		
		
		System.out.println("replace('W','L')");
		System.out.println(info.replace('W','L'));	
		System.out.println("\n\n");
		/*
			replace (char oldChar, char newChar) 
          	�� ĳ���� ���γ��� �ִ� ��� oldChar �� newChar �� ġȯ�� ��� �����Ǵ�, ���ο� ĳ���� ������ �����ݴϴ�
		*/
		
		
		System.out.println("replaceAll(\"W\",\"BaBo\")");
		System.out.println(info.replaceAll("W","BaBo"));	
		System.out.println("\n\n");
		/*
  			replaceAll (String  regex, String  replacement) 
          	������ ���� ǥ���� ��ġ�ϴ�, �� ĳ���� ������ �� �κ� ĳ���� ���ο� ����, ������ ġȯ�� �����մϴ� 
		 */

		
		System.out.println("replaceFirst(\"W\",\"BaBo\")");
		System.out.println(info.replaceFirst("W","BaBo"));	
		System.out.println("\n\n");
		/*
			replaceFirst (String  regex, String  replacement) 
        	������ ���� ǥ���� ��ġ�ϴ�, �� ĳ���� ������ ������ �κ� ĳ���� ���ο� ����, ������ ġȯ�� �����մϴ�
        */
		
	
		
		
		String[] vvv=info.split("l");
		System.out.println("String[] vvv=info.split(\"l\");\nSystem.out.println(vvv[0]+\"��Ȱ\"+vvv[1]+\"��Ȱ2\");");
		System.out.println(vvv[0]+"��Ȱ"+vvv[1]+"��Ȱ2");
		System.out.println("\n\n");
		/*
			split (String  regex, int limit) 
          	�� ĳ���� ������, ������ ���� ǥ���� ��ġ�ϴ� ��ġ���� �����մϴ�

		 */
		
		
		
		System.out.println("startsWith(\"vis\",0)");
		System.out.println(info.startsWith("vis",0));	
		System.out.println("\n\n");
		/*
			startsWith (String  prefix, int toffset) 
          	�� ĳ���� ������ ������ �ε��� ������ �κ� ĳ���� ������, ������ ���λ�� ���۵��� ����� �����մϴ�
		*/
		
		
		System.out.println("substring(5,12)");
		System.out.println(info.substring(5,12));
		System.out.println("\n\n");
		/*
			substring  (int beginIndex, int endIndex
		          �� ĳ���� ������ �κ� ĳ���� ������ ���ο� ĳ���� ������ �����ݴϴ�
		 */
		
		
		char a[]=info.toCharArray();
		System.out.println("char a[]=info.toCharArray();\nSystem.out.println(a[2]);");
		System.out.println(a[2]);
		System.out.println("\n\n");
		/*
			toCharArray () 
          	�� ĳ���� ������ ���ο� ���� �迭�� ��ȯ�մϴ�. 
		*/
		
		
		
		System.out.println("toLowerCase()");
		System.out.println(info.toLowerCase());
		System.out.println("\n\n");
		/*
			toLowerCase () 
          	����Ʈ �������� ��Ģ�� �����, �� String ���� ��� ���ڸ� �ҹ��ڷ� ��ȯ�մϴ�
		 */
		
		
		
		System.out.println("toUpperCase()");
		System.out.println(info.toUpperCase());
		System.out.println("\n\n");
		/*
			toUpperCase () 
          	����Ʈ �������� ��Ģ�� �����, �� String ���� ��� ���ڸ� �빮�ڷ� ��ȯ�մϴ� 
		*/
		
		
		
		
		System.out.println("valueOf(5.5)");
		System.out.println(info.valueOf(5.5));
		System.out.println("\n\n");
		/*
			valueOf (int i) 
          int �μ��� ĳ���� ���� ǥ���� �����ݴϴ�
		 */

		
		
		info="  vv  ";
		System.out.println("trim()");
		System.out.println(info.trim());
		System.out.println("\n\n");
		/*
			trim () 
          	ĳ���� ������ ī�Ǹ� �����ݴϴ�trim () 
          	ó����  ���κ� ��������!!!

		 */
		
		


		
		
		
		
		
		
		

		
		
	}
	
}
