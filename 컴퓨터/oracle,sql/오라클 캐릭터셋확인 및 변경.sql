확인

select * from nls_database_parameters where parameter like '%CHARACTERSET%'








ORACLE 캐릭터셋 변경
aircook 2007/02/27 19:59 | database
댓글쓰기
ORACLE 캐릭터셋 변경
먼저 확인
SELECT * FROM NLS_DATABASE_PARAMETERS WHERE PARAMETER LIKE '%CHAR%'

$ORACLE> sqlplus '/as sysdba'
SQL> SHUTDOWN IMMEDIATE;
<do a full backup>
SQL> STARTUP MOUNT;
SQL> ALTER SYSTEM ENABLE RESTRICTED SESSION;
SQL> ALTER SYSTEM SET JOB_QUEUE_PROCESSES=0;
SQL> ALTER SYSTEM SET AQ_TM_PROCESSES=0;
SQL> ALTER DATABASE OPEN;
SQL> ALTER DATABASE CHARACTER SET KO16MSWIN949;
SQL> SHUTDOWN IMMEDIATE;
SQL> STARTUP;
다음은 내가 실행한 결과~
[root@linux root]# su oracle
[oracle@linux root]$ sqlplus /nolog
SQL*Plus: Release 9.2.0.4.0 - Production on Tue Feb 27 10:24:30 2007
Copyright (c) 1982, 2002, Oracle Corporation.  All rights reserved.
SQL> CONN SYS/***** AS SYSDBA
Connected.
SQL> SHUTDOWN IMMEDIATE;
Database closed.
Database dismounted.
ORACLE instance shut down.
SQL> STARTUP MOUNT
ORACLE instance started.
Total System Global Area  236000356 bytes
Fixed Size                   451684 bytes
Variable Size             201326592 bytes
Database Buffers           33554432 bytes
Redo Buffers                 667648 bytes
Database mounted.
SQL> ALTER SYSTEM ENABLE RESTRICTED SESSION;
System altered.
SQL> ALTER SYSTEM SET JOB_QUEUE_PROCESSES=0;
System altered.
SQL> ALTER SYSTEM SET AQ_TM_PROCESSES=0;
System altered.
SQL> ALTER DATABASE OPEN;
Database altered.
SQL> ALTER DATABASE CHARACTER SET KO16MSWIN949;
Database altered.


참고 : http://www.oracle.com/technology/global/kr/pub/columns/oracle_lns_1.html
요즘
트위터
페이스북
미투데이
댓글쓰기
