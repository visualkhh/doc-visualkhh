<?

$connect=mysql_connect("localhost","visualhhk","skfkdsk1") or die("DB연결실패");
$mysql=mysql_select_db("visualhhk",$connect);
echo $mysql;


$sql = "select * from lcd"; //DB에서 정보가져오기
$rs = mysql_query($sql);
while($result = mysql_fetch_array($rs)){
  $searchW = $result[searchW];
  $cnt = $result[cnt];
  $date = $result[date];
      
//DB에서 가져온 정보로 Xml문서의 Element를 구성  $xmlList.="<word><searchW>$searchW</searchW><cnt>$cnt</cnt><date>$date</date></word>";

}
mysql_free_result($rs);

//통합 XmlDoc의 내용을 구성
$xmlDoc="<?xml version='1.0' encoding='euc-kr'?> <root>$xmlList</root>";


//XmlDoc의 내용을 가지고 xml파일 생성하기
$fp = fopen("test.xml","w");
fput($fp, $xmlDoc);
fclose($fp);


##DB연결해제

?>
