import bookpack.*;
	class bookdemo
	{

		public static void main(String[] args){
		book books[] =new book[5];

		books[0] =new book("j2se","zzz",1111);
		books[1] =new book("j2nse","zzgfz",1112);
		books[2] =new book("j2sdfhe","zzwsz",1110);
		books[3] =new book("j2szxde","zfzz",1122);
		books[4] =new book("j2ggse","zzzqqz",1133);
	
		for(int i=0;i<books.length; i++)
		{
			books[i].show();
		}
		}
		
	}