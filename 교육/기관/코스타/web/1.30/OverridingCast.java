class A {
  void callme() {
    System.out.println("클래스 A의 callme() 메소드 실행");
  }
}

class B extends A {
  void callme() {     //오버라이딩 된 메소드
    System.out.println("클래스 B의 callme() 메소드 실행");
  }
}

class C extends A {   //오버라이딩 된 메소드
  void callme() {
    System.out.println("클래스 C의 callme() 메소드 실행");
  }
}

class OverridingCast {
  public static void main(String args[]) {
    A r = new A();
    r.callme();
    r = new B();
    r.callme();
    r = new C();
    r.callme();
  }
}
