<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	th { background: #E7F1D9; width: 100px; }
</style>
</head>
<body>

<center>
<form action="/StrutsBBS/bbs/write.do" method="post">
	<table border="1" width="840px" cellpadding="3px" cellspacing="0" style="margin: 5px;">
		<tr>
			<th width="100px">제목</th>
			<td colspan="3" align="left">
				<input type="text" name="subject" size="90" maxlength="100" class="g_text">
				<input type="checkbox" name="html" value="use">HTML 사용
				<html:messages id="msg" property="subject">
					<BR><B>* ${msg }</B>
				</html:messages>
			</td>
		</tr>
		<tr>
			<th>이메일</th>
			<td align="left">
				<input type="text" name="email" size="25">
				<html:messages id="msg" property="email">
					<BR><B>* ${msg }</B>
				</html:messages>
			</td>
			<th>홈페이지</th>
			<td align="left">
				<input type="text" name="homepage" size="25">
			</td>
		</tr>
		<tr>
			<th>내용</th>
			<td colspan="3" align="left">
				<textarea name="contents" cols="87" rows="15"></textarea>				
				<html:messages id="msg" property="contents">
					<BR><B>* ${msg }</B>
				</html:messages>
			</td>
		</tr>
		<tr>
			<th>이름</th>
			<td align="left">
				<input type="text" name="writer">
				<html:messages id="msg" property="writer">
					<BR><B>* ${msg }</B>
				</html:messages>
			</td>
			<th>비밀번호</th>
			<td align="left">			
				<input type="password" name="password">
				<html:messages id="msg" property="password">
					<BR><B>* ${msg }</B>
				</html:messages>
			</td>
		</tr>
		<tr>
			<td colspan="4" align="center">
				<BR>
				<input type="submit" value="글등록">
				<input type="reset" value="재작성">
			</td>
		</tr>
	</table>
	<input type="hidden" name="action" value="write">
</form>
</center>
</body>
</html>