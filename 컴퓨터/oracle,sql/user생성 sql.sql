create user usrisl identified by usrisl;

alter user  usrisl default tablespace users;

grant resource, connect to usrisl;

grant dba to usrisl;
