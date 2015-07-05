/**
�������� ���޵� HTTP ��û �޽����� SOAP �޽����� �����ϴ� �ڵ�
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
			MessageFactory mFactory = MessageFactory.newInstance();
			MimeHeaders mimeHeaders = getHeaders(request);
			InputStream inStream = request.getInputStream();
			SOAPMessage reqSOAP = mFactory.createMessage(mimeHeaders, inStream);
        	} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	static MimeHeaders getHeaders(HttpServletRequest req) {
		Enumeration headerNames = req.getHeaderNames();
		MimeHeaders headers = new MimeHeaders();

		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			String headerValue = req.getHeader(headerName);
			StringTokenizer values = new StringTokenizer(headerValue, ",");
			while (values.hasMoreTokens()) {
				headers.addHeader(headerName, values.nextToken().trim());
			}
		}

		return headers;
	}
}