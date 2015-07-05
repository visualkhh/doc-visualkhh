/**
Ư�� ��带 �����ϴ� ����
**/
import javax.xml.parsers.*;
import org.w3c.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

public class RemoveNode {
	public static void main(String[] args) {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			factory.setIgnoringElementContentWhitespace(true);
			DocumentBuilder dBuilder = factory.newDocumentBuilder();
			Document document = dBuilder.parse("DOMSample.xml");
			Element rootElement = document.getDocumentElement();

			// ��Ʈ ������Ʈ�� ������ ���� ������Ʈ�� �� ����
			// <Element3>C</Element3> ---> ����
			Node removeElement = rootElement.getLastChild();
			rootElement.removeChild(removeElement);

			// ��Ʈ ������Ʈ�� Attr3 ��Ʈ����Ʈ ����
			// <root Attr1="1" Attr2="2" Attr3="3"> ---> <root Attr="1" Attr2="2">
			rootElement.removeAttribute("Attr3");
			
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
<root Attr1="1" Attr2="2">
	<Element1>A</Element1>
	<Element2>B</Element2>
</root>
***/