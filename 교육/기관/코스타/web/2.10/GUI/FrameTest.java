import java.awt.Button;
import java.awt.Color;
import java.awt.Frame;
import java.awt.Label;


public class FrameTest {
	public static void main(String[] args) {
		Frame f = new Frame();
		f.setBounds(10,10,400,400);
		f.setVisible(true);

		Label label1,label2,label3;
		label1=new Label("첫번째");
		label2=new Label("두번째");
		label3=new Label("세번째");
		label1.setBackground(Color.BLUE);
		label2.setBackground(Color.RED);
		label3.setForeground(new Color(0xFF,0,0));
		
		f.add(label1);
		f.add(label2);
		f.add(label3);
		
		Button b1=new Button("1");
		Button b2=new Button("1");
		Button b3=new Button("2");
		
		f.add(b1);
		f.add(b2);
		f.add(b3);
	}

}
