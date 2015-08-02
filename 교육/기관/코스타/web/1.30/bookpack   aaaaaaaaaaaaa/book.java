package bookpack;
public class book{

	private String title;
	private String author;
	private int pubdate;

	public book(String t, String a , int p)
	{
			title=t;
			author=a;
			pubdate=p;
	}

	public void show()
	{
			System.out.println(title);
			System.out.println(author);
			System.out.println(pubdate);

	}



}



