class StringExample{
	public static void main(String[] args){



		//�迭�� ����� ��Ʈ��Ŭ����
	
	String name[] =new String[5];
	name[0]="������";name[1]="�����Ϥ�";name[2]="�����Ϥ���";


		for(int i=0;i<name.length;i++)
		{
			System.out.println(name[i]);
		}

				System.out.println();
				System.out.println();
				System.out.println();

		//����ó������� ��Ʈ����������
		String names="���㤿��;������";
		System.out.println(names);

				System.out.println();
				System.out.println();
				System.out.println();

		//equals �񱳹� 
		String String1 =new String("java"); 
		String String2 =new String("java"); 
		System.out.println("��Ʈ��1:"+String1+"\t��Ʈ��2:"+String2+"\t���̰���?equals?\t"+String1.equals(String2));
		System.out.println("��Ʈ��1:"+String1+"\t��Ʈ��2:"+String2+"\t�ּҰ�����?equal?\t"+(String1==String2));

		//����!length()		
				System.out.println("��Ʈ��1:"+String1+"\t����"+String1.length());




		//compareTo
		if(String1.compareTo(String2)>0)
		{
				System.out.println("��Ʈ��1:ŭ");
		}else if(String1.compareTo(String2)<0)
		{
				System.out.println("��Ʈ��1:����");
		}else if(String1.compareTo(String2)==0)
		{
				System.out.println("��Ʈ��1=2:����");
		}




		//indexof
		String site="www.naver.com";
		System.out.println(site.indexOf("a"));
		System.out.println(site.indexOf("naver"));
		System.out.println(site.indexOf("visual"));


		System.out.println(site.substring(0,5));





	}
}
