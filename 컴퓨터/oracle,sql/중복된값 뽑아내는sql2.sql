select * from (
select cons_no, row_number() over (partition by cons_no order by cons_no desc) cnt
 from ntt10642 )
 where cnt > 1

