
public class StringTest {

	public static void main(String[] args) {

		
		
		String info="visualhhk WoW";
		
		
		System.out.println("charAt(4)");
		
		System.out.println(info.charAt(4));
		System.out.println("\n\n");
		/*
			charAt (int index) 
          	지정된 인덱스 위치에 있는 char 치를 돌려줍니다
        */ 
		
		
			
		
		
		
		
		System.out.println("codePointAt(0)");	
		System.out.println(info.codePointAt(0));
		char v='v';
		System.out.println((int)v);
		System.out.println("\n\n");
		/*
			codePointAt (int index) 
          	지정된 인덱스 위치의 문자 (Unicode 코드 포인트)를 돌려줍니다
		*/
				
		
		
		
		System.out.println("codePointBefore(1)");
		System.out.println(info.codePointBefore(1));
		System.out.println("\n\n");
		/*
		codePointAt (int index) 
      	지정된 인덱스 전위치의 문자 (Unicode 코드 포인트)를 돌려줍니다
		 */
		
		
		
		System.out.println("codePointCount(1, 13)");
		System.out.println(info.codePointCount(1, 13));
		System.out.println("\n\n");
		/*
			codePointCount (int beginIndex, int endIndex) 
          	이 String 의 지정된 텍스트 범위의 Unicode 코드 포인트의 수를 돌려줍니다
		*/
		
		
		
		System.out.println("compareTo(\"visualhhk WoW\")");
		System.out.println(info.compareTo("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			compareTo (String  anotherString) 
        	2 개의 캐릭터 라인을 사전적으로 비교합니다. 
		*/
		
		
		
		
		
		System.out.println("compareToIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.compareToIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			compareToIgnoreCase (String  str) 
          	대문자와 소문자의 구별없이, 2 개의 캐릭터 라인을 사전적으로 비교합니다
		*/
		
		
		
		
		
		System.out.println("concat(\"뒤로연결되는 문자열\")");
		System.out.println(info.concat("뒤로연결되는 문자열"));
		System.out.println("\n\n");
		/*
			concat (String  str) 
          	지정된 캐릭터 라인을 이 캐릭터 라인의 마지막에 연결합니다
          	하지만 실 데이터에는 지장이 없습니다.
		*/
		
		
			
		System.out.println("contains(\"visual\")");
		System.out.println(info.contains("visual"));
		System.out.println("\n\n");
		/*
			contains (CharSequence  s) 
       		이 캐릭터 라인이 지정된 char 치의 순서를 포함한 경우에 한정해 true 를 돌려줍니다
		*/
		
		
		
		
		System.out.println("contentEquals(\"visualhhk WoW\")");
		System.out.println(info.contentEquals("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			contentEquals (StringBuffer  sb) 
          	이 String 가, 지정된 StringBuffer 와 같은 문자 순서를 나타내는 경우에만,
          	true 가 돌려주어집니다
		*/
		
		
		
		char aa[]={'v','i','z'};
		
		System.out.println("copyValueOf(aa,0,2)");
		System.out.println(info.copyValueOf(aa,0,2));
		System.out.println("\n\n");
		/*
			copyValueOf (char[] data, int offset, int count) 
          	지정된 배열내의 문자 순서를 나타내는 String 를 돌려줍니다
		*/
		
		
		
		//System.out.println(info);System.out.println(info);System.out.println(info);
		
		
		System.out.println("endsWith(\"visualhhk WoW\")");
		System.out.println(info.endsWith("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			endsWith (String  suffix) 
          	이 캐릭터 라인이, 지정된 접미말로 끝날지 어떨지를 판정합니다
		*/
		
		
		
		
		System.out.println("equals(\"visualhhk WoW\")");
		System.out.println(info.equals("visualhhk WoW"));
		System.out.println("\n\n");
		/*
			equals (Object  anObject) 
          	이 캐릭터 라인과 지정된 오브젝트를 비교합니다
		*/
		
		
		
		System.out.println("equalsIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.equalsIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			equalsIgnoreCase (String  anotherString) 
          	이 String 와 다른 String 를 비교합니다.
		*/
		
		
		
		System.out.println("equalsIgnoreCase(\"VISUALHHK WoW\")");
		System.out.println(info.equalsIgnoreCase("VISUALHHK WoW"));
		System.out.println("\n\n");
		/*
			equalsIgnoreCase (String  anotherString) 
          	이 String 와 다른 String 를 비교합니다.
		*/
		
		int i =500;
		System.out.println("format(\"VISUALHHK WoW%d\",i)");
		System.out.println(info.format("VISUALHHK WoW%d",i));
		System.out.println("\n\n");
		/*
			format (String  format, Object ... args) 
          	지정된 서식의 캐릭터 라인과 인수를 사용해, 서식 첨부 캐릭터 라인을 돌려줍니다
		*/
		
		
		
		System.out.println("getBytes()");
		System.out.println(info.getBytes());
		System.out.println("\n\n");
		/*
			getBytes () 
        	플랫폼의 디폴트 캐릭터 세트를 사용해 이 String 를 바이트 순서에 encode 해, 결과를 신규 바이트 배열에 포함합니다
        	바이트로 !! 출력한다
		*/
		
		
		
		System.out.println("hashCode()");
		System.out.println(info.hashCode());
		System.out.println("\n\n");
		/*
			hashCode () 
        	이 캐릭터 라인의 해시 코드를 돌려줍니다
        
        */
		
		
		
		
		String av="vis";
		System.out.println("indexOf(av)");
		System.out.println(info.indexOf(av));
		System.out.println("\n\n");
		/*
		 	indexOf (String  str)
          	이 캐릭터 라인내에서, 지정된 부분 캐릭터 라인이 최초로 출현하는 위치의 인덱스를 돌려줍니다
		*/
		
		
		String avs="visualhhk WoW";
		System.out.println("intern()");
		System.out.println(info.intern()==avs.intern());
		System.out.println("\n\n");
		/*
			intern () 
          	캐릭터 라인 오브젝트의 정 준표현을 돌려줍니다
		 */
		
		
		
		System.out.println("lastIndexOf(\"W\")");
		System.out.println(info.lastIndexOf("W"));
		System.out.println("\n\n");
		/*
			lastIndexOf (int ch) 
          	이 캐릭터 라인내에서, 지정된 문자가 마지막에 출현하는 위치의 인덱스를 돌려줍니다
		 */
		

		
		System.out.println("length()");
		System.out.println(info.length());
		System.out.println("\n\n");
		/*
			length () 
          	이 캐릭터 라인의 길이를 돌려줍니다
		 */
		
		
		System.out.println("matches(\"visualhhk WoW\")");
		System.out.println(info.matches("visualhhk WoW"));	
		System.out.println("\n\n");
		/*
		 	matches (String  regex) 
		          이 캐릭터 라인이, 지정된 정규 표현과 일치할지 어떨지를 판정합니다
		*/

		
		
		System.out.println("offsetByCodePoints(4,5)");
		System.out.println(info.offsetByCodePoints(4,5));	
		System.out.println("\n\n");
		/*
			offsetByCodePoints (int index, int codePointOffset) 
          	codePointOffset 코드 포인트에 의해 지정된 index 로부터 오프셋(offset)가 설정된, 이 String 내의 인덱스를 돌려줍니다
		 */
		
		
		
		System.out.println("regionMatches(4,5)");
		System.out.println(info.regionMatches(0,"vis",0,2));	
		System.out.println("\n\n");
		/*
			regionMatches (int toffset, String  other, int ooffset, int len) 
          	2 개의 캐릭터 라인 영역이 동일한지 어떤지를 판정합니다
		 */
		
		
		System.out.println("replace('W','L')");
		System.out.println(info.replace('W','L'));	
		System.out.println("\n\n");
		/*
			replace (char oldChar, char newChar) 
          	이 캐릭터 라인내에 있는 모든 oldChar 를 newChar 에 치환한 결과 생성되는, 새로운 캐릭터 라인을 돌려줍니다
		*/
		
		
		System.out.println("replaceAll(\"W\",\"BaBo\")");
		System.out.println(info.replaceAll("W","BaBo"));	
		System.out.println("\n\n");
		/*
  			replaceAll (String  regex, String  replacement) 
          	지정된 정규 표현에 일치하는, 이 캐릭터 라인의 각 부분 캐릭터 라인에 대해, 지정된 치환을 실행합니다 
		 */

		
		System.out.println("replaceFirst(\"W\",\"BaBo\")");
		System.out.println(info.replaceFirst("W","BaBo"));	
		System.out.println("\n\n");
		/*
			replaceFirst (String  regex, String  replacement) 
        	지정된 정규 표현에 일치하는, 이 캐릭터 라인의 최초의 부분 캐릭터 라인에 대해, 지정된 치환을 실행합니다
        */
		
	
		
		
		String[] vvv=info.split("l");
		System.out.println("String[] vvv=info.split(\"l\");\nSystem.out.println(vvv[0]+\"분활\"+vvv[1]+\"분활2\");");
		System.out.println(vvv[0]+"분활"+vvv[1]+"분활2");
		System.out.println("\n\n");
		/*
			split (String  regex, int limit) 
          	이 캐릭터 라인을, 지정된 정규 표현에 일치하는 위치에서 분할합니다

		 */
		
		
		
		System.out.println("startsWith(\"vis\",0)");
		System.out.println(info.startsWith("vis",0));	
		System.out.println("\n\n");
		/*
			startsWith (String  prefix, int toffset) 
          	이 캐릭터 라인의 지정된 인덱스 이후의 부분 캐릭터 라인이, 지정된 접두사로 시작될지 어떨지를 판정합니다
		*/
		
		
		System.out.println("substring(5,12)");
		System.out.println(info.substring(5,12));
		System.out.println("\n\n");
		/*
			substring  (int beginIndex, int endIndex
		          이 캐릭터 라인의 부분 캐릭터 라인인 새로운 캐릭터 라인을 돌려줍니다
		 */
		
		
		char a[]=info.toCharArray();
		System.out.println("char a[]=info.toCharArray();\nSystem.out.println(a[2]);");
		System.out.println(a[2]);
		System.out.println("\n\n");
		/*
			toCharArray () 
          	이 캐릭터 라인을 새로운 문자 배열로 변환합니다. 
		*/
		
		
		
		System.out.println("toLowerCase()");
		System.out.println(info.toLowerCase());
		System.out.println("\n\n");
		/*
			toLowerCase () 
          	디폴트 로케일의 규칙을 사용해, 이 String 내의 모든 문자를 소문자로 변환합니다
		 */
		
		
		
		System.out.println("toUpperCase()");
		System.out.println(info.toUpperCase());
		System.out.println("\n\n");
		/*
			toUpperCase () 
          	디폴트 로케일의 규칙을 사용해, 이 String 내의 모든 문자를 대문자로 변환합니다 
		*/
		
		
		
		
		System.out.println("valueOf(5.5)");
		System.out.println(info.valueOf(5.5));
		System.out.println("\n\n");
		/*
			valueOf (int i) 
          int 인수의 캐릭터 라인 표현을 돌려줍니다
		 */

		
		
		info="  vv  ";
		System.out.println("trim()");
		System.out.println(info.trim());
		System.out.println("\n\n");
		/*
			trim () 
          	캐릭터 라인의 카피를 돌려줍니다trim () 
          	처음과  끝부분 공백제거!!!

		 */
		
		


		
		
		
		
		
		
		

		
		
	}
	
}
