<?php

    printf("<?xml version='1.0' encoding='utf-8'?>"); //화면에 " "안의 내용들을 출력하는데요 XML문서임을 표시해 줍니다.






$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("접속이 안됬어요");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "연결X";
}else{
echo "a";
}

$query =" select brand,inch from lcd";
$result = mysql_query($query);

 printf("<table>");

while($row =mysql_fetch_object($result)){
 printf("<tr>");
 printf("<td>$row->brand</td>");
 printf("<td>$row->inch</td>");
 printf("</tr>");
}
echo"</table>";
?>