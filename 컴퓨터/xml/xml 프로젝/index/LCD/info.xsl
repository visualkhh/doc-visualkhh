<?xml version='1.0' encoding='euc-kr'?>

<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>


	<xsl:template match='/'>
<!--    ���� ��ġ    -->	
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
	
   
   
<!--           ���̺���               -->   
   
   
   <TABLE cellSpacing='2' cellPadding='5' width='490' bgColor='#1a568f' border='0'>
 
    <TR>
      <TD align='middle' bgColor='#ffffff' height='90'><!-- ��ǰ�̹����� ���� //-->
          <TABLE cellSpacing='0' cellPadding='6' width="100%" border='0'>
            <TBODY>
			
			
              <TR>
                <TD align='middle' width='80' height='80' rowSpan='2'>

<xsl:apply-templates select = "node/lcd/model"/>
          		<!--�̹���
	<IMG onerror="this.src='http://img.danawa.com/img/noimage.gif';" src="http://img.danawa.com/prod_img/500000/623/657/img/657623_1_80.jpg"> -->
				
				</TD>
				<!--Ǯ����-->
                <TD  class='style5' bgColor='#e8f2fb'>
				<b><xsl:value-of select="node/lcd/brand" />-----<xsl:value-of select="node/lcd/model" /></b>
				</TD>
              </TR>
              <TR>
			  <!--��������-->
                <TD  class='style3' style="LINE-HEIGHT: 18px" bgColor='#e8f2fb'>��������<br/>
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
	   <!--  ���ʳ��� ���̺� �Ҹ��� ���� -->
	   <xsl:apply-templates select="/node/lcd"/> 
	
	 </TR>
  </TBODY>
</TABLE>
   
   

   
   
	<br/>
	
	</body>	
	</html>
	
	
	
	
<!--    ���� ��ġ ��    -->	
</xsl:template>



<!-- �ҷ����͵� -->
	<xsl:template match="/node/lcd">
	
	
<tr>

		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">��ϳ�¥</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='adddate'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">������</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='brand'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">��ġ</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='inch'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">����</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='rate'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">������ ���� ��/��</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='mode'/></TD>

</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">������ ��/��</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='fault'/></TD>
</tr><tr>		
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">�𵨸�</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='model'/></TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">������</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='price'/>��</TD>
</tr><tr>
		<TD width='80' height='20' align='middle' class='style3' bgcolor="#FFFFFF">�Ǹ���</TD>
		<TD bgColor='#e8f2fb' class='product_tit'><xsl:value-of select='seller'/></TD>
</tr>



	</xsl:template> 
		
		
		<!-- ��ũ -->
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
  
  		<!-- ��ũ ��-->
		
<!-- �ҷ����͵� ��-->

</xsl:stylesheet>