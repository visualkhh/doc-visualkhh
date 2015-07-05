/**
XML ������ ��� ���� ����
**/
import javax.xml.parsers.*;
import org.w3c.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

public class ReplaceNode {
	public static void main(String[] args) {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			factory.setIgnoringElementContentWhitespace(true);
			DocumentBuilder dBuilder = factory.newDocumentBuilder();
			Document document = dBuilder.parse("DOMSample.xml");

			// ��Ʈ ������Ʈ�� ù ��° ���� ������Ʈ�� ��� �̸��� rename_name���� ����
			// <name>�ʳ�Ÿ</name> ---> <rename_name>�ʳ�Ÿ</rename_name>
			Element rootElement = document.getDocumentElement();
			Node renameElement = rootElement.getFirstChild();
			document.renameNode(renameElement, "", "rename_name");

			// ��Ʈ ������Ʈ�� ������ ���� ������Ʈ�� ���� ���� ������Ʈ�� ��ü
			// <CC>2000</CC> ---> <blend>����</blend>
			Element newElement = document.createElement("blend");
			Text newText = document.createTextNode("����");
			newElement.appendChild(newText);
			Node replaceElement = rootElement.getLastChild();
			rootElement.replaceChild(newElement, replaceElement);
			
			TransformerFactory tFactory = TransformerFactory.newInstance();
			Transformer transformer = tFactory.newTransformer();
			DOMSource domSource = new DOMSource(document);
			StreamResult streamResult = new StreamResult("BookList.xml");
			transformer.transform(domSource, streamResult);
		} catch(Exception e) {
			e.printStackTrace(System.err);
		}
	}
}
/***
<?xml version="1.0" encoding="UTF-8"?>
<car>
	<rename_name>�ʳ�Ÿ</rename_name>
	<blend>����</blend>
</car>
***/