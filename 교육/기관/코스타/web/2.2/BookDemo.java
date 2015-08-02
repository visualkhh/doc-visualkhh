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
		books[0] = new BookPro("J2SE", "ȫ�浿", 1999, "�Ѻ�");
		books[1] = new BookPro("JSP", "�Ӳ���", 2008, "����");
		books[2] = new BookPro("EJB", "�̼���", 2000, "����");
		books[3] = new BookPro("STRUTS", "������", 1998, "�븲");
		books[4] = new BookPro("SPRING", "�ŵ���", 2004, "ȫ��");

		for(int i=0; i<books.length; i++){
			books[i].show();
		}

		//books[0].title = "aaa";
	}
}
