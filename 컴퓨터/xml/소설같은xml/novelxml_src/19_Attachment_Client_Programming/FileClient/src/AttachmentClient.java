/**
÷�� ���� �� ������ Ŭ���̾�Ʈ ���� �ڵ�
**/
import javax.xml.soap.*;
import java.net.URL;
import javax.activation.DataHandler;

public class AttachmentClient {
	public static void main(String args[]) throws Exception {
		String endpoint = "http://localhost:8080/attach_saaj/attachmentService";

		MessageFactory messageFactory = MessageFactory.newInstance();
		SOAPMessage request = messageFactory.createMessage();

		/*
		// getContent() �޼ҵ带 �̿��� ÷�� ���� �߰�
		AttachmentPart attachment = request.createAttachmentPart();
		String stringContent = "Update address for Sunny Skies ";
		attachment.setContent(stringContent, "text/plain");
		attachment.setContentId("update_address");
		request.addAttachmentPart(attachment);
		*/

		// DataHandler�� �̿��� ÷�� ���� �߰�
		URL attachURL = new URL("file:///C:/TestCode/Office_Logo.gif");
		DataHandler dHandler = new DataHandler(attachURL);
		AttachmentPart attachment = request.createAttachmentPart(dHandler);
		attachment.setContentId("Office_Logo");
		attachment.setContentType("image/gif");
		request.addAttachmentPart(attachment);
		
		SOAPConnectionFactory sCFactory = SOAPConnectionFactory.newInstance();
		SOAPConnection connection = sCFactory.createConnection();

		SOAPMessage response = connection.call(request, endpoint);
		SOAPBody soapBody = response.getSOAPBody();
		if (soapBody.hasFault()) {
			SOAPFault soapFault = soapBody.getFault();
			String faultCode = soapFault.getFaultCode();
			String faultAuctor = soapFault.getFaultActor();
			String faultString = soapFault.getFaultString();
			System.out.println("Fault Code : " + faultCode);
			System.out.println("Fault Auctor : " + faultAuctor);
			System.out.println("Fault String : " + faultString);
		} else {
			System.out.println("Message Sending Success");
		}
	}
}