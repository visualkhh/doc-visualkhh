<?

$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("접속이 안됬어요");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "연결X";
}else{
echo "연결O";
}

$sql = "select * from lcd"; //DB에서 정보가져오기
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
      
//DB에서 가져온 정보로 Xml문서의 Element를 구성  
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

//통합 XmlDoc의 내용을 구성
$xmlDoc="<?xml version='1.0' encoding='euc-kr'?> <node>$xmlList</node>";


//XmlDoc의 내용을 가지고 xml파일 생성하기
$fp = fopen("total.xml","w");
fwrite($fp, $xmlDoc);
fclose($fp);


##DB연결해제

?>
