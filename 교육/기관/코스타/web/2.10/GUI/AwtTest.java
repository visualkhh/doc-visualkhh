import java.applet.*;
import java.awt.*;
public class AwtTest extends Applet {
/*
<applet code="AwtTest.class" width=781 height=628>
</applet>
 */
	

		
		public void init(){
			this.setSize(1000,500);
			Label label1,label2,label3;
			label1=new Label("ù��°");
			label2=new Label("�ι�°");
			label3=new Label("����°");
			label1.setBackground(Color.BLUE);
			label2.setBackground(Color.RED);
			label3.setForeground(new Color(0xFF,0,0));
			this.add(label1);
			this.add(label2);
			this.add(label3);
			
			Button b1=new Button("1");
			Button b2=new Button("1");
			Button b3=new Button("2");
			this.add(b1);
			this.add(b2);
			this.add(b3);
			
/////////////////////////////////////////////////
			Checkbox r1,r2,r3,c1,c2,c3;
			
			CheckboxGroup g=new CheckboxGroup();
			r1=new Checkbox("ù��°",g,true);
			r2=new Checkbox("�ι�°",g,false);
			r3=new Checkbox("����°",g,false);
			this.add(r1);
			this.add(r2);
			this.add(r3);
//////////////////////////////////////////
			c1=new Checkbox("ù��°",null,true);
			c2=new Checkbox("�ι�°",null,false);
			c3=new Checkbox("����°");
			this.add(c1);
			this.add(c2);
			this.add(c3);
			
////////////////////////////////////////////////
			
			Choice menuchoice =new Choice();
			menuchoice.addItem("zz");
			menuchoice.addItem("z1z");
			menuchoice.addItem("z2z");
			add(menuchoice);
			
//////////////////////////////////////////
			//List lst = new List(4, false); //���߼��þȵ�
			List lst = new List(4, true); //���߼��õ�
			 lst.add("Mercury");
			 lst.add("Venus");
			 lst.add("Earth");
			 lst.add("JavaSoft");
			 lst.add("Mars");
			 lst.add("Jupiter");
			 lst.add("Saturn");
			 lst.add("Uranus");
			 lst.add("Neptune");
			 lst.add("Pluto");
			 this.add(lst);
//////////////////////////////////////////////////
			 
			 TextField tf1, tf2, tf3, tf4;
			 tf1 = new TextField();
			 tf2 = new TextField("", 20);
			 tf3 = new TextField("Hello! ");
			 tf4 = new TextField("Hello", 30);
			 this.add(tf1);
			 this.add(tf2);
			 this.add(tf3);
			 
///////////////////////////////////////////////////
			 
			 TextArea ta1= new TextArea("Hello", 5, 40);
			 this.add(ta1);

///////////////////////////////////////////////////////
			 
			 Scrollbar redSlider=new Scrollbar(Scrollbar.VERTICAL, 50, 10, 0, 255);
			 											//������ġ, ����, �ּҰ�,�ִ밪 
			 this.add(redSlider);

			 Scrollbar ranger = new Scrollbar(Scrollbar.HORIZONTAL, 0, 60, 0, 300);
			 this.add(ranger);
			 
///////////////////////////////////////////////////////
			 Canvas c =new Canvas();
			 c.setBackground(Color.PINK);
			 //c.setSize(40,40);
			 c.setBounds(0,0,20,30);
			 //x,y ,����,����
			 this.add(c);
///////////////////////////////////////////////////////
			 
		}
}
