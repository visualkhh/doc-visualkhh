<? 
   echo "<?xml version='1.0' encoding='utf-8'?>"; //ȭ�鿡 " "���� ������� ����ϴµ��� XML�������� ǥ���� �ݴϴ�.


   echo "<node>"; //�ֻ��� �����~ ���������� " "���� ������� ȭ�鿡 ������ݴϴ�.

$connect_host        = "localhost";
$connect_id        = "visualhhk";
$connect_pass        = "skfkdsk1";
$connect_db        = "visualhhk";
$connect_table        = "lcd";
$xls_filename        = "filename.xls"; 

$connect=@mysql_connect($connect_host,$connect_id,$connect_pass);
$mysql=@mysql_select_db($connect_db,$connect); 

//header("Content-Type: application/vnd.ms-excel"); 
//header("Content-Disposition: attachment; filename=$xls_filename"); 
?>  

<?

$fields = mysql_list_fields("$connect_db", "$connect_table");
$columns = mysql_num_fields($fields); 

for ($i = 0; $i < $columns; $i++) {
$field[$i]=mysql_field_name($fields, $i);
  echo "<".$field[$i]. ">";
  
/**  $result=mysql_query("select * from $connect_table");
while($data=mysql_fetch_assoc($result)){


for ($i = 0; $i < sizeof($field); $i++) {
echo "<td>".$data["$field[$i]"]."</td>";
} 

echo"</tr>";
} **/

  echo "ggg";
  
  
  
    echo "</".$field[$i]. ">";
}
echo "</node>";
?>



