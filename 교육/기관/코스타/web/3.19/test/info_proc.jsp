<%@ page contentType = "text/html; charset=euc-kr" %>
<%
    request.setAttribute("PAGETITLE", "정보보기");
%>
<jsp:forward page="/jsp3/template/template.jsp">
    <jsp:param name="CONTENTPAGE" value="/jsp3/info_view.jsp" />
</jsp:forward>
