<?


$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("������ �ȉ���");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "����X";
}else{
echo "a";
}


 if($mode=="insert")
 {
  $query="insert into project(name, sex, phone, day) values('$insert_name','$sex','$phone','$day', now())";
  $result=mysql_query($query);
  if($result==0)
   die(mysql_error());
 }
 else if($mode=="delete")
 {
  $query="delete from project where no=$no";
  $result = mysql_query($query);
  if($result==0)
   die(mysql_error());
 }
 else if($mode=="update")
 {
  if($update=="")
  {
   $query="select * from project where no = $no" ;
   $result = mysql_query( $query);
   if( $result == 0 )
    die(mysql_error());
   $row=mysql_fetch_array( $result );
   mysql_free_result( $result );

   echo"<form action=$PHP_SELF method=post>";
   echo"�̸� :<input type=text size=8 name=update_name value='$row[name]'>";
   echo"���� :<input type=text size=3 name=sex value='$row[sex]'>";
   echo"��ȭ��ȣ :<input type=text size=16 name=phone value='$row[phone]'>";
   echo"���Խð� :<input type=text size=25 name=day value='$row[day]'>";
   echo"<input type=hidden name=mode value=update>";
   echo"<input type=hidden name=update value=1>";
   echo"<input type=hidden name=no value=$no>";
   echo"<input type=submit value='�����ϱ�'>";
   echo"</form>";
   die();
  }
  else
  {
   $query="update project set name ='$update_name', sex='$sex', phone='$phone', day='$day' WHERE no= $no";
   $result =mysql_query($query);
   if($result ==0 )
    die(mysql_error());
  }

 }
?>
 <table border=1>
 <tr>
 
  <td><a href=<? echo $PHP_SELF; ?>?ord=1>������ �̸�</a></td>
                <td><a href=<? echo $PHP_SELF; ?>?ord=2>����</a></td>
  <td><a href=<? echo $PHP_SELF; ?>?ord=3>��ȭ��ȣ</a></td>
  <td><a href=<? echo $PHP_SELF; ?>?ord=4>���Գ�¥</a></td>
             <td>����/����</td> 
         <td><a href=<? echo $PHP_SELF; ?>?ord=5>����</a></td>
 
 </tr>
<?
 if( $project_name != "" )
  $where = " name= '$project_name' " ;
 if( $ord==1 )
  $order=" ORDER BY name" ;
 else if( $ord==2 )
  $order=" ORDER BY sex" ;
        else if( $ord==3 )
                $order=" ORDER BY phone" ;
        else if( $ord==4 )
                $order=" ORDER BY day" ;

 $query = "SELECT no, name, sex, phone, day FROM project" ;

 if( $where !="" )
  $query .= " WHERE $where" ;

 $query .= $order ;

 $result = mysql_query( $query ) ;
 if($result==0)
  die( mysql_error() ) ;

 while( $row = mysql_fetch_array( $result ) )
 {
  echo "<tr><td>" ;
  echo $row["name"] ;
                echo "</td><td>" ;
                echo $row["sex"] ;
                echo "</td><td>" ;
                echo $row["phone"] ;
                echo "</td><td>" ;
                echo $row["day"] ;
  $no=$row["no"];
                echo "</td><td>" ;
                echo "<a href=$PHP_SELF?no=$no&mode=update&ord=$ord>����</a>/" ;
  echo "<a href=$PHP_SELF?no=$no&mode=delete&ord=$ord>����</a>" ;

  echo "</td></tr>" ;
 }
 mysql_free_result( $result ) ;
 echo "</table>" ;
?>

 <form action<? echo $PHP_SELF ;?> method=post>
 ������ �˻�:<input type=text size=8 name=project_name>
 <input type=submit value="�˻�">
 </form>
 <hr>
 �л� �Է��ϱ�
 <form action<? echo $PHP_SELF ;?> method=post>
 �̸� : <input type=text size=8 name=insert_name>
 ���� : <input type=text size=3 name=sex>
 ��ȭ��ȣ : <input type=text size=16 name=phone>
 ���Խð� : <input type=text size=25 name=day>
 <input type=submit value="�Է�">
 <input type=HIDDEN name=mode value=insert>
 </form>

<form action=wkwgood.php method=post enctype='multipart/form-data'>
��������:<input type= file name=user_image size=10><br>
<input type=submit value='�̹��� �ø���'><br>
</form>

 
