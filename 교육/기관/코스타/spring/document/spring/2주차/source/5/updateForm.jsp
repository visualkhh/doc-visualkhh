<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<form action="board_update.do" method="post">
		<input type="hidden" name="seq" value="${board.seq }">
		����:	<input type="text" name="title" value="${board.title }"><br>
		�ۼ���:<input type="text" name="writer" value="${board.writer }"><br>
		����:	<input type="text" name="contents" value="${board.contents}"><br>
		<input type="submit" value="�����Ϸ�">
	</form>

</body>
</html>







