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
.style5 {color: #000000  ; font-size: 20px }
.product_tit{color: #666666  ; font-size: 12px}
</style>
	
	
	<body>
	
   
   
<!--           테이블쫙               -->   
   
   
   <TABLE cellSpacing='2' cellPadding='5' width='490' bgColor='#1a568f' border='0'>
 
    <TR>
      <TD align='middle' bgColor='#ffffff' height='90'><!-- 상품이미지와 정보 //-->
          <TABLE cellSpacing='0' cellPadding='6' width="100%" border='0'>
            <TBODY>
			
			
              <TR>
                <TD align='middle' width='80' height='80' rowSpan='2'>

<xsl:apply-templates select = "node/lcd/model"/>
          		<!--이미지
	<IMG onerror="this.src='http://img.danawa.com/img/noimage.gif';" src="http://img.danawa.com/prod_img/500000/623/657/img/657623_1_80.jpg"> -->
				
				</TD>
				<!--풀네임-->
                <TD  class='style5' bgColor='#e8f2fb'>
				<b><xsl:value-of select="node/lcd/brand" />-----<xsl:value-of select="node/lcd/model" /></b>
				</TD>
              </TR>
              <TR>
			  <!--세부정보-->
                <TD  class='style3' style="LINE-HEIGHT: 18px" bgColor='#e8f2fb'>간략보기<br/>
				<xsl:value-of select="node/lcd/inch" />  /  <xsl:value-of select="node/lcd/rate" />  /  <xsl:value-of select="node/lcd/mode" />  /  <xsl:value-of select="node/lcd/fault" />  /  <xsl:value-of select="node/lcd/price" />
				
				
				
				
				
				</TD>
              </TR>
            </TBODY>
        </TABLE></TD>
    </TR>
 
</TABLE>
   
   
   <TABLE width="490" border='0' cellPadding='6' cellSpacing='1' bgcolor="#666666">
  <TBODY>
    <TR>
	   <!--  안쪽내용 테이블 불르로 간닷 -->
	   <xsl:apply-templates select="/node/lcd"/> 
	
	 </TR>
  </TBODY>
</TABLE>
   
   

   
   
	<br/>
	
	</body>	
	</html>
	
	
	
	
<!--    루투 매치 끝    -->	
</xsl:template>



<!-- 불러질것들 -->
	<xsl:template match="/node/lcd">
	
	
<tr>

		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">등록날짜</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='adddate'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">제조사</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='brand'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">인치</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='inch'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">비율</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='rate'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">높낮이 조절 유/무</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='mode'/></TD>

</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">무결점 유/무</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='fault'/></TD>
</tr><tr>		
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">모델명</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='model'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">최저가</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='price'/>원</TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">판매자</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='seller'/></TD>
</tr>



	</xsl:template> 
		
		
		<!-- 링크 -->
  <xsl:template match="model">
   	<xsl:element name="img"> 
  		<xsl:attribute name="src">
  		../lcdimg/<xsl:value-of select='.' />.jpg
  		</xsl:attribute>
		
		<xsl:attribute name="onerror">
		this.src='../image/noimg.jpg';
  		
  		</xsl:attribute>
  		

   	</xsl:element>
  </xsl:template> 
  
  		<!-- 링크 끝-->
		
<!-- 불러질것들 끝-->

</xsl:stylesheet>