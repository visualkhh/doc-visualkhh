class A {
  void show(String str) {
    System.out.println("����Ŭ������ �޼ҵ� show(String str) ���� " + str);
  }
}

class B extends A {
  void show(String str) {
    System.out.println("����Ŭ���� �޼ҵ� show(String str) �������̵� �Ͽ� ����"+str);
  }
  void show() {
    System.out.println("����Ŭ������ �޼ҵ� show() ����");
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
