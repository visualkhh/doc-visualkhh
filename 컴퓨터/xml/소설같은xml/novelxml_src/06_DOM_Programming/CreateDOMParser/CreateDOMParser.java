/**
DOM �ļ��� �����ϰ�, XML ������ �Ľ��ϰų� ���ο� XML ������ �����ϴ� ����
**/
import javax.xml.parsers.*;
import org.w3c.dom.*;

public class CreateDOMParser {
	public static void main(String[] args) {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = factory.newDocumentBuilder();

			// �� Document ��ü ����
			Document emptyDocument = dBuilder.newDocument();
			System.out.println("�� Document ��ü ���� �Ϸ�");
			
			// XML ������ �ε��Ͽ� Document ��ü ����
			Document xmlDocument = dBuilder.parse("DOMSample.xml");
			System.out.println("DOMSample.xml ������ �Է����� Document ��ü ���� �Ϸ�");
		} catch(Exception e) {
			e.printStackTrace(System.err);
		}
	}
}
/***
�� Document ��ü ���� �Ϸ�
DOMSample.xml ������ �Է����� Document ��ü ���� �Ϸ�
***/