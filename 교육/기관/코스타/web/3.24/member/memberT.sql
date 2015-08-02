create table memberT(
	mem_uid varchar2(15) primary key,
	mem_pwd varchar2(15) not null,
	mem_name varchar2(15) not null,
	mem_email varchar2(50),
	mem_regdate date,
	mem_addr varchar2(100)
);