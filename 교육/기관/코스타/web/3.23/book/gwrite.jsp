<%@ page contentType="text/html;charset=KSC5601" %>
<html><head><title>방명록 작성</title></head>
<LINK href="mystyle.css" rel="stylesheet" type="text/css">
<body>
<div id="header">
	<%@ include file="header.jsp"%>
</div>
<div id="menu"> 
	<%@ include file="menu.jsp"%>
</div>
<div id="main">
	<form method=post action=>
	<table>
		<tr><td>이름  </td>
		    <td><input type=text name=name></td>
		</tr>
		<tr><td>E-mail  </td>
		    <td><input type=text name=email></td>
		</tr>
		<tr><td>홈페이지  </td>
		    <td><input type=text name=home></td>
		</tr>
		<tr> <td>내용 </td>
		     <td><textarea cols=50 rows=15 name=contents></textarea></td>
		</tr>
		<tr><td colspan=2 align=center>
		<input type=submit value=전송> <input type=reset value=취소></td>
		</tr>
	</table>
	</form>
</div>
</body>
</html>

