<?

$connect=mysql_connect("localhost","visualhhk","skfkdsk1") or die("DB�������");
$mysql=mysql_select_db("visualhhk",$connect);
echo $mysql;


$sql = "select * from lcd"; //DB���� ������������
$rs = mysql_query($sql);
while($result = mysql_fetch_array($rs)){
  $searchW = $result[searchW];
  $cnt = $result[cnt];
  $date = $result[date];
      
//DB���� ������ ������ Xml������ Element�� ����  $xmlList.="<word><searchW>$searchW</searchW><cnt>$cnt</cnt><date>$date</date></word>";

}
mysql_free_result($rs);

//���� XmlDoc�� ������ ����
$xmlDoc="<?xml version='1.0' encoding='euc-kr'?> <root>$xmlList</root>";


//XmlDoc�� ������ ������ xml���� �����ϱ�
$fp = fopen("test.xml","w");
fput($fp, $xmlDoc);
fclose($fp);


##DB��������

?>
