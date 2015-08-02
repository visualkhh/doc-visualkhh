import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class BaseballGame extends Frame implements ActionListener{
	
	private Panel pn1,pn2,pn3;
	private Button b[];
	private Button result,reset;
	private TextField textTF[];
	private TextArea textA;
	private Color c;
	private int buttonCount;  //버튼 누르는 횟수 : 3자리 
	private int totalChance;  //총 맞출수 있는 기회 :5회
	
	private int strike,ball;
	
	private int ranNum[]; //랜덤 수 
	private int inputNum[]; //버튼으로 받아들이는 수
	private boolean duplicate[]; //중복 체크 변수 
	private boolean success;
		
	public BaseballGame(){			// 생성자 
		
		success=false;			
				
		inputNum=new int[3];
		duplicate= new boolean[9];
		ranNum=new int[3];
											
		c=new Color(230,230,255);
		setBackground(Color.gray);
		setLayout(new BorderLayout(2,3));
		
		pn1=new Panel();
		pn1.setBackground(Color.gray);
		pn1.setLayout(new GridLayout(1,3,10,2));
		
		textTF= new TextField[3];
		for(int i=0;i<3;i++){
			textTF[i]=new TextField(4);
			textTF[i].setBackground(c);
			pn1.add(textTF[i]);
			textTF[i].setEnabled(false);
		}
		
		result=new Button("확인");
		result.setEnabled(false);
		result.addActionListener(this);
		result.setActionCommand("result");
		
		pn1.add(result);
		add("North",pn1);
		
		pn2=new Panel();
		pn2.setBackground(Color.gray);
		pn2.setLayout(new GridLayout(3,3,2,2));
		
		b=new Button[9];
		for(int i=0;i<9;i++){
						
			b[i]=new Button(""+(i+1));
			b[i].addActionListener(this);
			pn2.add(b[i]);
		}
		add("Center",pn2);
		
		pn3=new Panel();
		pn3.setBackground(Color.gray);
		pn3.setLayout(new FlowLayout());
		
		textA= new TextArea(4,30);
		textA.setBackground(c);
		textA.setEnabled(false);
		pn3.add(textA);
		
		reset= new Button("재시도");
		reset.addActionListener(this);
		reset.setEnabled(false);
		pn3.add(reset);
		add("South",pn3);
		
		addWindowListener(new WindowHandler());
		
		makeRandom();
		
		pack();
		setVisible(true);
	}
	
	public class WindowHandler extends WindowAdapter implements WindowListener{
		public void windowClosing(WindowEvent e){
			setVisible(false);
			dispose();
			System.exit(0);
		}
	}
	
	public void makeRandom(){			//랜덤 수 정하기
		Random rand = new Random();
		int num;
		
		for(int i=0;i<9;i++)			
			duplicate[i]=true;
									
		for(int i=0;i<3;){			// 중복 체크
			num=rand.nextInt(9);		
			if(duplicate[num]){
				ranNum[i]=num+1;
				duplicate[num]=false;
				i++;
			}
		}
	}
		
	public void resultM(){				// 확인?
		for(int i=0;i<textTF.length;i++){
			textTF[i].setText("");
		}
		for(int i=0;i<b.length;i++){
			b[i].setEnabled(true);
			result.setEnabled(false);
		}
		totalChance++;
		check();
		if(totalChance==8 && !success) {
			textA.append("기회 초과!! 실패!!\n");
			success=false;
			reGame();
		}
	}
	
	public void reGame(){				// 재시도 ?
		reset.setEnabled(true);
		result.setEnabled(false);
		
		for(int i=0;i<b.length;i++){
				b[i].setEnabled(false);			
			}
		}
	
	public void check(){				// 랜덤수와 입력된 수 비교
		
		for(int i=0;i<3;i++){
			for(int j=0;j<3;j++){
				if(i==j && inputNum[i]==ranNum[j])strike++;
				else if(inputNum[i]==ranNum[j])ball++;
			}
		}
		
		if(strike==3){
			textA.append("이겼네요!! 추카 !! \n");
			success=true;
			reGame();
		}else {		
			textA.append(inputNum[0]+" "+inputNum[1]+" "+inputNum[2]+" => "
			+strike+" 스트라이크 "+ball+"볼\n");
		}
		strike=ball=0;
	}
		
	public void resetM(){				//재경기 셋팅
		makeRandom();
		totalChance=buttonCount=0;
		
		for(int i=0;i<b.length;i++){
			if(i<3)textTF[i].setText("");
			b[i].setEnabled(true);
		}
		textA.setText("");
		result.setEnabled(false);
		reset.setEnabled(false);
	}
	
	public void actionPerformed(ActionEvent ae){
		String performB = ae.getActionCommand();
		
		if(performB.equals("result")){
			resultM();
		}
		else if(performB.equals("재시도")){
			resetM();
		}
		else{
			int i = Integer.parseInt(performB);
			
			inputNum[buttonCount]=i;
			
			b[i-1].setEnabled(false);		
			textTF[buttonCount].setText(ae.getActionCommand());
		
			if(buttonCount==2) {
				for(i=0;i<b.length;i++){
					b[i].setEnabled(false);
					result.setEnabled(true);
				}
			buttonCount=0;
			}
			else buttonCount++;
		}
	}
	
	public static void main(String args[]){
		new BaseballGame();
	}
}
		
		
		
			