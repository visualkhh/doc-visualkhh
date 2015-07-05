<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<style type="text/css">
<!--
.style1 {color: #333333}
-->
</style>
<form name="form1" method="post" action="b.php" enctype='multipart/form-data'>
  <table width="396" height="144" border="0" cellspacing="1" bgcolor="#666666">
   <tr bgcolor="#00CCFF">
      <td><div align="center" class="style1">제조사&nbsp; char(255)<br>
      ex) SAMSUNG </div></td>
      <td><div align="center" class="style1">인치&nbsp; int(255)<br>
      ex) 25      </div></td>
      <td><div align="center" class="style1">비율&nbsp; char(255)<br>
      ex) 1024*768 </div></td>
      <td><div align="center" class="style1">
        <p>최저가&nbsp; char(255)<br>
          ex) 845471</p>
      </div></td>
    </tr>

    <tr>
      <td>
        <div align="center" class="style1">
          <input type="text" name="brand">
        </div></td>
      <td>
        <div align="center" class="style1">
          <input type="text" name="inch">
        </div></td>
      <td>
        <div align="center" class="style1">
          <input type="text" name="rate">
        </div></td>
      <td>
        <input type="text" name="price">
    
        </td>
    </tr>
   <tr bgcolor="#00CCFF">
      <td><div align="center" class="style1">높낲이 유/무&nbsp; char(255)<br>
        ex) NO / YES</div></td>
      <td><div align="center" class="style1">무결점 유/무 &nbsp; char(255)<br>
      ex) NO / YES      </div></td>
      <td><div align="center" class="style1">모델명&nbsp; char(255)<br>
      ex) SA-643AH</div></td>
      <td><div align="center" class="style1">판매자&nbsp; char(255)<br>
      ex) Visualhhk </div></td>
    </tr>
   <tr>
     <td>
       <div align="center" class="style1">
         <input type="text" name="mode">
       </div></td>
     <td>
       <div align="center" class="style1">
         <input type="text" name="fault">
       </div></td>
     <td>
       <div align="center" class="style1">
         <input type="text" name="model">
       </div></td>
     <td>
       <div align="center" class="style1">
         <input type="text" name="seller">   
          </div></td>
   </tr>
   
    <tr bgcolor="#00CCFF">
      <td>  <div align="center" class="style1">제품 사진올리기</div></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
	<tr bgcolor="#FFFFFF">
      <td colspan="2"> <p>
        <input name="upfile" type="file" id="upfile" szie='30'>
        <br>
      이미지는 jpg 밖에 안되며<br>
      사이즈는 300 * 1024 이하 입니다.</p>
      </td>
      <td><p>하나라도 빠짐없이 기재<br>
        하여주세요 </p>
      </td>
      <td>* 형이 맞지않는 값을 입력하였을때 정보 업로드가 안될수도 있습니다. </td>
    </tr>
 
  </table>
  주의사항: 모든것은 영어로 작성 가능하며 자료형에 주의 해주세요 
  <input type="submit" name="Submit" value="전송">
</form>
