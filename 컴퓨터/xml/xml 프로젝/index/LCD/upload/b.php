<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">

<?
$sp = $upfile_name;

$splitstr = explode(".",$sp);
$upfile_name = $model.".".$splitstr[1];   // �����̸� ��ȯ

 $savedir = "../lcdimg";   // ���丮 ����

 $allowSize = 300 * 1024;
 if($allowSize < $upfile_size) {
  echo("���� �뷮�� ���� �뷮�� �ʰ��߽��ϴ�.");
  exit;
 }
// $model
 $filename = explode(".", $upfile_name);
 $extension = $filename[sizeof($filename)-1];
  if(!strcmp($extension,"jpg"))
// if(!strcmp($extension,"jpg")||!strcmp($extension,"gif")||!strcmp($extension,"png"))
 {
  //echo("������ ������ ���ε尡 �����մϴ�.");  
 }
 else
 {
  echo("�̹��� ���ϸ� ���ε尡 �����մϴ�.^-^");
  exit;
 }
 
 if(strcmp($upfile,"none")){
  $exist = file_exists("$savedir/$upfile_name");
  if($exist){
   echo("������ ���ϸ� �����մϴ�^-^");
   exit;
  }
  if(!copy($upfile,"$savedir/$upfile_name")){
   echo("���� ���� ����!");
   exit;
  }
  if(!unlink($upfile)){
   echo("�ӽ� ���� ���� ����!");
   exit;
  }
 }
?>

<B><?=$upfile_name?> ���ε� �Ϸ�!<br><br></B>
<CENTER>
 <span style="font-size:9pt;"> </span>
 <table width="580" height="168" border="1" cellpadding="00" cellspacing="0" bordercolor="#666666">
   <tr>
     <td width="228"><DIV class=style1 align=center>
       <div align="left">������&nbsp;char(255)</div>
     </DIV></td>
     <td width="352"><B>
       <?=$brand?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">��ġ&nbsp;int(255)</div>
     </DIV></td>
     <td><B>
       <?=$inch?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">����&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$rate?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">������&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$price?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">��F��&nbsp;��/��&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$mode?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">������&nbsp;��/��&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$fault?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">�𵨸�&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$model?>
     </B></td>
   </tr>
   <tr>
     <td><DIV class=style1 align=center>
       <div align="left">�Ǹ���&nbsp;char(255)</div>
     </DIV></td>
     <td><B>
       <?=$seller?>
     </B></td>
   </tr>
 </table>

</CENTER>
<CENTER>
 <p><b>�̸�����</b></p>
 <span style="font-size:9pt;">�̸����� - �̹����� ������ �������� ����</span>
 <BR><IMG src="../lcdimg/<?=$upfile_name?>">
 <center>
   <p><b>����ũ��</b></p>
 </center>
 <center>
   <span style="font-size:9pt;">����ũ�� :
   <?=$upfile_size?>
  byte</span>
 </center>
</CENTER>
 <p align="center">
 <B>[&nbsp;<A href="javascript:history.go(-1)"><font color="green">�ڷΰ���</font></A>&nbsp;]</B></p>
</CENTER>





<?
$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("������ �ȉ���");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "����X";
}else{
echo "����O";
}






$query ="insert into lcd values( '$brand',$inch,'$rate','$mode','$fault','$model',curdate(),'$price','$seller')";
//$result = mysql_query($query);
mysql_query($query);
echo "[���ۿϷ�]";
?>