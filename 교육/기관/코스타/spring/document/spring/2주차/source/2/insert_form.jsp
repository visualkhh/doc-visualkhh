<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<spring:hasBindErrors name="boardCommand"/>
	<h3>�۾���</h3>
	<form action="board_insert.do" method="post">
		�ۼ���: <input type="text" name="writer">
		<form:errors path="boardCommand.writer"/>  <br>
		����:	 <input type="text" name="title">
		<form:errors path="boardCommand.title"/> <br>
		����:	 <br>
			<textarea name="contents" rows="6" cols="30"></textarea><br>
		<input type="submit" value="���">		
	</form>
</body>
</html>








