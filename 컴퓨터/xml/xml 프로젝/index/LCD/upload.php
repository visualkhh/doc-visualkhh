<?


$conn=mysql_connect("localhost","visualhhk","skfkdsk1") or die("접속이 안됬어요");
$status = mysql_select_db("visualhhk");  // use visualhhk
if(!$status){
echo "연결X";
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
   echo"이름 :<input type=text size=8 name=update_name value='$row[name]'>";
   echo"성별 :<input type=text size=3 name=sex value='$row[sex]'>";
   echo"전화번호 :<input type=text size=16 name=phone value='$row[phone]'>";
   echo"출입시간 :<input type=text size=25 name=day value='$row[day]'>";
   echo"<input type=hidden name=mode value=update>";
   echo"<input type=hidden name=update value=1>";
   echo"<input type=hidden name=no value=$no>";
   echo"<input type=submit value='수정하기'>";
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
 
  <td><a href=<? echo $PHP_SELF; ?>?ord=1>출입자 이름</a></td>
                <td><a href=<? echo $PHP_SELF; ?>?ord=2>성별</a></td>
  <td><a href=<? echo $PHP_SELF; ?>?ord=3>전화번호</a></td>
  <td><a href=<? echo $PHP_SELF; ?>?ord=4>출입날짜</a></td>
             <td>삭제/수정</td> 
         <td><a href=<? echo $PHP_SELF; ?>?ord=5>사진</a></td>
 
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
                echo "<a href=$PHP_SELF?no=$no&mode=update&ord=$ord>수정</a>/" ;
  echo "<a href=$PHP_SELF?no=$no&mode=delete&ord=$ord>삭제</a>" ;

  echo "</td></tr>" ;
 }
 mysql_free_result( $result ) ;
 echo "</table>" ;
?>

 <form action<? echo $PHP_SELF ;?> method=post>
 출입자 검색:<input type=text size=8 name=project_name>
 <input type=submit value="검색">
 </form>
 <hr>
 학생 입력하기
 <form action<? echo $PHP_SELF ;?> method=post>
 이름 : <input type=text size=8 name=insert_name>
 성별 : <input type=text size=3 name=sex>
 전화번호 : <input type=text size=16 name=phone>
 출입시간 : <input type=text size=25 name=day>
 <input type=submit value="입력">
 <input type=HIDDEN name=mode value=insert>
 </form>

<form action=wkwgood.php method=post enctype='multipart/form-data'>
사진선택:<input type= file name=user_image size=10><br>
<input type=submit value='이미지 올리기'><br>
</form>

 
