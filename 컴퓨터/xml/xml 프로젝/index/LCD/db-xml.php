<?

$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("������ �ȉ���");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "����X";
}else{
echo "����O";
}

$sql = "select * from lcd"; //DB���� ������������
$rs = mysql_query($sql);
while($result = mysql_fetch_array($rs)){
  $brand = $result[brand];
  $inch = $result[inch];
  $rate = $result[rate];
  $mode = $result[mode];
  $fault = $result[fault];
  $model = $result[model];
  $adddate = $result[adddate];
  $price = $result[price];
  $seller = $result[seller];
      
//DB���� ������ ������ Xml������ Element�� ����  
$xmlList.="<lcd>
<brand>$brand</brand>
<inch>$inch</inch>
<rate>$rate</rate>
<mode>$mode</mode>
<fault>$fault</fault>
<model>$model</model>
<adddate>$adddate</adddate>
<price>$price</price>
<seller>$seller</seller>

</lcd>";

}
mysql_free_result($rs);

//���� XmlDoc�� ������ ����
$xmlDoc="<?xml version='1.0' encoding='euc-kr'?> <node>$xmlList</node>";


//XmlDoc�� ������ ������ xml���� �����ϱ�
$fp = fopen("total.xml","w");
fwrite($fp, $xmlDoc);
fclose($fp);


##DB��������

?>
