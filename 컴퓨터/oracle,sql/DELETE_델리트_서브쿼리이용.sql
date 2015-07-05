          SELECT * FROM NTT10622 WHERE NEWTECH_CD LIKE DECODE('13','99','%', '13' ); 
          
          SELECT * FROM NTT10642 WHERE NEWTECH_CD LIKE DECODE('13','99','%', '13' ); 
           
          SELECT a.* FROM NTT10612 a ,NTT10622 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' ) and a.cons_no = b.cons_no;  
          
           SELECT a.* FROM NTT10632 a ,NTT10642 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' ) and a.cons_no = b.cons_no;  





DELETE FROM NTT10632 a 
 WHERE EXISTS (SELECT * FROM NTT10642 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' ) and a.cons_no = b.cons_no); 
 
 
 
 delete  NTT10642 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' );
 
 
 
 
 
 DELETE FROM  NTT10612 a WHERE EXISTS (SELECT * FROM NTT10622 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' ) and a.cons_no = b.cons_no);  
 
 
 delete NTT10622 b WHERE b.NEWTECH_CD LIKE DECODE('13','99','%', '13' ) ;