
--테이블 칼럼리스트
SELECT COLUMN_NAME ||','
FROM USER_TAB_COLUMNS
WHERE TABLE_NAME = 'KDT2400'
ORDER BY COLUMN_ID
;

--인덱스칼럼리스트
SELECT *
FROM USER_IND_COLUMNS
WHERE TABLE_NAME = 'KDT2400'
  AND INDEX_NAME LIKE '%PK'
ORDER BY COLUMN_POSITION
;

drop snapshot kmt0010dg;

--CREATE SNAPSHOT KMT0010DG
-- TABLESPACE DKFD0010
--  USING INDEX TABLESPACE DKFD0010
--  REFRESH FAST with rowid
--  START WITH SYSDATE
--  NEXT SYSDATE + 1/24/60
--  AS SELECT *
--       FROM KMT0010@DGU2;

-- 1분    :SYSDATE + 1/24/60
-- 10초   :sysdate+1/(288*30)
-- 15초   :sysdate+1/(288*20)

 CREATE SNAPSHOT KMT0010DG
 TABLESPACE DKFD0010
  USING INDEX TABLESPACE DKFD0010
  REFRESH FAST with rowid
  START WITH SYSDATE
  NEXT sysdate+1/(288*30)
  AS SELECT *
       FROM KMT0010@DGU2;


CREATE UNIQUE INDEX KMT0010HI_PK
ON KMT0010HI
(
 COMPUROOM ASC,
 DATA_TP ASC,
 CREATE_YMD ASC,
 CREATE_SEQNO ASC
)
TABLESPACE DKFI0010
 ;

 

CREATE INDEX KMT0010HI_IX01
ON KMT0010HI
(
 CONS_NO ASC
)
TABLESPACE DKFI0010
 ;


-- DCWEB LOCK CHK?
SELECT   A.OS_USER_NAME                           "DCWEB OS User"
     ,   A.ORACLE_USERNAME                        "DB User"
     ,   B.OWNER                                  "Schema"
     ,   B.OBJECT_NAME                            "Object Name"
     ,   B.OBJECT_TYPE                            "Object Type"
     ,   C.SEGMENT_NAME                           "RBS"
     ,  '(' || E.SID || ',' || E.SERIAL# || ')'   "Session ID"
     ,   E.STATUS                                 "Session ST"
     ,   E.TADDR
     ,   E.MACHINE                                "Machine Name"
     ,   D.USED_UREC                              "# Of Records"
     ,   DECODE(A.LOCKED_MODE,
                0, 'Mon Lock equivalent',
                1, 'Null',
                2, '2 Row Share(lock on table)',
                3, '3 Row Exclusive(lock on table)',
                4, '4 Share(lock on table)',
                5, '5 Share Row Exclusive',
                6, '6 Table Exclusive(TX lock on RBS TX slot)',
                A.LOCKED_MODE || ' Unknow')       "Lock Mode"
  FROM  (SELECT * FROM V$LOCKED_OBJECT)    A
     ,   DBA_OBJECTS                       B
     ,   DBA_ROLLBACK_SEGS                 C
     ,   V$TRANSACTION                     D
     ,   V$SESSION                         E
 WHERE   A.OBJECT_ID  =  B.OBJECT_ID
   AND   A.XIDUSN     =  C.SEGMENT_ID (+)
   AND   A.XIDUSN     =  D.XIDUSN     (+)
   AND   A.XIDSLOT    =  D.XIDSLOT    (+)


