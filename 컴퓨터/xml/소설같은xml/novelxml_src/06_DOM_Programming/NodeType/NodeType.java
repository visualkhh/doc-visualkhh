/**
��� Ÿ���� ��� ���� �̿��ؼ� ���� ����� ������ ����ϴ� �ڵ�
**/
import javax.xml.parsers.*;
import org.w3c.dom.*;

public class NodeType {
	public static void main(String[] args) {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = factory.newDocumentBuilder();
			Document document = dBuilder.parse("DOMSample.xml");
			
			if(document.getNodeType() == Node.DOCUMENT_NODE)
			{
				System.out.print("���� ���� ��ť��Ʈ ����̰�, ��� ����� ");
				System.out.print(document.getNodeType() + "�Դϴ�. \n");
			}
			
			Element node = document.getDocumentElement();
			if(node.getNodeType() == Node.ELEMENT_NODE)
			{
				System.out.print("���� ���� ������Ʈ ����̰�, ��� ����� ");
				System.out.print(node.getNodeType() + "�Դϴ�. \n");
			}
		} catch(Exception e) {
			e.printStackTrace(System.err);
		}
	}
}
/***
���� ���� ��ť��Ʈ ����̰�, ��� ����� 9�Դϴ�.
���� ���� ������Ʈ ����̰�, ��� ����� 1�Դϴ�.
***/