<?php

    printf("<?xml version='1.0' encoding='utf-8'?>"); //ȭ�鿡 " "���� ������� ����ϴµ��� XML�������� ǥ���� �ݴϴ�.






$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("������ �ȉ���");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "����X";
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