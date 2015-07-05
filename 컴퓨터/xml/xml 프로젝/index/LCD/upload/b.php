<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">

<?
$sp = $upfile_name;

$splitstr = explode(".",$sp);
$upfile_name = $model.".".$splitstr[1];   // 파일이름 변환

 $savedir = "../lcdimg";   // 디렉토리 지정

 $allowSize = 300 * 1024;
 if($allowSize < $upfile_size) {
  echo("파일 용량이 허용된 용량을 초과했습니다.");
  exit;
 }
// $model
 $filename = explode(".", $upfile_name);
 $extension = $filename[sizeof($filename)-1];
  if(!strcmp($extension,"jpg"))
// if(!strcmp($extension,"jpg")||!strcmp($extension,"gif")||!strcmp($extension,"png"))
 {
  //echo("선택한 파일은 업로드가 가능합니다.");  
 }
 else
 {
  echo("이미지 파일만 업로드가 가능합니다.^-^");
  exit;
 }
 
 if(strcmp($upfile,"none")){
  $exist = file_exists("$savedir/$upfile_name");
  if($exist){
   echo("동일한 파일명 존재합니다^-^");
   exit;
  }
  if(!copy($upfile,"$savedir/$upfile_name")){
   echo("파일 복사 실패!");
   exit;
  }
  if(!unlink($upfile)){
   echo("임시 파일 제거 실패!");
   exit;
  }
 }
?>

<B><?=$upfile_name?> 업로드 완료!<br><br></B>
<CENTER>
 <span style="font-size:9pt;"> </span>
 <table width="580" height="168" border="1" cellpadding="00" cellspacing="0" bordercolor="#666666">
   <tr>
     <td width="228"><DIV class=style1 align=center>
       <div align="left">제조사&nbsp;char(255)</div>
     </DIV></td>
     <td width="352"><B>
       <?=$brand?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">인치&nbsp;int(255)</div>
     </DIV></td>
     <td><B>
       <?=$inch?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">비율&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$rate?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">최저가&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$price?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">높낲이&nbsp;유/무&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$mode?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">무결점&nbsp;유/무&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$fault?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">모델명&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$model?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">판매자&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$seller?>
     </B></td>
   </tr>
 </table>

</CENTER>
<CENTER>
 <p><b>미리보기</b></p>
 <span style="font-size:9pt;">미리보기 - 이미지를 선택한 페이지에 삽입</span>
 <BR><IMG src="../lcdimg/<?=$upfile_name?>">
 <center>
   <p><b>파일크기</b></p>
 </center>
 <center>
   <span style="font-size:9pt;">파일크기 :
   <?=$upfile_size?>
  byte</span>
 </center>
</CENTER>
 <p align="center">
 <B>[&nbsp;<A href="javascript:history.go(-1)"><font color="green">뒤로가기</font></A>&nbsp;]</B></p>
</CENTER>





<?
$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("접속이 안됬어요");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "연결X";
}else{
echo "연결O";
}






$query ="insert into lcd values( '$brand',$inch,'$rate','$mode','$fault','$model',curdate(),'$price','$seller')";
//$result = mysql_query($query);
mysql_query($query);
echo "[전송완료]";
?>