<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<html>
<head>
<script language="JavaScript" src="script.js"></script>
</head>
<body>
<table border="1" align="center">
  <form action="registerOk.jsp" name="reg_frm" method="post">
    <tr height="50">
      <td colSpan="2" align="center">
        <h1>ȸ�� ���� ��û</h1>
        '*' ǥ�� �׸��� �ʼ� �Է� �׸��Դϴ�.
      </td>
    </tr>
    
    <tr height="30">
      <td width="80">User ID</td>
      <td><input name="mem_uid" size="20">*</td>
    </tr>
    
    <tr height="30">
      <td width="80">��ȣ</td>
      <td><input name="mem_pwd" size="20" type="password">*</td>
    </tr>
    
    <tr height="30">
      <td width="80">��ȣ Ȯ��</td>
      <td><input name="pwd_check" size="20" type="password">*</td>
    </tr>
      
    <tr height="30">
      <td width="80">��  ��</td>
      <td><input name="mem_name" size="20">*</td>
    </tr>
    
    <tr height="30">
      <td width="80">E-mail</td>
      <td><input name="mem_email" size="30">*</td>
    </tr>
        
    <tr height="30">
      <td width="80">��  ��</td>
      <td><input name="mem_addr" size="40"></td>
    </tr>
    <tr>
     <td colSpan="2" align="center">
      <input type="button" value=" ��� " onclick="check_ok()">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="reset" value=" �ٽ��Է� ">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="reset" value=" ���Ծ��� "
         onclick="javascript:window.location='login.jsp'">
    </tr>
  </form>
</table>        
</body>
</html>