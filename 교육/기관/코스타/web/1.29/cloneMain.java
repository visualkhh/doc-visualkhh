class Clone implements Cloneable{

 public int i; 

public Object clone() 
	{


//super.clone()���� super�� object Ŭ������ clone()�� ȣ���ϴ� ����
//��� �ڹ� Ŭ�������� ����� ������� �ʾҴٸ� extends object�� �����Ǿ�����
			try
			{
			  super.clone();
			}catch(CloneNotSupportedException e) 
			{}

		 Clone clone = new Clone ( );
		 clone.i = this.i;
		 return clone;  //��ȯ�� : �� �ν��Ͻ��� ����
	}

}

public class cloneMain {
 public static void main(String[] args){
  Clone cn = new Clone();
  cn.i = 1;

  System.out.println("cn1:"+cn.getClass());
  System.out.println("cn2:"+cn.i);


//clone()�� clone()�ϴ� ��ü�� ���¸� �״�� �����ؼ� 
//�ٸ� ��ü�� ���� 

  Object cn2 = cn.clone();  
((Clone)cn2).i=55;
  // clone()�� ��ȯ���� ��������Ʈ�̱⶧���� ������Ʈ�� ��´�.
  System.out.println("cc2:"+((Clone)cn2).getClass()); 
  System.out.println("cn2:"+((Clone)cn2).i);

System.out.println("cn1:"+cn.getClass());
  System.out.println("cn2:"+cn.i);		
 }
}

 

 

 /*

�� ��ó : ���̹� ������


Cloneable �������̽��� Serializable ó�� �ƹ��� �޽�嵵 �����ϰ� ���� �ʽ��ϴ�. 
�̷� �������̽��� ��Ŀ �������̽���� �մϴ�. � �ʿ��� ��ɿ� ���� semantic 
�� �����ϰ� �ִٴ� �ǹ��Դϴ�.

jdk ���� ���� clone �޽��� �Ϲ���(convention)���� deep copy�� �ǹ��ϴ� ������ 
�Ǿ� �ֽ��ϴ�. �׷��� Object Ŭ������ clone �޽��� Cloneable �� ������ Ŭ������ 
�ν��Ͻ��� shallow copy ���� �����ݴϴ�.

(���� �ν��Ͻ��� ���� �ִ� ���۷��� ����� ����, ���� ������� �ν��Ͻ��� ������ 
������Ʈ�� ���� ���۷����� ���� �ִٸ� shallow copy �Դϴ�.. ���� ���̳׿�.)

�� ����ڰ� public �����ڷ� override �Ͽ� super.clone() ���� shallow copy �� ���� ������..
�̰��� �ٽ� deep copy ��(���ο� ������Ʈ�� ����� ���۷����� ������ ��)�ٲپ� ������ ����
�䱸�ϰ� �ֽ��ϴ�. �̰� clone �޽���� conventional �� semantic �Դϴ�.
*/