select * from
(
select c.officecd,max(a.CONS_NO) ,count(cons_no) cnt
 from ntt10612 a, HXT1010 b, HXT1010 c   
 where a.aedat='10000000' and a.officecd = b.officecd and b.UPPO_OFFICECD = c.officecd   
 group by c.officecd,cons_no 
 ) where cnt>1