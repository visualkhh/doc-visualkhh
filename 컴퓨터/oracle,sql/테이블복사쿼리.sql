-- 테이블의 구조 및 데이터까지 복사
select * into 새테이블명
from 테이블명

-- 테이블의 구조 만 복사
select * into 새테이블명
from 테이블명
where 1=2

그러나 Primary Key 및 인덱스는 복사되지 않으므로
설정해주셔야 합니다.
