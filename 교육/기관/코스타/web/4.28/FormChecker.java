package myclasses;

public class FormChecker {
	public static boolean isNull(String m) {
		if(m == null || m.trim().length() == 0)
			return true;
			
		return false;
	}
	
	public static boolean isNumber(String m) {
		if(isNull(m))
			return false;
		
		m = m.trim();
		int n = m.length();
		for(int i=0; i < n; i++) {
			char c = m.charAt(i);
			if(!('0' <=  c && c <= '9'))
				return false;
		}
		return true;
	}
	
	public static boolean isSame(String m, String n) {
		if(isNull(m) || isNull(n))
			return false;
		
		m = m.trim();
		n = n.trim();
		if(m.equals(n))
			return true;
		
		return false;
	}
	
	public static boolean isID(String m) {
		if(isNull(m))
			return false;
		m = m.trim().toUpperCase();
		char c = m.charAt(0);
		if(!('A' <= c && c <= 'Z'))
			return false;
		
		int n = m.length();
		for(int i=1; i < n; i++) {
			c = m.charAt(i);
			if(!(('A' <= c && c <= 'Z') || ('0' <= c && c <= '9') ||
			     (c == '_')))
				return false;
		}
		return true;
	}
	
	public static boolean isCardNumber(String m) {
		if(isNull(m))
			return false;
		m = m.trim();
		if(m.length() != 16)
			return false;
		if(isNumber(m))
			return true;
			
		return false;
	}
	
	public static boolean isEmail(String m) {
		if(isNull(m))
			return false;
		
		int n = m.indexOf("@");
		if(n < 0)
			return false;
		n = m.indexOf(".");
		if(n < 0)
			return false;
			
		return true;
	}
	
	public static boolean isSSN(String s1, String s2) {
		if(isNull(s1) || isNull(s2))
			return false;
		
		if(!isNumber(s1))	
			return false;

		if(!isNumber(s2))
			return false;
		
		s1 = s1.trim();
		s2 = s2.trim();
		
		if(!(s1.length() == 6 && s2.length() == 7))
			return false;
			
		int hap = 0;
		for(int i=0; i < 6; i++) {
			hap +=  (s1.charAt(i) - '0') * (i+2) ;	
		}
		
		int n0 = s2.charAt(0) - '0';
		int n1 = s2.charAt(1) - '0';
		int n2 = s2.charAt(2) - '0';
		int n3 = s2.charAt(3) - '0';
		int n4 = s2.charAt(4) - '0';
		int n5 = s2.charAt(5) - '0';
		int n6 = s2.charAt(6) - '0';
		
		hap += n0*8+n1*9+n2*2+n3*3+n4*4+n5*5;
		hap %= 11;
		hap = 11 - hap;
		hap %= 10;
		if(hap != n6)
			return false;
		
		return true;
	}
}
