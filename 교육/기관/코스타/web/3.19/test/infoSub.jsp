<%@ page contentType = "text/html; charset=euc-kr" %>
<%
    String type = request.getParameter("type");
    if (type != null) {
%>
<br>
<table width="100%" border="1" cellpadding="0" cellspacing="0">
<tr>
    <td>Ÿ��</td>
    <td><b><%= type %></b></td>
</tr>
<tr>
    <td>Ư¡</td>
    <td>
<%      if (type.equals("A")) { %>
    ���� ������.
<%      } else if (type.equals("B")) { %>
    �پ ��ó �ɷ�
<%      }   %>
    </td>
</tr>
</table>
<%
    }
%>
