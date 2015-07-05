<?php


   Define( "DATABASE_SERVER", "localhost" ); //MySQL이 있는 서버의 주소죠 저의 경우에는 localhost에서 했어요 
   Define( "DATABASE_USERNAME", "visualhhk" ); //MySQL DB의 ID입니다. 저는 root id로 ㅋ;
   Define( "DATABASE_PASSWORD", "skfkdsk1" ); //ID에 따른 패스워드죠 apmsetup이라고 되 있는 이유는 제가 APMSETUP5를 사용하면서 따로 패스워드를 지정해주지 않아서 Default로 잡혀있는겁니다. ㅡ,.ㅡ;;
   Define( "DATABASE_NAME", "visualhhk" ); //MySQL DB Table의 이름입니다.
  
   
   $mysql = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD);mysql_select_db( DATABASE_NAME ); //MySQL DB접속하는 명령입니다.

  


   echo "<?xml version='1.0' encoding='utf-8'?>"; //화면에 " "안의 내용들을 출력하는데요 XML문서임을 표시해 줍니다.
   echo "<?xml:stylesheet type='text/xsl' href='main.xsl'?>"; //화면에 " "안의 내용들을 출력하는데요 XML문서임을 표시해 줍니다.


   echo "<node>"; //최상위 노드죠~ 마찬가지로 " "안의 내용들을 화면에 출력해줍니다.


//select 문 초기값

$SEARCH  = $textfield;

$targetcom = $menu1;




if($menu1){
   $qry = "SELECT * FROM lcd WHERE $targetcom LIKE '%$SEARCH%'"; //lcd이라는 테이블의  자료를 불러오는 쿼리입니다.
   }else{
      $qry = "SELECT * FROM lcd "; //lcd이라는 테이블의  자료를 불러오는 쿼리입니다.
   }

   $result = mysql_query($qry); //바로 윗줄의 쿼리르 실행하는 명령이죠~ mysql_query(변수)



 while($obj=mysql_fetch_object($result)) //반복문이죠~! 반복조건으로는 mysql_fetch_object($result)를 주었는데요~ 이 명령은 행의 결과를 객체로 얻는다는건데.. 좀 말이 어렵고 ㅡ,.ㅡ;; 한마디로 테이블의 레코드들을 하나하나의 객체로 얻어온다는 거죠 ㅡㅡ;;;(말 주변머리 하고는 ㅠ_ㅠ;)

{

  $obj->brand=iconv("euc-kr","utf-8",$obj->brand); // 여기서 '$obj->company'라는 뜻은 airplane 테이블에서 company라는 필드가 가지고 있는 값입니다. iconv는 flex를 몇번 해보시면 아시겠지만 flex의 한글 지원이 안습이여서 한글이깨지지 않도록 한글로 되어 있는 필드를 강제로 utf-8에서 euc-kr로 변환 시켜 주는 겁니다.
  $obj->inch=iconv("euc-kr","utf-8",$obj->inch); //위와 같습니다.
  $obj->rate=iconv("euc-kr","utf-8",$obj->rate); 
    $obj->mode=iconv("euc-kr","utf-8",$obj->mode); 
	  $obj->fault=iconv("euc-kr","utf-8",$obj->fault); 
	    $obj->model=iconv("euc-kr","utf-8",$obj->model); 
		  $obj->adddate=iconv("euc-kr","utf-8",$obj->adddate); 
		    $obj->price=iconv("euc-kr","utf-8",$obj->price); 
			  $obj->seller=iconv("euc-kr","utf-8",$obj->seller); 
		  





    $return.="<lcd>
	 <brand>$obj->brand</brand>
	 <inch>departure_place='$obj->inch'</inch> 
	 <rate>$obj->rate</rate>
	 <mode>$obj->mode</mode>
	 <fault>$obj->fault</fault>
	 <model>$obj->model</model>
	 <adddate>$obj->adddate</adddate>
	 <price>$obj->price</price>
	 <seller>$obj->seller</seller>
	 </lcd>
	 
	 
	 
	 
	 ";

//위 while문의 반복조건은 모든 레코드가 mysql_fetch_object로 처리될때까지 참입니다. 만약 더 이상 처리할 레코드가 없게되면 조건이 거짓이 되므로 조건문을 빠져나가게 되고 그전까지 $return이라는 변수에 하위 노드가 쌓이게 됩니다.
    }



 printf($return); //C를 해보셨다면 친숙한 명령이죠 printf ㅋ; 위의 $return에 저장되 있는 문자열을 화면에 출력해줍니다.

 echo "</node>"; //최상위 노드를 닫아줍니다.

?>



<!-- 데이터베이스에 있는 정보를 xml파일로 생성 합니다. ㅋ -->


<?
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
$xmlList="<lcd>
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




//통합 XmlDoc의 내용을 구성
$xmlDoc="<?xml version='1.0' encoding='euc-kr'?>
<?xml:stylesheet type='text/xsl' href='../info.xsl'?>
 <node>$xmlList</node>";


//XmlDoc의 내용을 가지고 xml파일 생성하기
$fp = fopen("./item/$model.xml","w");
fwrite($fp, $xmlDoc);
fclose($fp);

##DB연결해제




}

?>



