<%@ page contentType="text/html;charset=KSC5601" %>
<%@ page import="myclasses.BbsArticle" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/struts-html" prefix="html" %>
<html:html><head><title>게시판 읽기</title></head>
<link href="mystyle.css" rel="stylesheet" type="text/css">
<script>
  function show(cmd, url) {
	var d = document.getElementById('enter');
	d.style.display = 'block';
	var form = document.forms.my;	
	form.attributes.action.value = url;
	form.action.value = cmd;
	if(cmd == 'modify') {
		form.submit.value = '글 수정';
	} else if(cmd == 'delete' || cmd == 'delete_r') {
		form.submit.value = '글 삭제';
	}
  }
  
  function hide() {
	var d = document.getElementById('enter');
	d.style.display = 'none';  
  }
  
  var init = false;
  function edit() {
  	var d = document.getElementById('comment');
	if(init == false) {
		d.contents.value='';
		init = true;
	}
  }
  
  function vote() {
  	var win = open('','w','width=200,height=100');
  }
  
  function mydelete(id) {
  	var d = document.getElementById(id);
	d.style.display = 'block';
	var bttn = 'b' + id;
	var b = document.getElementById(bttn);
	b.style.display = 'none';
  }
</script>
<body><h3 id="header">게시판 읽기</h3>
<div id='menu'>
<%@ include file="mymenu.jsp" %>
</div>
<div id="main">
<table width=100%> <!--게시물-->
	<tr><td>
	<b>제목 : ${article.subject} </b><br>
	작성자 : <a href=mailto:${article.email}>${article.writer}</a> 
			 &nbsp;<span style='font-size : 80%'>
			 <a href=${article.homepage}>${article.homepage}</a>
			 </span> <br>
	작성일 : ${article.idate}<br>
	조회수 : ${article.rcount} &nbsp; &nbsp;  
	추천수 : ${article.vcount} &nbsp;
	<span style='font-size:70%'>
	<c:if test='${not isReply}'>
	<a href=/bbs.do?action=vote&num=${article.num} 
		onClick='vote()' target='w'>추천하기</a>
	</c:if>		
	<c:if test='${isReply}'>
	<a href=/bbs.do?action=vote_r&num=${article.num} 
		onClick='vote()' target='w'>추천하기</a>
	</c:if>	</span>
	<br>
	</td></tr>
	<tr><td colspan=2 height=1 background=/image/dotline.gif></td></tr>
	<tr><td colspan=2><br>
	<c:if test='${article.html}'>
		${article.contents}
	</c:if>
	<c:if test='${not article.html}'>
	<%
		BbsArticle ar = (BbsArticle) request.getAttribute("article");
		String contents = ar.getContents();
		out.println(contents.replaceAll("\n","<br>"));
	%>
	</c:if><br><br>
	</td></tr>
	<tr><td colspan=2 height=1 background=/image/dotline.gif></td></tr>
</table>

<table width='100%'> <!-- 메뉴 -->
<tr><td><div class='button'><a href=/bbs.do>목록보기</a></div></td>
<c:choose>
	<c:when test='${empty isReply}'>
	<td><div class='button'>
	<a href="javascript:show('modify',
		'/bbs.do?action=modify&num=${article.num}')">수정하기</a>
	</div></td>
	<c:if test='${article.size == 0}'>
	<td><div class='button'>
	<a href="javascript:show('delete','/delete.do')">삭제하기</a>
	</div></td>
	</c:if>		
	<td><div class='button'>
	<a href=/bbs.do?action=reply&num=${article.num}>답글쓰기</a>
	</div></td>
	</c:when>
	<c:otherwise>
	<td><div class='button'>
	<a href="javascript:show('modify',
		'/bbs.do?action=modify_r&num=${article.num}')">수정하기</a>	
	</div></td>
	<c:if test='${article.size == 0}'>
	<td><div class='button'>
	<a href="javascript:show('delete_r','/delete.do')">삭제하기</a>
	</div></td>
	</c:if>		
	<td><div class='button'>
	<a href=/bbs.do?action=reply_r&num=${article.num}>답글쓰기</a>
	</div></td>	
	</c:otherwise>
</c:choose>
	<td><div class='button'>
	<a href=/bbs_write.jsp>글쓰기</a>
	</div></td></tr>
</table>

<!-- 글 수정 및 삭제를 위한 암호 입력 -->
<div id='enter' style='display:none'>
	<form method=post action='/bbs.do' name='my'>
	암호 <input type=password name=password size=5>
	<input type=hidden  name='num' value='${article.num}'>
	<input type=hidden  name='action' value=''>
	<input type=submit name='submit' value='x'>
	<input type=reset name='reset' value='숨기기' onClick='hide()'>
	</form>
</div>

<!-- 댓글 읽기 -->
<table width='99%'>
<c:forEach var="comment" items="${article.comments}">
	<tr><td colspan=2 height=1 background=/image/dotline.gif></td></tr>
	<tr><td width=100>
	 <b>${comment.writer}</b><br>
	 <span style='font-size:70%'>${comment.idate}<br>
	 ${comment.ip} &nbsp; &nbsp;	
	 <button id='b${comment.num}' 
	 	onClick='mydelete(${comment.num})'>x</button>	
	 </span>
	 <!-- 댓글 삭제 폼 -->
	 <span id='${comment.num}' style='display:none'>
	 <form method=post action=/delete_comment.do>	 
	 암호 <input type=password name=password size=5>
		<input type=hidden name='num' value='${comment.num}'>
		<input type=hidden name='action' value='delete_comment'>
		<input type=submit value='삭제'>
		</form>	 
	 </span>
	 </td><td>${comment.contents}</td></tr>
</c:forEach>
<tr><td colspan=2 height=1 background=/image/dotline.gif></td></tr>
</table>

<!-- 댓글쓰기 -->
<form id='comment' action='/bbs_comment.do' method='post'>
<div style='text-align:center'>
<table width='95%'>
	<tr><td align=center>
	<textarea name='contents' cols='65' rows='5' onFocus='edit()'>
댓글을 작성해주세요
	</textarea>
	</td></tr>
	<tr><td align=right>
	이름<input type='text' name='writer' size='10'> 
	암호<input type='password' name='password' size='10'>
	<input type='submit' value='저장'></td></tr>
</table>
</div>
<input type='hidden' name='action' value='comment'>
<c:choose>
	<c:when test='${empty isReply}'>
	<input type='hidden' name='num' value='${article.num}'>
	</c:when>
	<c:otherwise>
	<input type='hidden' name='num' value='-${article.num}'>
	</c:otherwise>
</c:choose>
</form>
</div>
</body>
</html:html>

