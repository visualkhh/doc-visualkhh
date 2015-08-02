class A {
  void show(String str) {
    System.out.println("상위클래스의 메소드 show(String str) 수행 " + str);
  }
}

class B extends A {
  void show(String str) {
    System.out.println("상위클래스 메소드 show(String str) 오버라이딩 하여 수행"+str);
  }
  void show() {
    System.out.println("하위클래스의 메소드 show() 수행");
  }
}


class overridetest{
	public static void main(String[] args){
		System.out.println("overridetest!");

		B ob=new B();
		ob.show();
		ob.show("zzz");

//		A oba=new A();
		A oba=new B();
		oba.show("AAA");
	}
}
