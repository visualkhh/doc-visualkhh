package BookPack;

public class Book {
	protected String title;
	protected String author;
	protected int pubDate;

	public Book(){}

	public Book(String t, String a, int p){
		title = t;
		author = a;
		pubDate = p;
	}

	public void show(){
		System.out.println(title);
		System.out.println(author);
		System.out.println(pubDate);
	}
}

