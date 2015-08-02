import BookPack.Book; 

class BookPro extends Book{
	private String publisher;

	public BookPro(String t, String a, int d, String p){
		title = t;
		author = a;
		pubDate = d; 
		publisher = p;
	}

	public void show(){
		super.show();
		System.out.println(publisher);
		System.out.println();
	}
}

class BookDemo{
	public static void main(String args[]){
		BookPro books[] = new BookPro[5];
		books[0] = new BookPro("J2SE", "홍길동", 1999, "한빛");
		books[1] = new BookPro("JSP", "임꺽정", 2008, "영진");
		books[2] = new BookPro("EJB", "이순신", 2000, "가메");
		books[3] = new BookPro("STRUTS", "유관순", 1998, "대림");
		books[4] = new BookPro("SPRING", "신돌석", 2004, "홍익");

		for(int i=0; i<books.length; i++){
			books[i].show();
		}

		//books[0].title = "aaa";
	}
}
