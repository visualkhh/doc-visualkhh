<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<table width="850px" cellpadding="3px" cellspacing="0" border="1">
	<tr bgcolor="#E7F1D9">
		<th width="80px">글번호</th>
		<th width="400px">제목</th>
		<th width="100px">작성자</th>
		<th width="60">조회수</th>
		<th width="60">추천수</th>
		<th width="150">작성일</th>
	</tr>
	<c:forEach var="em" items="${list}">
		<tr>
			<td align="center">${em.num }</td>
			<td align="center">			
				<a href="/StrutsBBS/bbs/bbs.do?action=read&num=${em.num }&pageNum=${param.pageNum }&subject=${param.subject }&writer=${param.writer }">
					${em.subject }<c:if test="${em.comment_count > 0}"> &nbsp;<B><span style="font-size: 11px">[${em.comment_count}]</span></B></c:if>										
				</a>
			</td>
			<td align="center">${em.writer }</td>
			<td align="center">${em.rcount }</td>
			<td align="center">${em.vcount }</td>
			<td align="center">
				<fmt:formatDate value="${em.idate }" pattern="MM월 dd일 HH시 mm분"/>
			</td>
		</tr>
	</c:forEach>
	<tr>
		<td colspan="6" align="center">
			<BR>
			${pageList }
		</td>
	</tr>	
</table>
<BR>
<table  width="850px" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td align="left">&nbsp;
			<input type="button" value="글쓰기" onclick="javascript:location.href='/StrutsBBS/bbs/writeForm.do'">
		</td>
		<td colspan="3" align="right">
			<form action="/StrutsBBS/bbs/bbs.do?action=list" method="POST">
				<input type="checkbox" name="writer" value="1" <c:if test="${not empty param.writer}">checked="checked"</c:if>>작성자				
				<input type="checkbox" name="subject" value="1" <c:if test="${not empty param.subject}">checked="checked"</c:if>>제목&nbsp;&nbsp;
				<c:choose>
					<c:when test="${not empty param.subject }">	
						<input type="text" name="keyword" size="10" value="${empty param.keyword ? param.subject: param.keyword}">
					</c:when>
					<c:when test="${not empty param.writer }">					
						<input type="text" name="keyword" size="10" value="${empty param.keyword ? param.writer: param.keyword}">
					</c:when>
					<c:otherwise>
						<input type="text" name="keyword" size="10">						
					</c:otherwise>
				</c:choose>
				
				<input type="submit" value="검색" style="margin-right: 10px;">
			</form>
		</td>
	</tr>
</table>	
</body>
</html>
