class Clone implements Cloneable{

 public int i; 

public Object clone() 
	{


//super.clone()에서 super는 object 클래스의 clone()를 호출하는 것임
//모든 자바 클래스에서 상속이 선언되지 않았다면 extends object가 생략되어있음
			try
			{
			  super.clone();
			}catch(CloneNotSupportedException e) 
			{}

		 Clone clone = new Clone ( );
		 clone.i = this.i;
		 return clone;  //반환값 : 이 인스턴스의 복제
	}

}

public class cloneMain {
 public static void main(String[] args){
  Clone cn = new Clone();
  cn.i = 1;

  System.out.println("cn1:"+cn.getClass());
  System.out.println("cn2:"+cn.i);


//clone()은 clone()하는 객체의 상태를 그대로 복사해서 
//다른 객체로 만듬 

  Object cn2 = cn.clone();  
((Clone)cn2).i=55;
  // clone()의 반환값이 오브젝이트이기때문에 오브젝트로 담는다.
  System.out.println("cc2:"+((Clone)cn2).getClass()); 
  System.out.println("cn2:"+((Clone)cn2).i);

System.out.println("cn1:"+cn.getClass());
  System.out.println("cn2:"+cn.i);		
 }
}

 

 

 /*

글 출처 : 네이버 지식인


Cloneable 인터페이스는 Serializable 처럼 아무런 메쏘드도 정의하고 있지 않습니다. 
이런 인터페이스를 마커 인터페이스라고 합니다. 어떤 필요한 기능에 대한 semantic 
을 충족하고 있다는 의미입니다.

jdk 설명에 보면 clone 메쏘드는 일반적(convention)으로 deep copy를 의미하는 것으로 
되어 있습니다. 그러나 Object 클래스의 clone 메쏘드는 Cloneable 을 구현한 클래스의 
인스턴스의 shallow copy 만을 던져줍니다.

(원래 인스턴스가 갖고 있는 레퍼런스 멤버에 대해, 새로 만들어진 인스턴스가 동일한 
오브젝트에 대한 레퍼런스를 갖고 있다면 shallow copy 입니다.. 말이 꼬이네요.)

즉 사용자가 public 접근자로 override 하여 super.clone() 으로 shallow copy 를 받은 다음에..
이것은 다시 deep copy 로(새로운 오브젝트를 만들어 레퍼런스를 변경해 줌)바꾸어 리턴할 것을
요구하고 있습니다. 이게 clone 메쏘드의 conventional 한 semantic 입니다.
*/