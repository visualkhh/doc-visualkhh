select * from ntt1000;

--테이블 주석달기 
comment on table table1 is 'ccccc';

--컬럼 주석달기
comment on column table1.aa is 'ccccccc';


--table comment  확인
select * from ALL_COL_COMMENTS where table_name='NTT1000';