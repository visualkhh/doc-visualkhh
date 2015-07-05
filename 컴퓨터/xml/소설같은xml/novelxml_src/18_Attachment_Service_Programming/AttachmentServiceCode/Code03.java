/**
SOAP �޽����� ÷�� ������ ���Ե��� �ʾ��� ��� SOAP Fault�� �ۼ��ϴ� �ڵ�
**/
package attachmentservice;

import javax.xml.soap.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.xml.transform.*;
import java.util.*;
import java.io.*;
import javax.activation.DataHandler;

public class AttachmentServlet extends HttpServlet {
	public void doPost(HttpServletRequest request,
                             HttpServletResponse response)
                             throws ServletException, IOException {
		try {
			/* ... 1. SOAPMessage ��ü ���� ... */
			
			/* ... 2. SOAP �޽����� ÷�� ���� ���� ... */
			
			SOAPMessage responseSOAPMsg = mFactory.createMessage();
			SOAPPart responseSOAPPart = responseSOAPMsg.getSOAPPart();
			SOAPEnvelope responseEnvelope = responseSOAPPart.getEnvelope();
			SOAPBody responseBody = responseEnvelope.getBody();
		
			SOAPFactory soapFactory = SOAPFactory.newInstance();
			if(!result) {	// SOAP �޽����� ÷�� ������ ���ԵǾ� ���� �ʴٸ�...
				SOAPFault fault = responseBody.addFault();
				Name faultName = soapFactory.createName("Client", "SOAP-ENV", null);
				fault.setFaultCode(faultName);
				fault.setFaultActor("http://localhost:8080");
				fault.setFaultString("No Attachment File..!!");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}