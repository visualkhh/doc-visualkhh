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
	<h3>글쓰기</h3>
	<form action="board_insert.do" method="post">
		작성자: <input type="text" name="writer">
		<form:errors path="boardCommand.writer"/>  <br>
		제목:	 <input type="text" name="title">
		<form:errors path="boardCommand.title"/> <br>
		내용:	 <br>
			<textarea name="contents" rows="6" cols="30"></textarea><br>
		<input type="submit" value="등록">		
	</form>
</body>
</html>








