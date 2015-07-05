<?xml version='1.0' encoding='euc-kr'?>


<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>


	<xsl:template match='/'>
<!--    루투 매치    -->	
	<html>
	
	
	<style type='text/css'>

body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 00px;
	margin-bottom: 0px;
}
.style1 {color: #FFFFFF  ; font-size: 12px}
.style2 {color: #666666  ; font-size: 12px}
.style3 {color: #000000  ; font-size: 12px}
.style4 {
	color: #FFFFFF;
	font-weight: bold;
	font-size: 16px;
}
</style>
	
	
	<body>
	
	
	 <table width='396' height='99' border='0' cellpadding='00' cellspacing='00'>
     <form name='form1' method="load_airplane_data.php">
       <tr>
         <td height='28' background='image/topbar.gif'><div align="center" class="style4">LCD (상품개수:<b><xsl:value-of select='count(/node/lcd)'/>개</b>)</div></td>
       </tr>
       <tr>
         <td height='20'><table width='396' height='24' border='0' cellpadding='0' cellspacing='0'>
           <tr align='center' valign='middle'>
             <td width='190' height='21'><div align='center'>
                 <select name='menu1'>
                   <option selected='1' value="">　　　    검색분류　　　　</option>
				   <option value="brand" >제조회사</option>
                   <option value="model">모델명</option>
                   <option value="inch">인치</option>
                   <option value="adddate">등록날짜</option>
                   <option value="price">가격</option>
                   <option value="seller">판매자</option>
                 </select>
             </div></td>
             <td width='103'><div align='center'>
                 <input name='textfield' type='text' size='22'/>
             </div></td>
             <td width='103'><INPUT type='image' src='image/search.gif' align='absMiddle' value='search' border='0' name='submit'/></td>
           </tr>
         </table></td>
       </tr>
	   
	   
	
	 <tr>
         <td>
	
	<table width='396' height='50' border='0' cellpadding='00' cellspacing='00'>
           <tr>
             <td height='25'><div align='center'>
                 <select name='menu2'>
                   <option selected='1'>- 제품 분류 -</option>
                   <option >- 서비스 예정 --------</option>
                 </select>
             </div></td>
             <td><div align='center'>
                 <select name='menu3'>
                   <option selected='1'>- 화면 비율 -</option>
                   <option >- 서비스 예정 ----</option>
                 </select>
             </div></td>
             <td><div align='center'>
                 <select name='menu4'>
                   <option selected='1'> - 응답 속도 -</option>
                   <option >- 서비스 예정 ----</option>
                 </select>
             </div></td>
           </tr>
           <tr>
             <td height='25'><div align='center'>
                 <select name='menu5'>
                   <option selected='1'>- 높낮이 조절 -</option>
                   <option >- 서비스 예정 ----</option>
                 </select>
             </div></td>
             <td><div align='center'>
                 <select name='menu6'>
                   <option selected='1'>- 무결점 정책 -</option>
                   <option >- 서비스 예정 ----</option>
                 </select>
             </div></td>
             <td><div align='center' class="style2">검색기능이<br/> 가능해졌습니다.</div></td>
           </tr>
         </table>
	
	
	
	</td>
     </tr></form>
   </table>
   
   
	
	  <table width='396' height='20'  border='0' cellpadding='00' cellspacing='00'>
     <tr valign='middle'>
       <td><div align='center' class='style2'>전체</div></td>
       <td><div align='center' class='style2'>상품명순 ↓ </div></td>
       <td><div align='center' class='style2'>인기상품</div></td>
       <td><div align='center' class='style2'>등록일수 ↓ </div></td>
       <td><div align='center' class='style2'>가격순 ↓ </div></td>
     </tr>
   </table>
	
	
	
	
	<table width='396' cellSpacing='1' cellPadding='0'  bgColor='B6D0E8' border='0'>
     <tr bgcolor='468ED2'>
       <td width='21'><div align='center'><img src='image/b.gif' width='19' height='21'></img></div></td>
       <td width='172'><div align='center' class='style1'>품목↑</div></td>
       <td width='60'><div align='center' class='style1'>등록</div></td>
       <td width='62'><div align='center' class='style1'>업체</div></td>
       <td width='75'><div align='center' class='style1'>최저가</div></td>
     </tr>
   </table>
   
   
   
<!--           테이블쫙               -->   
   <table width='396' height='21' border='0' cellPadding='0' cellSpacing='1'  bgColor='#CCCCCC'>





<xsl:apply-templates select="/node/lcd"/>  <!--  안쪽내용 테이블 불르로 간닷 -->






   </table>
<!--           테이블쫙끝               -->   
	<br/>
	<center><a href="./upload/a.php" target="&#13;&#10;  &#9;&#9;rightFrame&#13;&#10;  &#9;&#9;"><img src="./image/upup.jpg" border="0"/></a></center>
	
	</body>	
	</html>
	
	
	
	
<!--    루투 매치 끝    -->	
</xsl:template>



<!-- 불러질것들 -->
	<xsl:template match="/node/lcd">
	
	
	     <tr bgcolor='FFFFFF'>
		
       <td width='21'><div align='center'  class='style2'><img src='image/b.gif' width='19' height='21'></img></div></td>
	  	
       <td width='172'><div align='center' class='style2'> <xsl:apply-templates select = "model"/></div></td>
       <td width='60'><div align='center' class='style2'><xsl:value-of select='adddate'/></div></td>
       <td width='62'><div align='center' class='style2'><xsl:value-of select='seller'/></div></td>
       <td width='75'><div align='center' class='style2'><xsl:value-of select='price'/>원</div></td>
	   </tr>
	</xsl:template> 
		
		
		<!-- 링크 -->
  <xsl:template match="model">
   	<xsl:element name="a"> 
  		<xsl:attribute name="href">
  		./item/<xsl:value-of select='.' />.xml
  		</xsl:attribute>
		
		<xsl:attribute name="target">
  		rightFrame
  		</xsl:attribute>
  		
		<xsl:value-of select="../brand" />-----<xsl:value-of select="." />
   	</xsl:element>
  </xsl:template> 
  
  		<!-- 링크 끝-->
		
<!-- 불러질것들 끝-->

</xsl:stylesheet>