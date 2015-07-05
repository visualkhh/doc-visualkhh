

-- 유저 롤 현황보기 
select * from user_role_privs;


--유저에게 바로 주어진 privilege  
select * from user_sys_privs;

--롤 종류 및 세부 privilege 권한 
select * from role_sys_privs;


--권한주기    privilege
grant create public database link to usrtech


--권한주기  role 
grant dba to usrtech;

grant spot to xxxuser;

--롤 전체 정보 보기 
select * from dba_sys_privs;