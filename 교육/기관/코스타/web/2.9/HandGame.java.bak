import java.util.*;
import java.io.*;

class Coin
{
	private int coin=0;

	Coin(int in)
	{
		coin=in;
	}

	public void	setcoinM(int in)
	{
			coin+=in;
	}

	public void	setcoinP(int in)
	{
			coin-=in;
	}

	public int getcoin()
	{
		return coin;
	}
}






class SaveFile
{
	int win=0;
	int lose=0;

	
	SaveFile(int win,int lose)
	{
		this.win=win;
		this.lose=lose;
	}

	void save() throws IOException
	{


	Calendar cal = Calendar.getInstance();
	int hour = cal.get(Calendar.HOUR);
	int min = cal.get(Calendar.MINUTE);
	int sec = cal.get(Calendar.SECOND);


	FileWriter fo=new FileWriter("log.txt",true);
	fo.write("  날짜: " + hour + "시 " + min + "분 " + sec + "초 등록.\t"+"승: "+win+"\t\t패: "+lose+"\r\n");
	fo.close();

	}

}






class Game extends Coin 
{int win=0;
int lose=0;
	Game(int in)
	{super(in);
	}

	public void play()throws IOException
	{
		System.out.println("Gawi Bawi Bo");
		String[] COM={"","가위γ","바위■","보ψ"};
		int user=0;
		int com=0;
		int input=0;
			Random r=new Random();
			Scanner sc =new Scanner(System.in);

		do{
				System.out.print("값을 입력하세요(가위1,  바위2, 보3) : ");
				input=sc.nextInt();
			}while(input<1 || input>3);

			user=input;	

			com=r.nextInt(3)+1;

		System.out.println("\t컴터: "+COM[com]);
		System.out.println("\tYOU: "+COM[user]);

		switch(user-com)
				{
			case 2:
			case -1:
				System.out.println("*********컴터가 이겼음ㅠㅠ***********");
				setcoinP(100); lose++;
				System.out.println("컴퓨터에 지셨습니다 100원감소 합니다. 현재코인은: "+getcoin() );	break;
			case 1:
			case -2:
				System.out.println("**********당신이 이겼음 Good*********");
			win++;
				System.out.println("컴퓨터에 지셨습니다 100원감소 합니다. 현재코인은: "+getcoin() );break;
			case 0:
				System.out.println("********비겼음*********");break;
				}

			}
	}





class HandGame 
{
	public static void main(String[] args) throws IOException
	{

		
					System.out.println("동전을넣으세요");
					Scanner sc=new Scanner(System.in);

					int coin = sc.nextInt();


				Game game = new Game(coin);
while(true){

System.out.println("-------게임시작------");
			if(game.getcoin()<=0){
				System.out.println("코인없습니다 게임종료!");
				SaveFile sv= new SaveFile(game.win,game.lose);
				sv.save();
				break;
				
			}else{
				game.play();
System.out.println("******************************\n\n\n");
								System.out.println("잔액이남아있습니다 게임을 계속합니다"+game.getcoin());
			}

}


	}
}
