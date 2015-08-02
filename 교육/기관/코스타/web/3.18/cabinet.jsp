<%@ page contentType="text/html;charset=KSC5601" %>
<%@ page errorPage="error.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<fmt:requestEncoding value="KSC5601"/>
<c:if test="${uid == null}">
	<c:redirect url="/login.jsp"/>
</c:if>

<c:choose>
	<c:when test="${roleNo <= 2}">
		<c:set var="isManager" value="yes" scope="session" />
	</c:when>
	<c:otherwise>
		<c:set var="isManager" value="no" scope="session" />
	</c:otherwise>
</c:choose>

<sql:setDataSource var="ds" 
driver="com.mysql.jdbc.Driver" 
user="root"  password="mysql"
scope="session"
url="jdbc:mysql://localhost/root?useUnicode=true&characterEncoding=euckr"/>

<c:choose>
	<%-- 캐비넷 등록 --%>
	<c:when test="${param.cmd == 'add'}">
		<jsp:forward page="cabinet_add.jsp"/>
	</c:when>
	
	<%-- 변경된 캐비넷 정보를 DB에 저장 --%>
	<c:when test="${param.cmd == 'change'}">
		<jsp:forward page="cabinet_change.jsp"/>
	</c:when>
	
	<%-- 캐비넷 변경을 위한 내용 보기 --%>
	<c:when test="${param.cmd == 'get'}">
		<jsp:forward page="cabinet_get.jsp"/>
	</c:when>

	<%-- 캐비넷 삭제 --%>
	<c:when test="${param.cmd == 'delete'}">
		<jsp:forward page="cabinet_delete.jsp"/>
	</c:when>
	
	<%-- 캐비넷 목록 보기(캐비넷 정보 변경을 위해) --%>	
	<c:when test="${param.cmd == 'modify'}">
		<jsp:forward page="cabinet_list.jsp"/>
	</c:when>
	
	<%-- 캐비넷 목록 보기 --%>
	<c:otherwise>
		<jsp:forward page="cabinet_list.jsp"/>
	</c:otherwise>
</c:choose>

