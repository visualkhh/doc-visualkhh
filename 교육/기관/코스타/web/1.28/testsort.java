class sungjuk
{
	String name;
	int jumsu;
	int rank;
}

class testsort{
	public static void main(String[] args){
		System.out.println("TestSort");

sungjuk s[] =new sungjuk[3];  // ��ü�� �����Ҽ��ִ� ��������!! ���� ��ü�� �����ȉ���

s[0]=new sungjuk();  //�����ڸ� ȣ���ؾ��� ���� ��ü������
s[1]=new sungjuk();
s[2]=new sungjuk();

s[0].name="ȫ�浿";
s[0].jumsu=44;

s[1].name="�Ӳ���";
s[1].jumsu=45;

s[2].name="�̼���";
s[2].jumsu=78;




for(int i=0;i<s.length;i++)
{
	s[i].rank=1;
	
	for(int j=0;j<s.length;j++)
	{
		if (s[i].jumsu<s[j].jumsu)
		{
			s[i].rank+=1;
		}
	}
}

for(int cnt =0 ;cnt<s.length;cnt++)
		{
		System.out.println(s[cnt].name+"\t"+s[cnt].jumsu+"\t"+s[cnt].rank);

System.out.println("");
		}




		//���� ����
	
for (int i=1,cnt=0 ;cnt<3  ;i++,cnt++)
{

	if(i==s[cnt].rank)
	{	
		System.out.println(s[cnt].name+"\t"+s[cnt].jumsu+"\t"+s[cnt].rank);
		cnt=-1;
	}else{
		i--;
	}


System.out.println("");
}

	}
}
