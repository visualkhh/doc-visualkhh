class argsTest{
	public static void main(String[] args){
		String numbers[][]={
			{"ȫ�浿","111-111"},
			{"������","121-111"},
			{"�̼���","141-111"},
			{"�Ӳ���","211-111"}
							};



		if(args.length>0 && args.length<2)
		{
			for(int i=0;i<numbers.length;i++)
			{
						if(args[0].equals(numbers[i][0]))
						{

							for(int t=0;t<numbers[i].length;t++)
							{
								System.out.print(numbers[i][t]+"\t");
							}
						}
			}
		}else
		{
			System.out.println("�߸��Է� �ϼ̽��ϴ�");
			System.out.println("������: ���ϸ� �˻��̸�");

		}

	}
}
