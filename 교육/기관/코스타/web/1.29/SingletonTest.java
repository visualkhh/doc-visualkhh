class SingletonDemo
{
	static SingletonDemo sd;
	int max=10; //昔什渡什 痕呪 馬蟹 姥益撹 識情!!せせせせせせせ

	private SingletonDemo()  // 持失切牽牽 private稽 識情馬食! 箭凶 持失聖馬走公敗
	{
	}
	
	static public SingletonDemo getinstance()
	{
		if (sd==null)	//戚耕級嬢亜赤生檎  奄糎襖 軒渡  蒸聖匡 廃腰幻 持失!
		{
				sd = new SingletonDemo();
		}return sd;


	}

}
class SingletonTest {
	public static void main(String[] args){
		System.out.println("Singleton");

		SingletonDemo wow =SingletonDemo.getinstance();
		Object wow1 =SingletonDemo.getinstance();

//SingletonDemo wow1=(SingletonDemo)wow1.clone();
	System.out.println(wow==wow1);
		System.out.println(wow.max);


	}
}
